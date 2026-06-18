/* ============================================================
   WOLFPACK OS — logique d'application (shell + QG)
   ============================================================ */
window.WPK = window.WPK || {};

WPK.app = (function () {
  "use strict";

  const SECTIONS = ["home", "history", "members", "arsenal", "hangar", "medals", "fangs", "recruitment"];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let modal, modalBody, lastFocus, booted = false;

  /* ---- Icônes lucide (jeu d'icônes établi) -------------- */
  function icons() { if (window.lucide) lucide.createIcons(); }

  /* ---- Horloge galactique ------------------------------- */
  function clock() {
    const t = document.getElementById("galactic-time");
    const label = document.getElementById("time-label");
    if (!t || !label) return;
    const now = new Date();
    const mm = String(now.getMinutes()).padStart(2, "0");
    const local = String(now.getHours()).padStart(2, "0");
    const coruscant = String((now.getHours() + 2) % 24).padStart(2, "0");
    if (now.getSeconds() % 10 < 5) { t.textContent = `${local}:${mm}`; label.textContent = "LOCAL TIME"; }
    else { t.textContent = `${coruscant}:${mm}`; label.textContent = "CORUSCANT"; }
  }

  /* ---- Routage par hash + onglets ----------------------- */
  function showSection(id) {
    if (!SECTIONS.includes(id)) id = "home";
    document.querySelectorAll(".section").forEach((s) => s.classList.toggle("is-active", s.id === id));
    document.querySelectorAll(".nav__link").forEach((a) => {
      const on = a.dataset.tab === id;
      a.toggleAttribute("aria-current", on);
      if (on) a.setAttribute("aria-current", "page");
    });
    document.getElementById("nav").classList.remove("is-open");
    document.getElementById("menu-toggle").setAttribute("aria-expanded", "false");
    // focus le titre de section pour les lecteurs d'écran (hors 1er chargement)
    const head = document.querySelector(`#${id} [data-section-title]`);
    if (head && document.activeElement !== document.body) head.focus({ preventScroll: false });

    // FX : décodage holographique du titre + bandeau décryptage
    if (head && WPK.fx) WPK.fx.scramble(head, { duration: 620 });
    if (WPK.fx) WPK.fx.decrypt();
    // médias paresseux : seules les vidéos de la section active jouent
    if (WPK.media) WPK.media.playSection(id);
  }
  function routeFromHash() { showSection((location.hash || "#home").slice(1)); }
  function goTo(id) { if (location.hash.slice(1) === id) showSection(id); else location.hash = id; }

  /* ---- Modale (native <dialog>) ------------------------- */
  function openModal(html) {
    lastFocus = document.activeElement;
    modalBody.innerHTML = html;
    icons();
    if (!modal.open) modal.showModal();
    if (WPK.media) WPK.media.playWithin(modalBody);
    if (WPK.audio) WPK.audio.play("open");
  }
  function closeModal() {
    if (modal.open) modal.close();
  }
  function statusClass(s) {
    if (/Échec|Pertes/.test(s)) return "is-bad";
    return "is-ok";
  }
  function openMission(id) {
    const m = WPK.missions.find((x) => x.id === id);
    if (!m) return;
    const outClass = /Pertes/.test(m.outcome) ? "is-bad" : "is-warn";
    openModal(`
      <h2 class="dossier__title display">${m.title}</h2>
      <p class="dossier__type">${m.type}</p>
      <div class="dossier__grid">
        <div>
          <h3 class="sys-label" style="margin-bottom:.5rem">Briefing de mission</h3>
          <p class="dossier__brief">${m.desc}</p>
        </div>
        <div class="dossier__out">
          <h3 class="sys-label" style="margin-bottom:.5rem">Statut</h3>
          <p class="val ${statusClass(m.status)}">${m.status}</p>
          <h3 class="sys-label" style="margin:1rem 0 .5rem">Résultat stratégique</h3>
          <p class="val ${outClass}">&gt; ${m.outcome}</p>
        </div>
      </div>
    `);
  }
  WPK.openMission = openMission;

  /* ---- Effectifs : chaîne de commandement (tiers) ------- */
  const ROSTER_TIERS = [
    { key: "cmd", code: "CMD", label: "Commandement",       ids: ["plo", "wolffe"] },
    { key: "nco", code: "NCO", label: "Encadrement",        ids: ["warthog", "tracer"] },
    { key: "ops", code: "OPS", label: "Troupe d'élite",     ids: ["sinker", "comet", "boost"] }
  ];
  // Enrichissement (jamais de suppression de contenu canon).
  const IDENT_OVERRIDE = { plo: { callsign: "Plo Koon", desig: "Général Jedi" } };

  function parseIdent(m) {
    if (IDENT_OVERRIDE[m.id]) return IDENT_OVERRIDE[m.id];
    const q = m.name.match(/['‘’]([^'‘’]+)['‘’]/);          // indicatif entre quotes
    const callsign = q ? q[1] : m.name;
    const desig = q ? m.name.replace(/\s*['‘’][^'‘’]+['‘’]\s*/, " ").trim() : (m.rank || "");
    return { callsign: callsign, desig: desig };
  }

  function officerCard(m) {
    const { callsign, desig } = parseIdent(m);
    return `
      <button class="officer" type="button" data-member="${m.id}" aria-label="Dossier : ${callsign}, ${m.rank}">
        <span class="officer__media">
          <video src="${m.image}" loop muted playsinline preload="none"></video>
          <span class="officer__rank">${m.rank}</span>
        </span>
        <span class="officer__body">
          <span class="officer__callsign">${callsign}</span>
          <span class="officer__desig">${desig}</span>
          <span class="officer__role">${m.role}</span>
          <span class="officer__open">Ouvrir le dossier <i class="ico" data-lucide="arrow-right"></i></span>
        </span>
      </button>`;
  }

  function rosterRow(m) {
    const { callsign, desig } = parseIdent(m);
    return `
      <button class="roster-row" type="button" data-member="${m.id}" aria-label="Dossier : ${callsign}, ${m.rank}">
        <span class="roster-row__media">
          <video src="${m.image}" loop muted playsinline preload="none"></video>
        </span>
        <span class="roster-row__id">
          <span class="roster-row__mat">${desig}</span>
          <span class="roster-row__name">${callsign}</span>
          <span class="roster-row__role">${m.rank} · ${m.role}</span>
        </span>
        <span class="roster-row__go">
          <span class="roster-row__go-label">Dossier</span>
          <i class="ico" data-lucide="chevron-right"></i>
        </span>
      </button>`;
  }

  function renderRoster() {
    const root = document.getElementById("roster");
    if (!root) return;
    const byId = (id) => WPK.members.find((x) => x.id === id);
    root.innerHTML = ROSTER_TIERS.map((tier) => {
      const members = tier.ids.map(byId).filter(Boolean);
      if (!members.length) return "";
      const body = tier.key === "cmd"
        ? members.map(officerCard).join("")
        : members.map(rosterRow).join("");
      return `
        <section class="tier tier--${tier.key}" aria-label="${tier.label}">
          <h3 class="tier__label"><span class="tier__code">// ${tier.code}</span> ${tier.label}
            <span class="tier__count">${String(members.length).padStart(2, "0")}</span></h3>
          <div class="tier__body">${body}</div>
        </section>`;
    }).join("");
    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-member]");
      if (btn) openMember(btn.dataset.member);
    });
    icons();
  }

  function openMember(id) {
    const m = WPK.members.find((x) => x.id === id);
    if (!m) return;
    const { callsign, desig } = parseIdent(m);
    openModal(`
      <h2 class="dossier__title display">${callsign}</h2>
      <p class="dossier__type">${m.rank} · ${m.role}</p>
      <div class="member__grid">
        <div class="member__portrait">
          <video src="${m.image}" loop muted playsinline preload="none"></video>
        </div>
        <div>
          <dl class="fiche">
            <dt>Matricule</dt><dd>${desig}</dd>
            <dt>Grade</dt><dd>${m.rank}</dd>
            <dt>Fonction</dt><dd>${m.role}</dd>
            <dt>Statut</dt><dd class="is-ok">Actif — en service</dd>
          </dl>
          <h3 class="member__bio-label">Biographie &amp; Service</h3>
          <p class="member__bio">${m.bio}</p>
        </div>
      </div>
    `);
  }
  WPK.openMember = openMember;

  /* ---- Barre de stat (réutilise components.css) --------- */
  function statBar(label, val) {
    const v = Math.max(0, Math.min(100, val || 0));
    return `<div>
      <div class="stat__head"><span>${label}</span><span>${v}%</span></div>
      <div class="stat__track"><div class="stat__fill" style="width:${v}%"></div></div>
    </div>`;
  }

  /* ---- Armurerie : inventaire + modale arme ------------- */
  const STAT_W = [["power", "Puissance"], ["range", "Portée"], ["rate", "Cadence"], ["stability", "Stabilité"]];

  // Établi master-detail : une grande pièce sélectionnée + rail de vignettes.
  function renderArsenal() {
    const root = document.getElementById("arsenal-grid");
    if (!root) return;
    root.innerHTML = `
      <div class="bench__stage" id="weapon-stage" aria-live="polite"></div>
      <div class="bench__rail" id="weapon-rail" role="tablist" aria-label="Inventaire des armes">
        ${WPK.arsenal.map((a, i) => `
          <button class="bench__thumb${i === 0 ? " is-active" : ""}" type="button" role="tab"
                  data-weapon="${a.id}" aria-selected="${i === 0}">
            <span class="bench__thumb-img"><img src="${a.image}" alt="" loading="lazy"></span>
            <span class="bench__thumb-txt">
              <span class="bench__thumb-name">${a.name}</span>
              <span class="bench__thumb-type">${a.type}</span>
            </span>
          </button>`).join("")}
      </div>`;
    root.querySelector("#weapon-rail").addEventListener("click", (e) => {
      const b = e.target.closest("[data-weapon]");
      if (b) selectWeapon(b.dataset.weapon, true);
    });
    if (WPK.arsenal[0]) selectWeapon(WPK.arsenal[0].id, false);
  }

  function selectWeapon(id, fromUser) {
    const a = WPK.arsenal.find((x) => x.id === id);
    const stage = document.getElementById("weapon-stage");
    if (!a || !stage) return;
    const media = a.video
      ? `<video src="${a.video}" poster="${a.image}" loop muted playsinline preload="none"></video>`
      : `<img src="${a.image}" alt="${a.name}">`;
    stage.innerHTML = `
      <div class="stage__media">
        ${media}
        <span class="stage__cat"><i class="ico" data-lucide="${a.icon}"></i>${a.type}</span>
        <span class="stage__id mono">ID · ${a.id.toUpperCase()}</span>
      </div>
      <div class="stage__body">
        <h3 class="stage__name display">${a.name}</h3>
        <p class="stage__manu">Fabricant · <b>${a.manu}</b></p>
        <div class="stats stage__stats">${STAT_W.map(([k, l]) => statBar(l, a.stats[k])).join("")}</div>
        <p class="stage__desc">${a.desc}</p>
      </div>`;
    document.querySelectorAll("#weapon-rail .bench__thumb").forEach((t) => {
      const on = t.dataset.weapon === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    icons();
    if (WPK.media) WPK.media.playWithin(stage);
    if (fromUser && WPK.audio) WPK.audio.play("nav");
  }
  // Entrée depuis la palette : navigue puis sélectionne.
  function openWeapon(id) { goTo("arsenal"); setTimeout(() => selectWeapon(id, false), 0); }
  WPK.openWeapon = openWeapon;

  /* ---- Hangar : fiches véhicules (détail inline) -------- */
  const STAT_V = [["speed", "Vitesse"], ["firepower", "Puissance"], ["armor", "Blindage"], ["maneuverability", "Maniabilité"]];

  function renderHangar() {
    const root = document.getElementById("vehicle-grid");
    if (!root) return;
    root.innerHTML = `
      <div class="bench__stage" id="vehicle-stage" aria-live="polite"></div>
      <div class="bench__rail" id="vehicle-rail" role="tablist" aria-label="Flotte du hangar">
        ${WPK.vehicles.map((v, i) => `
          <button class="bench__thumb${i === 0 ? " is-active" : ""}" type="button" role="tab"
                  data-vehicle="${v.id}" aria-selected="${i === 0}">
            <span class="bench__thumb-img"><img src="${v.image}" alt="" loading="lazy"></span>
            <span class="bench__thumb-txt">
              <span class="bench__thumb-name">${v.name}</span>
              <span class="bench__thumb-type">${v.type}</span>
            </span>
          </button>`).join("")}
      </div>`;
    root.querySelector("#vehicle-rail").addEventListener("click", (e) => {
      const b = e.target.closest("[data-vehicle]");
      if (b) selectVehicle(b.dataset.vehicle, true);
    });
    if (WPK.vehicles[0]) selectVehicle(WPK.vehicles[0].id, false);
  }

  function selectVehicle(id, fromUser) {
    const v = WPK.vehicles.find((x) => x.id === id);
    const stage = document.getElementById("vehicle-stage");
    if (!v || !stage) return;
    const pilots = (v.pilots || []).map((p) => `
      <span class="pilot">
        <span class="pilot__avatar"><video src="${p.img}" loop muted playsinline preload="none"></video></span>
        <span class="pilot__name">${p.name}</span>
      </span>`).join("");
    stage.innerHTML = `
      <div class="stage__media stage__media--wide">
        <img src="${v.image}" alt="${v.name}">
        <span class="stage__cat">${v.type}</span>
      </div>
      <div class="stage__body">
        <h3 class="stage__name display">${v.name}</h3>
        <p class="stage__manu">Fabricant · <b>${v.manu}</b></p>
        <div class="stats stage__stats">${STAT_V.map(([k, l]) => statBar(l, v.stats[k])).join("")}</div>
        <p class="stage__desc">${v.desc}</p>
        <div class="craft__pilots">
          <p class="craft__pilots-h">Pilotes certifiés</p>
          <div class="pilot-list">${pilots}</div>
        </div>
      </div>`;
    document.querySelectorAll("#vehicle-rail .bench__thumb").forEach((t) => {
      const on = t.dataset.vehicle === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    icons();
    if (WPK.media) WPK.media.playWithin(stage);
    if (fromUser && WPK.audio) WPK.audio.play("nav");
  }

  /* ---- Médailles : mur des distinctions ----------------- */
  const MEDAL_RARE = {
    "border-red-600":    { cls: "red",  label: "Distinction de combat" },
    "border-blue-800":   { cls: "blue", label: "Distinction opérationnelle" },
    "border-yellow-400": { cls: "gold", label: "Distinction suprême" }
  };

  function renderMedals() {
    const grid = document.getElementById("medals-grid");
    if (!grid) return;
    // la distinction suprême ouvre le mur en pleine largeur
    const feat = WPK.medals.filter((m) => m.id === "predator");
    const rest = WPK.medals.filter((m) => m.id !== "predator");
    grid.innerHTML = feat.concat(rest).map((m) => {
      const r = MEDAL_RARE[m.color] || { cls: "blue", label: "Distinction" };
      const feature = m.id === "predator" ? " medal--feature" : "";
      return `
      <article class="medal medal--${r.cls}${feature}">
        <div class="medal__medallion"><img src="${m.image}" alt="${m.name}" loading="lazy"></div>
        <div class="medal__info">
          <p class="medal__rare">${r.label}</p>
          <h3 class="medal__name">${m.name}</h3>
          <p class="medal__desc">${m.desc}</p>
        </div>
      </article>`;
    }).join("");
  }

  /* ---- Révélation des panneaux (build holo) ------------- */
  function revealPanels() {
    const panels = document.querySelectorAll("[data-reveal]");
    if (reduceMotion) { panels.forEach((p) => (p.style.opacity = "1")); return; }
    panels.forEach((p, i) => {
      p.style.opacity = "0";
      p.style.transform = "translateY(16px)";
      p.style.transition = "opacity var(--dur-slow) var(--ease-out-expo), transform var(--dur-slow) var(--ease-out-expo)";
      setTimeout(() => { p.style.opacity = "1"; p.style.transform = "none"; }, 120 + i * 140);
    });
  }

  /* ---- Démarrage (appelé par boot.js) ------------------- */
  function start(ct) {
    if (booted) return;            // idempotent : ne câble les handlers qu'une fois
    booted = true;
    const app = document.getElementById("app");

    // matricule
    document.querySelectorAll("[data-ct]").forEach((el) => (el.textContent = ct || WPK.ctId || "CT-0000"));

    // nav
    document.querySelectorAll(".nav__link").forEach((a) => {
      a.addEventListener("click", (e) => { e.preventDefault(); if (WPK.audio) WPK.audio.play("nav"); goTo(a.dataset.tab); });
      a.addEventListener("pointerenter", () => { if (WPK.audio) WPK.audio.play("hover"); });
    });
    document.querySelectorAll("[data-goto]").forEach((b) => {
      b.addEventListener("click", () => goTo(b.dataset.goto));
    });

    // menu mobile
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // carte galactique → modales mission
    document.querySelectorAll("[data-mission]").forEach((n) => {
      n.addEventListener("click", () => openMission(n.dataset.mission));
    });

    // effectifs → roster + modales membre
    renderRoster();
    // armurerie / hangar / médailles
    renderArsenal();
    renderHangar();
    renderMedals();

    // modale
    modal = document.getElementById("modal");
    modalBody = document.getElementById("modal-body");
    document.getElementById("modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); }); // clic backdrop
    modal.addEventListener("close", () => {
      if (WPK.media) WPK.media.pauseWithin(modalBody);
      if (WPK.audio) WPK.audio.play("close");
      if (lastFocus) lastFocus.focus();
    });

    // routage
    window.addEventListener("hashchange", routeFromHash);
    routeFromHash();

    // horloge
    clock();
    setInterval(clock, 1000);

    // titre dynamique (immersion)
    const baseTitle = document.title;
    window.addEventListener("blur", () => { document.title = "Connexion perdue..."; });
    window.addEventListener("focus", () => { document.title = baseTitle; });

    // modules : son d'interface + palette holonet
    if (WPK.audio) WPK.audio.init();
    if (WPK.palette) WPK.palette.init();

    const sfxBtn = document.getElementById("sfx-toggle");
    if (sfxBtn && WPK.audio) sfxBtn.addEventListener("click", () => WPK.audio.toggle());

    const palBtn = document.getElementById("palette-open");
    if (palBtn && WPK.palette) palBtn.addEventListener("click", () => WPK.palette.open());

    // raccourci ⌘K / Ctrl-K → Requête Holonet
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (WPK.palette) WPK.palette.open();
      }
    });

    // décodage du matricule à la connexion
    if (WPK.fx) {
      const ctEl = document.getElementById("header-ct-id");
      if (ctEl) WPK.fx.scramble(ctEl, { duration: 900 });
    }

    // en ligne
    requestAnimationFrame(() => app.classList.add("is-online"));
    icons();
    revealPanels();
  }

  return { start: start, openMission: openMission, goTo: goTo, openPalette: function () { if (WPK.palette) WPK.palette.open(); } };
})();
