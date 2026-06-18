/* ============================================================
   WOLFPACK OS — effets holographiques
   - scramble() : désembrouillage de texte (décodage holo)
   - decrypt()  : bandeau « DÉCRYPTAGE » au changement de section
   Toujours dégradé propre en prefers-reduced-motion.
   ============================================================ */
window.WPK = window.WPK || {};

WPK.fx = (function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&/\\<>*+=-アカサタナハマヤラ";
  const rnd = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

  // Désembrouille le texte d'un élément (révélation gauche → droite).
  function scramble(el, opts) {
    if (!el) return;
    opts = opts || {};
    const finalText = opts.text != null ? opts.text : (el.dataset.fxText || el.textContent);
    el.dataset.fxText = finalText;
    // nom accessible stable : le lecteur d'écran lit le vrai texte, pas le brouillage
    el.setAttribute("aria-label", finalText);
    if (reduce) { el.textContent = finalText; return; }

    const dur = opts.duration || 680;
    const chars = finalText.split("");
    const start = performance.now();
    if (el._fxRAF) cancelAnimationFrame(el._fxRAF);
    el.classList.add("is-decoding");

    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const reveal = Math.floor(t * chars.length);
      let out = "";
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c === " ") { out += " "; continue; }
        out += i < reveal ? c : rnd();
      }
      el.textContent = out;
      if (t < 1) { el._fxRAF = requestAnimationFrame(frame); }
      else { el.textContent = finalText; el.classList.remove("is-decoding"); el._fxRAF = null; }
    }
    el._fxRAF = requestAnimationFrame(frame);
  }

  /* ---- Bandeau « DÉCRYPTAGE » --------------------------- */
  let bar;
  function ensureBar() {
    if (bar) return bar;
    bar = document.createElement("div");
    bar.className = "decrypt";
    bar.setAttribute("aria-hidden", "true");
    bar.innerHTML =
      '<span class="decrypt__label">DÉCRYPTAGE</span>' +
      '<span class="decrypt__pct">0%</span>' +
      '<span class="decrypt__track"><i class="decrypt__fill"></i></span>';
    document.body.appendChild(bar);
    return bar;
  }

  function decrypt() {
    if (reduce) return;
    const o = ensureBar();
    const pct = o.querySelector(".decrypt__pct");
    const fill = o.querySelector(".decrypt__fill");
    o.classList.remove("is-on"); void o.offsetWidth; o.classList.add("is-on");
    const start = performance.now(), dur = 440;
    if (o._raf) cancelAnimationFrame(o._raf);
    function f(now) {
      const t = Math.min(1, (now - start) / dur);
      pct.textContent = Math.floor(t * 100) + "%";
      fill.style.transform = "scaleX(" + t + ")";
      if (t < 1) { o._raf = requestAnimationFrame(f); }
      else { o.classList.remove("is-on"); o._raf = null; }
    }
    o._raf = requestAnimationFrame(f);
  }

  return { scramble: scramble, decrypt: decrypt };
})();
