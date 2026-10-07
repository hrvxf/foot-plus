// Run against the actual tracking module, without sending analytics or enquiries.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const filename = 'app/components/advice/AdviceTracker.tsx';
const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
function fixture({stored, unavailable = false, referrer = 'https://www.google.co.uk/search?q=nail+care', search = ''} = {}) {
  const events = [];
  const context = { exports: {}, require: () => ({}), URL, URLSearchParams,
    location: { pathname: '/toenail-cutting-bristol', search }, document: {referrer},
    window: { gtag: (...args) => events.push(args) },
    sessionStorage: {
      getItem() { if (unavailable) throw new Error('Blocked'); return stored; },
      setItem(key,value) { if (unavailable) throw new Error('Blocked'); stored=value; }
    }
  };
  vm.runInNewContext(source,context,{filename});
  return {context,events};
}
const organic = fixture();
organic.context.exports.captureAttribution();
organic.context.location.pathname='/book';
organic.context.exports.trackAdviceEvent('generate_lead',{service_location:'bristol',method:'enquiry_form'});
assert.equal(organic.events[0][2].landing_page,'/toenail-cutting-bristol');
assert.equal(organic.events[0][2].referral_category,'organic_search');
assert.equal(organic.events[0][1],'generate_lead');
assert.equal(organic.events[0][2].service_location,'bristol');
for (const params of [{stored:'{invalid'}, {stored:'null'}, {unavailable:true}]) {
  const test=fixture(params);assert.doesNotThrow(()=>test.context.exports.trackAdviceEvent('booking_click',{}));
  assert.equal(test.events.length,1);
}
const chat=fixture({referrer:'https://chatgpt.com/'});chat.context.exports.trackAdviceEvent('phone_click',{});
assert.equal(chat.events[0][2].referral_category,'chatgpt');
const spoof=fixture({referrer:'https://google.com.example.org/'});spoof.context.exports.trackAdviceEvent('phone_click',{});
assert.equal(spoof.events[0][2].referral_category,'other_referral');
const broken=fixture();broken.context.window.gtag=()=>{throw new Error('Blocked')};
assert.doesNotThrow(()=>broken.context.exports.trackAdviceEvent('generate_lead',{}));
console.log('PASS: first landing page, UK Google referrals, corrupted/blocked storage, ChatGPT referrals and analytics failures.');
