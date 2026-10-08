import fs from 'node:fs';
import assert from 'node:assert/strict';
import yaml from 'js-yaml';
import {normalizeProject, parseProjectBody, rowFields} from '../src/data/projectBulk.ts';
import {normalizeArticle} from '../src/data/articleBulk.ts';
const config=yaml.load(fs.readFileSync('.pages.yml','utf8'));
let count=0;
function checkFields(data,fields,context){
 for(const [key,value] of Object.entries(data)){
  const field=fields?.find(f=>f.name===key);assert(field,`${context}.${key} is not editable in Pages CMS`);
  if(field.type==='select'&&typeof value==='string')assert(field.options.values.includes(value),`${context}.${key} value missing from CMS choices`);
  if(value&&typeof value==='object'&&!Array.isArray(value))checkFields(value,field.fields,context+'.'+key);
 }
}
function checkItems(items){for(const item of items){if(item.items)checkItems(item.items);if(item.format!=='json')continue;const files=item.type==='collection'?fs.readdirSync(item.path).filter(n=>n.endsWith('.json')).map(n=>item.path+'/'+n):[item.path];for(const file of files){checkFields(JSON.parse(fs.readFileSync(file)),item.fields,file);count++;}}}
checkItems(config.content);
for(const file of fs.readdirSync('src/content/projects')){
 const data=JSON.parse(fs.readFileSync('src/content/projects/'+file));assert.equal(typeof data.body,'string');
 for(const key of Object.keys(rowFields)){assert.equal(typeof data[key+'Text'],'string');assert(!(key in data),'Stale duplicate array: '+file+' '+key);}
 const edited=normalizeProject({...data,body:'## Edited heading\n\nFirst paragraph.\n\nSecond paragraph.',faqsText:'First question? | First answer.\nSecond question? | Second answer.',linksText:'Master plan | /articles/faisal-town-ii-master-plan/'});
 assert.equal(edited.sections[0].paragraphs.length,2);assert.equal(edited.faqs.length,2);assert.equal(edited.links.length,1);
 const cleared=normalizeProject({...data,body:'',faqsText:'',linksText:''});assert.equal(cleared.sections.length+cleared.faqs.length+cleared.links.length,0);
}
const article=JSON.parse(fs.readFileSync('src/content/articles/faisal-town-ii-master-plan.json'));
assert.equal(normalizeArticle({...article,faqsText:'Question? | Answer.'}).faqs.length,1);
assert.equal(normalizeArticle({...article,faqsText:''}).faqs.length,0);
for(const file of fs.readdirSync('src/content/legal')){const data=JSON.parse(fs.readFileSync('src/content/legal/'+file));assert.equal(typeof data.body,'string');assert.equal(parseProjectBody('').length,0);assert(!('sections' in data));}
const html=fs.readFileSync('dist/index.html','utf8');
const offer=JSON.parse(fs.readFileSync('src/content/homepage/featured-offer.json'));
const controls=JSON.parse(fs.readFileSync('src/content/homepage/controls.json'));
const fact=offer.factsText.split(/\r?\n/).map(line=>line.split(line.includes('\t')?'\t':'|').map(cell=>cell.trim())).find(cells=>/discounted(?:\s+listed)?\s+price/i.test(cells[1]||''));
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
if(controls.hero&&fact)assert(html.includes('<strong>'+escape(fact[0])+'</strong>'),'Featured starting price missing');
if(controls.featuredOffer){
 const anchors=[...html.matchAll(/<a [^>]*data-source-section="featured_offer"[^>]*>/g)].map(match=>match[0]);
 assert(anchors.some(a=>a.includes('href="https://wa.me/')&&a.includes('data-cta-label="'+escape(offer.primaryCta)+'"')),'Featured WhatsApp label mismatch');
 assert(anchors.some(a=>a.includes('href="'+escape(offer.primaryHref)+'"')&&a.includes('data-cta-label="'+escape(offer.secondaryCta)+'"')),'Featured details label mismatch');
}
console.log('PASS: '+count+' JSON entries exposed; bulk edits, clearing fields, legal bodies and featured price/actions verified.');

const sectorFixture = {...article, sectorsText: 'Sector Q | Cash | Details | /faisal-town-q-block/'};
assert.equal(normalizeArticle(sectorFixture).sectors.length,1);
assert.equal(normalizeArticle({...article,sectorsText:''}).sectors.length,0);
assert.equal(normalizeArticle({...article,sectorsText:'Sector Q | Cash | Details | /faisal-town-q-block/'}).sectors[0].title,'Sector Q');
assert.throws(()=>normalizeArticle({...article,sectorsText:'Sector Q | Cash | Missing link'}));
assert.throws(()=>normalizeArticle({...article,sectorsText:'Sector Q | Cash | Details | javascript:alert(1)'}));
const planHtml=fs.readFileSync('dist/articles/faisal-town-ii-master-plan/index.html','utf8');
// Editorial links may be changed or cleared in CMS.
assert(planHtml.includes('rel="canonical"'));
const locationHtml=fs.readFileSync('dist/faisal-town-islamabad-map-location/index.html','utf8');
const locationData=JSON.parse(fs.readFileSync('src/content/projects/faisal-town-islamabad-map-location.json'));
assert.equal(locationHtml.includes('<figure class="clean-hero-figure'), locationData.showMainImage !== false && Boolean(locationData.image));
assert.equal(normalizeProject({...locationData,sectionLinksText:''}).sectionLinks.length,0);
assert.equal(normalizeProject({...locationData,sectionLinksText:'Example | Open guide | /faisal-town-phase-1/'}).sectionLinks[0].label,'Open guide');
assert(locationHtml.includes('rel="canonical"'));
console.log('PASS: sector-card edits, clearing and malformed rows; authority links; canonicals; location layout.');

// The homepage must consume the same bulk content exposed by Pages CMS.
const presentation=JSON.parse(fs.readFileSync('src/content/homepage/presentation.json'));
const cells=line=>line.split(line.includes('\t')?'\t':'|').map(value=>value.trim());
for(const line of presentation.navigationText.split(/\r?\n/).filter(Boolean)) {
 const [label,href]=cells(line);assert(html.includes('href="'+escape(href)+'"')&&html.includes(escape(label)), 'Homepage navigation missing: '+label);
}
if(controls.aboutPhase2)for(const line of presentation.benefitsText.split(/\r?\n/).filter(Boolean)) {
 const [title,description]=cells(line);assert(html.includes(escape(title))&&html.includes(escape(description)), 'Homepage benefit missing: '+title);
}
for(const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
 assert(!/unsplash|placeholder\.com/.test(match[1]),'Sample image left on homepage');
 if(match[1].startsWith('/assets/'))assert(fs.existsSync('public'+match[1]),'Missing homepage asset '+match[1]);
}
console.log('PASS: homepage bulk navigation/benefits render and all local image assets exist.');
