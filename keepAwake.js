// keepAwake.js
// Periodically dispatch a synthetic click so that the browser registers user activity
// and prevents the screen from timing out. It targets coordinates (0, 0) which
// are usually safe (top-left corner) and unlikely to interfere with UI elements.
//
// NOTE: Modern browsers offer a Wake Lock API (navigator.wakeLock) which is a
// cleaner way to keep the screen awake, but it require HTTPS and may not be
// supported everywhere. This fallback solution uses synthetic events instead.

(function () {
  const SAFE_X = 0; // x-coordinate in CSS pixels
  const SAFE_Y = 0; // y-coordinate in CSS pixels
  const INTERVAL_MS = 60_000; // how often to click (here: 60 s)

  function dispatchClick() {
    const downEvt = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: SAFE_X,
      clientY: SAFE_Y,
    });

    const upEvt = new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: SAFE_X,
      clientY: SAFE_Y,
    });

    // Dispatch the events on the document so they do not interfere with
    // any particular element's own logic.
    document.dispatchEvent(downEvt);
    document.dispatchEvent(upEvt);
  }

  // Kick off the periodic clicks.
  setInterval(dispatchClick, INTERVAL_MS);
})();

let clickCount = 0;

document.addEventListener('mousedown', e => {
  // Filter only the synthetic ones, if you like:
  if (e.clientX === 0 && e.clientY === 0 && e.isTrusted === false) {
    clickCount++;
    console.log(`Synthetic click #${clickCount}`, Date.now());
  }
}); 
