import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const source='src/content/projects/faisal-town-islamabad-map-location.json';
const original=fs.readFileSync(source,'utf8');
const output='dist/faisal-town-islamabad-map-location/index.html';
const build=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});
const fields=['quickAnswerLabel','quickAnswerHeading','quickAnswer','verificationLabel','verificationText','imageCaption','checklistLabel','checklistHeading','downloadsLabel','downloadsHeading','downloadButtonLabel','faqLabel','faqHeading','relatedLabel','relatedHeading','ctaEyebrow','ctaHeading','ctaText','planCalloutLabel','planCalloutHeading','planCalloutButton'];
try {
 const p=JSON.parse(original);
 fields.forEach((field,i)=>p[field]='CMS_FIELD_'+i+'_END');
 p.showMainImage=true;p.heroBackgroundImage='/assets/plans/previews/sector-t-ft-ii.webp';
 p.downloadsText='Plan | Test plan | Description | /assets/plans/sector-t-ft-ii.pdf';
 p.planCalloutHref='/faisal-town-q-block/';
 p.sectionLinksText=p.body.slice(3).split('\n')[0]+' | CMS_SECTION_BUTTON | /faisal-town-phase-1/';
 p.linksText='CMS_ONLY_LINK | /';p.updated='2026-10-05';p.reviewed='2026-09-24';
 fs.writeFileSync(source,JSON.stringify(p));build();let html=fs.readFileSync(output,'utf8');
 fields.forEach((field,i)=>assert(html.includes('CMS_FIELD_'+i+'_END'),field+' does not render'));
 assert(html.includes('CMS_SECTION_BUTTON'));assert(html.includes('CMS_ONLY_LINK'));assert(!html.includes('Faisal Town Islamabad Home'));
 assert(html.includes('background-image:')&&html.includes('sector-t-ft-ii.webp'));assert(html.includes('Updated 5 Oct 2026'));assert(html.includes('Reviewed 24 Sept 2026'));assert(html.includes('<figure class="clean-hero-figure'));
 fields.forEach(field=>p[field]='');p.heroBackgroundImage='';p.showMainImage=false;p.sectionLinksText='';p.linksText='';p.planCalloutHref='';p.bulletsText='';
 fs.writeFileSync(source,JSON.stringify(p));build();html=fs.readFileSync(output,'utf8');
 assert(!html.includes('CMS_FIELD_'));assert(!html.includes('CMS_SECTION_BUTTON'));assert(!html.includes('CMS_ONLY_LINK'));assert(!html.includes('What matters on this page'));assert(!html.includes('Ask about this exact page'));assert(!html.includes('<figure class="clean-hero-figure'));assert(!html.includes('id="buyer-checklist"'));assert(html.includes('background-image:none'));
 console.log('PASS: 21 page-copy fields, section buttons, related links, dates, images and intentional clearing render correctly.');
} finally {fs.writeFileSync(source,original);build();console.log('Original content restored.');}
