// Runs inline in <head>, before first paint, to decide whether this page load gets
// the entry animation (see app/components/EntryAnimation.tsx). It plays:
// - once per browser session (so not on every page, refresh or return to the home page)
// - never for visitors who have asked their device to reduce motion
// - never on /forms (patients arriving from a WhatsApp follow-up) or the full-screen
//   location chooser at /locations, which has no header for the logo to land in
// If sessionStorage is unavailable it is skipped rather than shown on every page.
export const entryAnimationScript = `(function(){try{
var p=location.pathname;
if(p.indexOf('/forms')===0||p==='/locations')return;
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
if(sessionStorage.getItem('fp-intro'))return;
sessionStorage.setItem('fp-intro','1');
document.documentElement.setAttribute('data-intro','');
}catch(e){}})();`;
