let height = 0;
let width = 0;

/**
 * Screen height for the scroll-led sections, taken once and only retaken when the width changes
 * (rotation, resizing a desktop window). Opening the on-screen keyboard or the browser toolbar
 * sliding away changes the visible height on phones; if the pinned sections followed that, the page
 * would change length under the visitor and jump them to another part of it.
 */
export function stableViewportHeight() {
  if (typeof window === "undefined") return 0;
  if (!height || window.innerWidth !== width) {
    height = window.innerHeight;
    width = window.innerWidth;
  }
  return height;
}
