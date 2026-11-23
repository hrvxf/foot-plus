// Runs inline in <head>, before first paint, to decide whether this page load gets
// the "Footsteps" entry animation on the header logo (CSS in globals.css, cleared
// by Header.tsx). It plays:
// - once per browser session (so not on every page, refresh or return to the home page)
// - never for visitors who have asked their device to reduce motion
// - never on /forms (patients arriving from a WhatsApp follow-up)
// - not on the full-screen green pages (the /locations chooser, /card, /review), which hide the
//   header; the visit's first ordinary page load gets it instead
// If sessionStorage is unavailable it is skipped rather than shown on every page.
export const entryAnimationScript = `(function(){try{
var p=location.pathname;
if(p.indexOf('/forms')===0)return;
if(/^\\/(locations|review)\\/?$|^\\/card(\\/|$)/.test(p))return;
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
if(sessionStorage.getItem('fp-intro'))return;
sessionStorage.setItem('fp-intro','1');
document.documentElement.setAttribute('data-intro','');
}catch(e){}})();`;
