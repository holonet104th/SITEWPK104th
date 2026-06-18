/* ============================================================
   WOLFPACK OS — Écran d'accueil cinématique
   S'affiche après l'amorçage : sigil du loup, devise, accès au
   terminal. Géré par boot.js (show/skip).
   ============================================================ */
window.WPK = window.WPK || {};

WPK.splash = (function () {
  "use strict";

  let el, btn;

  function build() {
    el = document.getElementById("splash");
    if (!el) return;
    btn = document.getElementById("splash-enter");
    if (btn) btn.addEventListener("click", enter);
  }

  function show() {
    if (!el) build();
    if (!el) return;
    document.querySelectorAll("#splash [data-ct]").forEach((x) => (x.textContent = WPK.ctId || "CT-0000"));
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add("is-on"));
    if (window.lucide) lucide.createIcons();
    if (btn) btn.focus();
  }

  function enter() {
    if (!el) return;
    if (WPK.audio) WPK.audio.play("open");
    el.classList.add("is-leaving");
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      el.hidden = true;
      el.classList.remove("is-on", "is-leaving");
      const h = document.querySelector("#home [data-section-title]");
      if (h) h.focus();
    };
    el.addEventListener("transitionend", finish, { once: true });
    setTimeout(finish, 700);
  }

  function skip() { if (!el) build(); if (el) el.hidden = true; }

  build();
  return { show: show, skip: skip };
})();
