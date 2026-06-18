/* ============================================================
   WOLFPACK OS — design sonore d'interface (WebAudio, synthétisé)
   Zéro fichier audio : bips générés à la volée. Coupé par défaut,
   activé par l'utilisateur (toggle), persistant. AudioContext créé
   au premier geste pour respecter les politiques navigateur.
   ============================================================ */
window.WPK = window.WPK || {};

WPK.audio = (function () {
  "use strict";

  const KEY = "wpk_sfx";
  let ctx = null, master = null, enabled = false;

  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.14;
    master.connect(ctx.destination);
    return ctx;
  }

  function beep(freq, dur, type, vol, delay) {
    if (!enabled) return;
    const c = ensureCtx(); if (!c) return;
    if (c.state === "suspended") c.resume();
    const t0 = c.currentTime + (delay || 0);
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || "square";
    o.frequency.setValueAtTime(freq, t0);
    o.connect(g); g.connect(master);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol || 0.5, t0 + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + (dur || 0.08));
    o.start(t0); o.stop(t0 + (dur || 0.08) + 0.02);
  }

  const SFX = {
    hover: function () { beep(900, 0.025, "square", 0.12); },
    nav:   function () { beep(540, 0.05, "square", 0.32); beep(760, 0.06, "square", 0.28, 0.045); },
    open:  function () { beep(420, 0.05, "sawtooth", 0.3); beep(900, 0.09, "square", 0.26, 0.05); },
    close: function () { beep(560, 0.05, "square", 0.26); beep(320, 0.08, "square", 0.28, 0.04); },
    key:   function () { beep(680, 0.02, "square", 0.1); }
  };

  function play(name) { const f = SFX[name]; if (f) f(); }

  function updateBtn() {
    const b = document.getElementById("sfx-toggle");
    if (!b) return;
    b.setAttribute("aria-pressed", String(enabled));
    b.title = enabled ? "Son d'interface : activé" : "Son d'interface : coupé";
    b.innerHTML = '<i data-lucide="' + (enabled ? "volume-2" : "volume-x") + '"></i>';
    if (window.lucide) lucide.createIcons();
  }

  function toggle() {
    enabled = !enabled;
    try { localStorage.setItem(KEY, enabled ? "1" : "0"); } catch (e) {}
    updateBtn();
    if (enabled) { ensureCtx(); play("open"); }
  }

  function init() {
    try { enabled = localStorage.getItem(KEY) === "1"; } catch (e) { enabled = false; }
    updateBtn();
  }

  return { init: init, play: play, toggle: toggle, isEnabled: function () { return enabled; } };
})();
