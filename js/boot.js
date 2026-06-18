/* ============================================================
   Séquence de démarrage du terminal.
   - skippable (clic / touche / bouton)
   - ne rejoue qu'une fois par session (sessionStorage)
   - court-circuitée si prefers-reduced-motion
   ============================================================ */
(function () {
  "use strict";

  const boot = document.getElementById("boot");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alreadyBooted = sessionStorage.getItem("wpk_booted") === "1";

  // Matricule + hash partagés avec l'app
  const ct = "CT-" + (Math.floor(Math.random() * 8999) + 1000);
  const hash = () => Math.random().toString(36).substring(2, 10).toUpperCase();
  WPK.ctId = ct;

  let finished = false;

  function reveal() {
    if (finished) return;
    finished = true;
    sessionStorage.setItem("wpk_booted", "1");
    boot.classList.add("is-leaving");
    let started = false;
    const done = () => {
      if (started) return;        // transitionend ET setTimeout peuvent tous deux tirer
      started = true;
      boot.hidden = true;
      WPK.app.start(ct);
      if (WPK.splash) WPK.splash.show();
    };
    // attend la transition d'opacité, avec garde-fou
    boot.addEventListener("transitionend", done, { once: true });
    setTimeout(done, 700);
  }

  // Chemin court : déjà démarré cette session → pas de re-splash
  if (alreadyBooted) {
    boot.hidden = true;
    WPK.app.start(ct);
    if (WPK.splash) WPK.splash.skip();
    return;
  }
  // reduced-motion : on saute l'amorçage animé, mais on garde l'accueil
  if (reduceMotion) {
    boot.hidden = true;
    WPK.app.start(ct);
    if (WPK.splash) WPK.splash.show();
    return;
  }

  // --- Séquence complète ---
  const logsEl = document.getElementById("boot-logs");
  const fill = document.getElementById("boot-fill");
  const msg = document.getElementById("boot-msg");
  const pct = document.getElementById("boot-pct");
  const hashEl = document.getElementById("boot-hash");
  const skipBtn = document.getElementById("boot-skip");

  // logs de fond
  let logText = "";
  const systems = ["KERNEL", "MEM", "NET", "BIO", "SEC"];
  for (let i = 0; i < 400; i++) {
    const h = Math.random().toString(16).substring(2, 8);
    const sys = systems[Math.floor(Math.random() * systems.length)];
    logText += `<span style="opacity:${Math.random().toFixed(2)}">[${sys}] 0x${h} OK</span> `;
    if (i % 8 === 0) logText += "<br>";
  }
  logsEl.innerHTML = logText;

  const steps = [
    { p: 5,   m: "Power On Self Test (POST)..." },
    { p: 20,  m: "Loading Kernel v7.9..." },
    { p: 45,  m: "Mounting File Systems..." },
    { p: 60,  m: `Authenticating ${ct}...` },
    { p: 85,  m: "Decrypting Secure Channels..." },
    { p: 100, m: "System Ready." }
  ];

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  (async function run() {
    for (const s of steps) {
      if (finished) return;
      await sleep(Math.floor(Math.random() * 400) + 300);
      fill.style.transform = "scaleX(" + (s.p / 100) + ")";
      msg.textContent = s.m;
      pct.textContent = s.p + "%";
      hashEl.textContent = "HASH: " + hash();
    }
    await sleep(550);
    reveal();
  })();

  // Skip
  skipBtn.addEventListener("click", reveal);
  boot.addEventListener("click", (e) => { if (e.target !== skipBtn) reveal(); });
  window.addEventListener("keydown", function onKey(e) {
    if (boot.hidden) { window.removeEventListener("keydown", onKey); return; }
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") { e.preventDefault(); reveal(); }
  });
})();
