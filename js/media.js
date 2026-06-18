/* ============================================================
   WOLFPACK OS — médias paresseux
   Ne joue que les vidéos de la section visible (ou d'une modale
   ouverte) ; les autres restent en pause. Paie la dette .webm :
   plus de ~20 vidéos qui s'arment au chargement.
   ============================================================ */
window.WPK = window.WPK || {};

WPK.media = (function () {
  "use strict";

  function tryPlay(v) {
    if (v.preload === "none") v.preload = "auto";
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }

  // Joue les vidéos de la section active, met les autres en pause.
  function playSection(id) {
    const sec = document.getElementById(id);
    document.querySelectorAll("#main video, .leader video").forEach((v) => {
      if (!sec || !sec.contains(v)) { try { v.pause(); } catch (e) {} }
    });
    if (!sec) return;
    sec.querySelectorAll("video").forEach(tryPlay);
  }

  function playWithin(root) {
    if (root) root.querySelectorAll("video").forEach(tryPlay);
  }
  function pauseWithin(root) {
    if (root) root.querySelectorAll("video").forEach((v) => { try { v.pause(); } catch (e) {} });
  }

  return { playSection: playSection, playWithin: playWithin, pauseWithin: pauseWithin };
})();
