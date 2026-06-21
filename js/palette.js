/* ============================================================
   WOLFPACK OS — Requête Holonet (palette de commande ⌘K / Ctrl-K)
   Recherche/navigation instantanée : sections, effectifs, armes,
   véhicules, distinctions, missions. Dialog natif (échappe au
   stacking context), clavier complet, ARIA combobox/listbox.
   ============================================================ */
window.WPK = window.WPK || {};

WPK.palette = (function () {
  "use strict";

  let dlg, input, list, items = [], view = [], active = 0, built = false;

  function buildIndex() {
    items = [];
    [["home", "QG"], ["history", "Archives"], ["members", "Effectifs"], ["arsenal", "Armurerie"],
     ["hangar", "Hangar"], ["medals", "Médailles"], ["fangs", "Ordre des Crocs"], ["recruitment", "Recrutement"]
    ].forEach((s) => items.push({ label: s[1], sub: "Section", icon: "chevron-right", kw: s[0], run: () => WPK.app.goTo(s[0]) }));

    // outil : calcul de triangulation (accès rapide « tir »)
    items.push({ label: "Calcul de triangulation", sub: "Outil · tir mortier / AV",
      icon: "crosshair", kw: "tir calcul mortier triangulation artillerie coordonnées",
      run: () => { if (WPK.calc) WPK.calc.open(); } });

    (WPK.members || []).forEach((m) => items.push({ label: m.name, sub: "Effectif · " + m.rank, icon: "user",
      run: () => { WPK.app.goTo("members"); WPK.openMember(m.id); } }));
    (WPK.arsenal || []).forEach((a) => items.push({ label: a.name, sub: "Arme · " + a.type, icon: "crosshair",
      run: () => { WPK.app.goTo("arsenal"); WPK.openWeapon(a.id); } }));
    (WPK.vehicles || []).forEach((v) => items.push({ label: v.name, sub: "Véhicule · " + v.type, icon: "rocket",
      run: () => WPK.app.goTo("hangar") }));
    (WPK.medals || []).forEach((m) => items.push({ label: m.name, sub: "Distinction", icon: "award",
      run: () => WPK.app.goTo("medals") }));
    (WPK.missions || []).forEach((m) => items.push({ label: m.title, sub: "Mission · " + m.type, icon: "map-pin",
      run: () => { WPK.app.goTo("home"); WPK.openMission(m.id); } }));
  }

  function ensureDom() {
    if (built) return;
    built = true;
    buildIndex();
    dlg = document.createElement("dialog");
    dlg.id = "palette";
    dlg.className = "palette";
    dlg.setAttribute("aria-label", "Requête holonet");
    dlg.innerHTML =
      '<div class="palette__bar">' +
        '<i class="ico palette__prompt" data-lucide="terminal"></i>' +
        '<input id="palette-input" class="palette__input" type="text" role="combobox" ' +
          'aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list" ' +
          'placeholder="Requête holonet…  membre · arme · mission · section" autocomplete="off" spellcheck="false">' +
        '<kbd class="palette__esc">ESC</kbd>' +
      '</div>' +
      '<ul id="palette-list" class="palette__list" role="listbox" aria-label="Résultats"></ul>' +
      '<div class="palette__foot">' +
        '<span><kbd>↑</kbd><kbd>↓</kbd> naviguer</span>' +
        '<span><kbd>↵</kbd> ouvrir le dossier</span>' +
        '<span class="palette__count"></span>' +
      '</div>';
    document.body.appendChild(dlg);
    input = dlg.querySelector("#palette-input");
    list = dlg.querySelector("#palette-list");
    if (window.lucide) lucide.createIcons();

    input.addEventListener("input", () => filter(input.value));
    input.addEventListener("keydown", onKey);
    list.addEventListener("click", (e) => {
      const li = e.target.closest("[data-i]");
      if (li) choose(+li.dataset.i);
    });
    list.addEventListener("mousemove", (e) => {
      const li = e.target.closest("[data-i]");
      if (li && +li.dataset.i !== active) { active = +li.dataset.i; render(); }
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); }); // clic backdrop
  }

  function filter(q) {
    q = (q || "").trim().toLowerCase();
    view = q ? items.filter((it) => (it.label + " " + it.sub + " " + (it.kw || "")).toLowerCase().indexOf(q) >= 0)
             : items.slice();
    active = 0;
    render();
  }

  function render() {
    list.innerHTML = view.length ? view.map((it, i) =>
      '<li class="palette__opt' + (i === active ? " is-active" : "") + '" role="option" id="palette-opt-' + i + '" ' +
          'aria-selected="' + (i === active) + '" data-i="' + i + '">' +
        '<i class="ico" data-lucide="' + it.icon + '"></i>' +
        '<span class="palette__opt-label">' + it.label + '</span>' +
        '<span class="palette__opt-sub">' + it.sub + '</span>' +
      '</li>').join("")
      : '<li class="palette__empty">Aucun résultat // signal perdu</li>';
    const cnt = dlg.querySelector(".palette__count");
    if (cnt) cnt.textContent = view.length + " résultat" + (view.length > 1 ? "s" : "");
    if (window.lucide) lucide.createIcons();
    const act = list.querySelector(".is-active");
    if (act) act.scrollIntoView({ block: "nearest" });
    input.setAttribute("aria-activedescendant", view.length ? "palette-opt-" + active : "");
  }

  function move(d) {
    if (!view.length) return;
    active = (active + d + view.length) % view.length;
    render();
    if (WPK.audio) WPK.audio.play("key");
  }

  function choose(i) {
    const it = view[i];
    if (!it) return;
    close();
    setTimeout(() => { try { it.run(); } catch (e) {} }, 0);
  }

  function onKey(e) {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter") { e.preventDefault(); choose(active); }
  }

  function open() {
    ensureDom();
    if (dlg.open || !dlg.showModal) return;
    dlg.showModal();
    input.value = "";
    filter("");
    input.focus();
    if (WPK.audio) WPK.audio.play("open");
  }
  function close() { if (dlg && dlg.open) dlg.close(); }

  return { open: open, close: close, init: ensureDom };
})();
