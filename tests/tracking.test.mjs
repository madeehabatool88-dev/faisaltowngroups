import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {stripTypeScriptTypes} from 'node:module';
import {captureAttribution, campaignWhatsAppUrl} from '../src/scripts/attribution.ts';

function storage() {
  const values = new Map();
  return {getItem: k => values.get(k) ?? null, setItem: (k,v) => values.set(k,v), removeItem: k => values.delete(k)};
}
test('refresh and internal navigation preserve a coherent record; a new campaign clears old IDs', () => {
  const s = storage();
  const first = captureAttribution('?utm_source=google&utm_campaign=A&gclid=old', () => s);
  assert.deepEqual(captureAttribution('', () => s), first);
  assert.deepEqual(captureAttribution('?utm_source=google&utm_campaign=A&gclid=old', () => s), first);
  assert.deepEqual(captureAttribution('?utm_campaign=B&wbraid=new', () => s), {utm_campaign:'B', wbraid:'new'});
  assert.deepEqual(captureAttribution('', () => s), {utm_campaign:'B', wbraid:'new'});
  assert.deepEqual(captureAttribution('?gbraid=braid', () => s), {gbraid:'braid'});
});
test('blocked storage getter and quota failure retain URL attribution', () => {
  const expected = {utm_campaign:'A', gclid:'id'};
  assert.deepEqual(captureAttribution('?utm_campaign=A&gclid=id', () => {throw Error('blocked');}), expected);
  const s = storage();
  captureAttribution('?utm_campaign=old&gclid=old', () => s);
  s.setItem = () => {throw Error('quota');};
  assert.deepEqual(captureAttribution('?utm_campaign=A&gclid=id', () => s), expected);
  assert.deepEqual(captureAttribution('', () => s), {});
});
test('malformed records and legacy per-key storage cannot contaminate a campaign', () => {
  const s = storage(); s.setItem('ft:gclid','old'); s.setItem('ft:attribution:v2','broken');
  assert.deepEqual(captureAttribution('', () => s), {});
  assert.equal(s.getItem('ft:gclid'), null);
  assert.deepEqual(captureAttribution('?utm_campaign=B', () => s), {utm_campaign:'B'});
});
test('WhatsApp reference is sanitized, bounded and replaced without duplicating it', () => {
  const initial = 'https://wa.me/923358049806?text=' + encodeURIComponent('Website: example\nQuery: Phase 2');
  const first = campaignWhatsAppUrl(initial, '<A>_test&');
  assert.equal(new URL(first).searchParams.get('text'), 'Website: example\nQuery: Phase 2\nCampaign reference: A_test');
  const second = campaignWhatsAppUrl(first, 'B'.repeat(80));
  const text = new URL(second).searchParams.get('text');
  assert.equal(text.match(/Campaign reference:/g).length, 1);
  assert.equal(text.split('Campaign reference: ')[1].length, 60);
  assert.equal(new URL(campaignWhatsAppUrl(second)).searchParams.get('text'), 'Website: example\nQuery: Phase 2');
});
test('actual delegated listener emits one WhatsApp event, distinct CTA event, and phase context', () => {
  let handler;
  const dataLayer = [];
  class Element {
    constructor(href, dataset = {}) {this.href=href; this.dataset=dataset; this.textContent='Ask';}
    closest(selector) {
      if (selector === 'a[href]') return this;
      if (selector === '[data-project-phase]') return {dataset:{projectPhase:'phase_2'}};
      return null;
    }
  }
  const source = fs.readFileSync('src/scripts/enquiries.ts','utf8').replace(/^import[^\n]+\n/, '');
  vm.runInNewContext(stripTypeScriptTypes(source), {
    attributionKeys:['utm_campaign','gclid'], captureAttribution, campaignWhatsAppUrl,
    location:{search:'?utm_campaign=qa&gclid=TEST_ONLY',pathname:'/'}, sessionStorage:storage(),
    document:{addEventListener: (_,fn) => {handler=fn;}}, Element,
    window:{dataLayer,dispatchEvent(){}}, CustomEvent:class {}, URL, URLSearchParams,
  });
  const link = new Element('https://wa.me/923358049806?text=Phase2', {event:'price_enquiry_click',sourceSection:'prices'});
  handler({target:link});
  assert.deepEqual(Array.from(dataLayer, x=>x.event), ['whatsapp_click','price_enquiry_click']);
  assert.equal(dataLayer[0].project_phase, 'phase_2');
  assert.equal(dataLayer[0].source_section, 'prices');
  assert.equal(dataLayer[0].sector, null);
  assert(!link.href.includes('TEST_ONLY'));
  link.dataset.event='whatsapp_click';
  handler({target:link});
  assert.equal(dataLayer.filter(x=>x.event==='whatsapp_click').length, 2);
  assert.equal(new URL(link.href).searchParams.get('text').match(/Campaign reference:/g).length,1);
});
