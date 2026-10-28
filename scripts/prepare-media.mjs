import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';

// Build-derived files keep original, detailed assets unchanged in source control.
const generated = 'public/assets/generated';
await fs.mkdir(generated, {recursive:true});
const images = {}, pdfs = {};
async function walk(dir) {
  const files=[];
  for (const entry of await fs.readdir(dir,{withFileTypes:true})) {
    if (entry.name === 'generated') continue;
    const file=path.join(dir,entry.name);
    if(entry.isDirectory()) files.push(...await walk(file)); else files.push(file);
  }
  return files;
}
const files=await walk('public/assets');
const referenced = new Set();
for (const file of [...await walk('src/content'), ...await walk('src/components'), ...await walk('src/pages')]) {
  if (!/\.(json|astro)$/.test(file)) continue;
  const text=await fs.readFile(file,'utf8');
  for (const match of text.matchAll(/\/assets\/[^\s"'<>|]+?\.(?:webp|png|jpe?g)/g)) referenced.add(match[0]);
}
for (const file of files.filter(f=>/\.(webp|png|jpe?g)$/i.test(f) && referenced.has('/'+f.replace(/^public\//,'')))) {
  const bytes=await fs.readFile(file);
  const info=await sharp(bytes).metadata();
  if (!info.width || !info.height) continue;
  const src='/'+file.replace(/^public\//,'');
  const variants=[];
  const isIcon = /whatsapp-logo-green\.webp$/.test(file);
  if(info.width>=240 && (bytes.length>30000 || isIcon || /original-logo\.png$/.test(file))) {
    for (const width of (isIcon ? [64,128] : [240,480,720,960]).filter(w=>w<info.width)) {
      const name=crypto.createHash('sha256').update(bytes).update(`webp-${width}-78`).digest('hex').slice(0,16)+'.webp';
      const target=path.join(generated,name);
      try {await fs.access(target);} catch {await sharp(bytes).resize({width,withoutEnlargement:true}).webp({quality:78,effort:4}).toFile(target);}
      variants.push({src:'/assets/generated/'+name,width});
    }
  }
  images[src]={width:info.width,height:info.height,variants};
}
for(const file of files.filter(f=>/\/(?:plans\/sector-[opqrst]-ft-ii|faisal-town-ii\/faisal-town-phase-2-master-plan)\.pdf$/.test(f))) {
  const src='/'+file.replace(/^public\//,'');
  const bytes=await fs.readFile(file);
  const letter=file.match(/sector-([opqrst])/i)?.[1]?.toUpperCase();
  const title=letter?`Faisal Town Phase 2 Sector ${letter} Layout Plan`:'Faisal Town Phase 2 Master Plan';
  const doc=await PDFDocument.load(bytes,{updateMetadata:false});
  doc.setTitle(title); doc.setSubject('Planning reference. Confirm plot availability and current site conditions separately.');
  const output=await doc.save();
  const name=path.basename(file,'.pdf')+'-titled.pdf';
  await fs.writeFile(path.join(generated,name),output);
  pdfs[src]={href:'/assets/generated/'+name,bytes:output.length,title};
}
// Small raster overview is explicitly not the plot-level detailed plan.
const preview=await sharp('public/assets/faisal-town-ii/faisal-town-phase-2-master-plan-preview.webp').resize({width:1600,withoutEnlargement:true}).jpeg({quality:85}).toBuffer();
const doc=await PDFDocument.create();doc.setTitle('Faisal Town Phase 2 - Overview Copy');
const img=await doc.embedJpg(preview);const pg=doc.addPage([img.width,img.height+70]);pg.drawImage(img,{x:0,y:0,width:img.width,height:img.height});pg.drawText('Overview copy only - use the detailed PDF for plot numbers.',{x:25,y:img.height+25,size:20});
const overview=await doc.save();await fs.writeFile(path.join(generated,'phase-2-overview.pdf'),overview);
await fs.mkdir('src/data/generated',{recursive:true});
await fs.writeFile('src/data/generated/media.json',JSON.stringify({images,pdfs,overviewBytes:overview.length},null,2)+'\n');
console.log(`Prepared responsive images and ${Object.keys(pdfs).length} titled plan copies; overview ${(overview.length/1000000).toFixed(2)} MB.`);
