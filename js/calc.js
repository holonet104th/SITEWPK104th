/* ============================================================
   WOLFPACK OS — Calcul de Triangulation (mortier / AV-7 / AV-8)
   Algorithme fourni par l'utilisateur, conservé tel quel.
   Optimisé pour la saisie rapide en mission : sélection au focus,
   Entrée = champ suivant, copie de l'instruction, valeurs mémorisées.
   ============================================================ */
window.WPK = window.WPK || {};

WPK.calc = (function () {
  "use strict";

  const FIELDS = ["distCB", "azCB", "distAC", "azCA", "denivel"];
  const PKEY = "wpk_calc";
  function $(id) { return document.getElementById(id); }

  function normalize(angle) {
    angle = angle % 360;
    if (angle < 0) angle += 360;
    return angle;
  }
  function azimuthToCartesian(azimuth, distance) {
    const rad = azimuth * Math.PI / 180;
    return { x: distance * Math.sin(rad), y: distance * Math.cos(rad) };
  }
  function cartesianToAzimuth(x, y) {
    return normalize(Math.atan2(x, y) * 180 / Math.PI);
  }

  function persist() {
    try {
      const o = {};
      FIELDS.forEach((id) => (o[id] = $(id).value));
      localStorage.setItem(PKEY, JSON.stringify(o));
    } catch (e) {}
  }
  function restore() {
    try {
      const o = JSON.parse(localStorage.getItem(PKEY));
      if (o) FIELDS.forEach((id) => { if (o[id] != null && $(id)) $(id).value = o[id]; });
    } catch (e) {}
  }

  // accepte le séparateur décimal virgule (saisie FR)
  function num(id) { return parseFloat(($(id).value || "").replace(",", ".")); }

  function calculer() {
    const distCB = num("distCB");
    const azCB   = num("azCB");
    const distAC = num("distAC");
    const azCA   = num("azCA");
    const denivel = num("denivel") || 0;

    const errorDiv = $("error");
    const results = $("results");

    // un azimuth peut valoir 0° : on teste l'existence du nombre, pas sa "vérité"
    if ([distCB, azCB, distAC, azCA].some((v) => Number.isNaN(v))) {
      errorDiv.textContent = "⚠️ Veuillez remplir tous les champs de distance et d'azimuth.";
      errorDiv.classList.add("active");
      results.classList.remove("active");
      return;
    }
    if (distCB <= 0 || distAC <= 0) {
      errorDiv.textContent = "⚠️ Les distances doivent être positives.";
      errorDiv.classList.add("active");
      results.classList.remove("active");
      return;
    }
    errorDiv.classList.remove("active");

    // ALGO : passage en coordonnées cartésiennes
    const azAC = normalize(azCA + 180);          // C→A inverse de A→C
    const vecAC = azimuthToCartesian(azAC, distAC);   // C relatif à A
    const vecCB = azimuthToCartesian(azCB, distCB);   // B relatif à C
    const vecAB = { x: vecAC.x + vecCB.x, y: vecAC.y + vecCB.y };

    const distAB = Math.sqrt(vecAB.x * vecAB.x + vecAB.y * vecAB.y);
    const azAB = cartesianToAzimuth(vecAB.x, vecAB.y);
    const elev = Math.atan(denivel / Math.max(0.1, distAB)) * 180 / Math.PI;

    const azABRound = Math.round(azAB * 10) / 10;
    const distABRound = Math.round(distAB);
    const elevRound = Math.round(elev * 10) / 10;

    $("azABValue").textContent = azABRound;
    $("distABValue").textContent = distABRound;
    $("elevValue").textContent = elevRound;
    $("azABCommand").textContent = azABRound;
    $("distABCommand").textContent = distABRound;
    $("elevCommand").textContent = elevRound;

    results.classList.add("active");
    persist();
  }

  function resetForm() {
    $("distCB").value = "51";
    $("azCB").value = "221";
    $("distAC").value = "51";
    $("azCA").value = "318";
    $("denivel").value = "0";
    calculer();
    $("distCB").focus();
  }

  /* ---- Copie de l'instruction de tir --------------------- */
  let copyTimer;
  function copyCmd() {
    if (!$("results").classList.contains("active")) return;
    const txt = "Azimuth " + $("azABCommand").textContent + "° | Élévation " +
                $("elevCommand").textContent + "° | Portée " + $("distABCommand").textContent + " m";
    const done = (ok) => {
      const t = $("calc-copy-txt");
      if (t) { t.textContent = ok ? "Copié ✓" : "Échec"; clearTimeout(copyTimer); copyTimer = setTimeout(() => (t.textContent = "Copier"), 1600); }
      if (ok && WPK.audio) WPK.audio.play("key");
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(() => done(true)).catch(() => done(false));
    } else {
      // repli : sélection d'un textarea temporaire
      const ta = document.createElement("textarea");
      ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { done(document.execCommand("copy")); } catch (e) { done(false); }
      document.body.removeChild(ta);
    }
  }

  /* ---- Saisie rapide : sélection au focus + Entrée ------- */
  function wireFastInput() {
    FIELDS.forEach((id, i) => {
      const el = $(id);
      if (!el) return;
      el.addEventListener("input", calculer);
      el.addEventListener("focus", () => el.select());
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const next = $(FIELDS[i + 1]);
          if (next) next.focus();
          else { el.blur(); copyCmd(); }   // dernier champ : copie directe
        }
      });
    });
  }

  let dlg, lastFocus;
  function open() {
    dlg = dlg || $("calc");
    if (!dlg || dlg.open || !dlg.showModal) return;
    lastFocus = document.activeElement;
    dlg.showModal();
    calculer();
    if (window.lucide) lucide.createIcons();
    const first = $("distCB");
    if (first) { first.focus(); first.select(); }
    if (WPK.audio) WPK.audio.play("open");
  }
  function close() { if (dlg && dlg.open) dlg.close(); }

  function init() {
    dlg = $("calc");
    if (!dlg) return;
    restore();
    $("calc-go").addEventListener("click", calculer);
    $("calc-reset").addEventListener("click", resetForm);
    $("calc-close").addEventListener("click", close);
    $("calc-copy").addEventListener("click", copyCmd);
    dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
    dlg.addEventListener("close", () => {
      if (WPK.audio) WPK.audio.play("close");
      if (lastFocus) lastFocus.focus();
    });
    wireFastInput();
    const openBtn = $("calc-open");
    if (openBtn) openBtn.addEventListener("click", open);
    calculer();   // prépare la solution
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);

  return { open: open, close: close };
})();
