/* ============================================================
   WOLFPACK OS — Données du bataillon
   Contenu repris à l'identique de la V1 (aucune paraphrase).
   Espace de noms global (scripts classiques) : zéro build, marche
   en double-clic comme sur GitHub Pages.
   ============================================================ */
window.WPK = window.WPK || {};

WPK.members = [
  {
    id: "plo",
    name: "Général Plo Koon",
    rank: "Général Jedi",
    image: "./img/plokoon.webm",
    role: "Wolf Leader",
    bio: "Kel Dor, membre du Conseil Jedi. Contrairement à beaucoup de Jedi, Plo Koon valorise la vie individuelle de ses clones. Il est un pilote expert et maîtrise une variante de la Force (Electric Judgment)."
  },
  {
    id: "wolffe",
    name: "CC-3636 'Wolffe'",
    rank: "Commandant Maréchal",
    image: "./img/wolffe.webm",
    role: "Commandement Tactique",
    bio: "Leader endurci et pragmatique. A perdu son œil droit face à Ventress. Il dirige la Wolfpack avec une discipline de fer mais une loyauté absolue. Son armure porte les cicatrices de mille batailles."
  },
  {
    id: "warthog",
    name: "ADJ 2435 'Warthog'",
    rank: "Adjudant",
    image: "./img/warthog.webm",
    role: "As Pilote",
    bio: "Pilote vétéran ayant servi sous Plo Koon dans de nombreuses batailles spatiales. Il est capable de faire voler une canonnière dans un trou de souris."
  },
  {
    id: "tracer",
    name: "SGT-C 7394 'Tracer'",
    rank: "Sergent-Chef",
    image: "./img/tracer.webm",
    role: "Co Pilote",
    bio: "Spécialisé dans les missions de reconnaissance et de combat aérien. Son surnom vient de son talent exceptionnel pour repérer, suivre et éliminer ses cibles avec une précision redoutable"
  },
  {
    id: "sinker",
    name: "SGT 2302 'Sinker'",
    rank: "Sergent",
    image: "./img/sinker.webm",
    role: "Support Lourd & Discipline",
    bio: "Vétéran de l'Abregado. Sinker est calme, direct et souvent celui qui garde la tête froide quand la situation dégénère. Expert en déploiement d'armes lourdes."
  },
  {
    id: "boost",
    name: "CPL 4860 'Boost'",
    rank: "Caporal",
    image: "./img/boost.webm",
    role: "Spécialiste Véhicule & Assaut",
    bio: "Survivant de la bataille d'Abregado. Boost est un pilier de la Wolfpack, formant souvent un binôme avec Sinker. Expert en pilotage de véhicules et en déploiement rapide, il incarne la ténacité du bataillon."
  },
  {
    id: "comet",
    name: "SGT 8925 'Comet'",
    rank: "Sergent",
    image: "./img/comet.webm",
    role: "Tech & Communications",
    bio: "Reconnaissable à ses marquages d'armure spécifiques. Comet est souvent chargé de la liaison radio et de la coordination des véhicules au sol."
  }
];

WPK.missions = [
  {
    id: "flotte",
    title: "FLOTTE COSMOS",
    type: "QG Mobile / Destroyer Venator",
    status: "En Orbite",
    desc: "Le cœur battant de la Wolfpack. Ce Destroyer Stellaire de classe Venator sert de base d'opérations principale. Il abrite nos chasseurs ARC-170, nos canonnières LAAT/i et l'ensemble du personnel tactique. C'est ici que sont planifiées toutes les interventions majeures dans la Bordure Extérieure.",
    outcome: "Opérationnel à 100%"
  },
  {
    id: "aleen",
    title: "MISSION ALEEN",
    type: "Secours Humanitaire",
    status: "Terminée",
    desc: "Suite à des séismes planétaires dévastateurs, la 104ème a été déployée en urgence pour sécuriser les zones d'atterrissage et fournir une aide médicale à la population locale. La mission a nécessité une coordination étroite avec les droïdes traducteurs pour rétablir le dialogue avec le peuple souterrain.",
    outcome: "Succès Total. Population stabilisée."
  },
  {
    id: "abregado",
    title: "INCIDENT ABREGADO",
    type: "Combat Spatial / Survie",
    status: "Échec Critique / Classifié",
    desc: "La flotte du 104ème, sous le commandement de Plo Koon, a intercepté le croiseur lourd Séparatiste 'Malevolence'. L'ennemi a déployé une arme ionique inconnue, neutralisant tous les systèmes de la flotte. S'en est suivi un massacre systématique des capsules de sauvetage par les Pods Hunters.",
    outcome: "Pertes: 98%. Survivants: Plo Koon, Wolffe, Sinker, Boost."
  },
  {
    id: "kamino",
    title: "DÉFENSE DE KAMINO",
    type: "Défense Planétaire",
    status: "Victoire Stratégique",
    desc: "Les Séparatistes ont lancé un assaut massif sur Tipoca City pour détruire les installations de clonage. La Wolfpack a été chargée de la défense des hangars inférieurs et de la protection des stocks génétiques. Wolffe et ses hommes ont repoussé plusieurs vagues de droïdes aqua.",
    outcome: "Installations sécurisées. Production maintenue."
  },
  {
    id: "felucia",
    title: "CAMPAGNE DE FELUCIA",
    type: "Guerre de Tranchées",
    status: "En Cours",
    desc: "Déploiement en soutien au 327ème Corps Stellaire. L'environnement fongique dense et la faune hostile rendent la progression difficile. La mission consiste à percer les lignes de droïdes pour sécuriser les stations d'épuration d'eau.",
    outcome: "Progression lente. Résistance forte."
  },
  {
    id: "christophsis",
    title: "SIÈGE DE CHRISTOPHSIS",
    type: "Combat Urbain",
    status: "Victoire",
    desc: "Intervention dans la Cité de Cristal pour briser le blocus Séparatiste. La Wolfpack a mené des opérations de guérilla urbaine pour désactiver les boucliers énergétiques ennemis, permettant l'arrivée des renforts lourds.",
    outcome: "Ville libérée. Traître appréhendé."
  },
  {
    id: "kadavo",
    title: "EXTRACTION DE KADAVO",
    type: "Infiltration / Sauvetage",
    status: "Terminée",
    desc: "Mission conjointe pour libérer les colons Togruta réduits en esclavage dans les installations minières de Kadavo. L'opération a nécessité l'utilisation de jetpacks pour un assaut vertical audacieux sur les tours de traitement suspendues.",
    outcome: "Esclaves libérés. Installation détruite."
  },
  {
    id: "lola",
    title: "LA CITADELLE",
    type: "Opération Black Ops",
    status: "Pertes Lourdes",
    desc: "Tentative d'extraction du Maître Jedi Even Piell de la prison de la Citadelle sur Lola Sayu. La Wolfpack a fourni un soutien tactique en orbite pour tenter de percer le blocus Séparatiste impénétrable.",
    outcome: "Extraction partielle. Données Nexus sécurisées."
  }
];

WPK.arsenal = [
  { id: "dc15s", name: "DC-15S Carbine", type: "Carabine", icon: "crosshair", color: "blue", image: "./img/dc15s.jpg",
    desc: "La DC-15S est une arme 'secondaire', idéale pour les combats à courte portée, notamment dans les bâtiments. Compacte et légère, elle excelle également comme l'une des rares armes pouvant être utilisée avec un jetpack.",
    manu: "Blastech Industries", stats: { power: 65, range: 40, rate: 85, stability: 90 }, video: "./img/dc15s.webm" },
  { id: "dc15a", name: "DC-15A Recon MKIII", type: "Fusil Haute Précision", icon: "target", color: "blue", image: "./img/dc15le.jpg",
    desc: "La DC-15A Recon MKIII est un fusil de haute précision. Modulable à toute situation, ainsi que sa longue portée et sa puissance en font une arme très efficace sur le champ de bataille. Elle est l'arme coeur de la Wolfpack",
    manu: "Blastech Industries", stats: { power: 95, range: 100, rate: 30, stability: 80 }, video: "./img/dc15le.webm" },
  { id: "dc17", name: "Dual DC-17 Blasters", type: "Arme de Poing", icon: "crosshair", color: "blue", image: "./img/dc17.jpg",
    desc: "Paire de pistolets blasters lourds favorisés par les officiers supérieurs et les soldats ARC. Cadence de tir élevée et puissance d'arrêt redoutable à courte portée.",
    manu: "Blastech Industries", stats: { power: 55, range: 30, rate: 95, stability: 65 }, video: "./img/dual dc.webm" },
  { id: "jetpack", name: "Jetpack JT-12", type: "Mobilité", icon: "wind", color: "cyan", image: "./img/jetpack.jpg",
    desc: "Dispositif dorsal essentiel pour les Wolfpacks, leur permettant de s'envoler et de se déplacer rapidement. Permet de franchir des obstacles et d'atteindre des positions en hauteur.",
    manu: "Merr-Sonn Munitions", stats: { power: 80, range: 60, rate: 40, stability: 15 }, video: "./img/jetpack.webm" },
  { id: "grapple", name: "Grappin Ascensionnel", type: "Utilitaire", icon: "anchor", color: "gray", image: "./img/grappin.jpg",
    desc: "Outil essentiel lorsque le jetpack est inutilisable. Il permet de prendre de la hauteur facilement et de couvrir de longues distances pour atteindre rapidement des positions stratégiques.",
    manu: "Standard Issue", stats: { power: 0, range: 80, rate: 50, stability: 95 }, video: "./img/grappin.webm" },
  { id: "detpack", name: "Detpack Explosif", type: "Sabotage", icon: "bomb", color: "orange", image: "./img/detpack.png",
    desc: "Petits explosifs équipés d'un déclencheur à distance activable à volonté. Peuvent être placés ou lancés. Particulièrement utiles pour détruire des obstacles.",
    manu: "Merr-Sonn Munitions", stats: { power: 100, range: 20, rate: 10, stability: 40 }, video: "./img/detpack.webm" },
  { id: "smoke", name: "Grenade Fumigène", type: "Tactique", icon: "cloud", color: "gray", image: "./img/fumi.jpg",
    desc: "Générateur de fumée dense obscurcissant instantanément le champ de vision. Essentiel pour couvrir les mouvements de la meute ou effectuer des retraites stratégiques.",
    manu: "Explosive Dynamics", stats: { power: 0, range: 50, rate: 60, stability: 100 }, video: "./img/fumi.webm" },
  { id: "impact", name: "Grenade à Impact", type: "Grenade", icon: "zap", color: "blue", image: "./img/gre.jpg",
    desc: "Ordonnance explosive détonant immédiatement au contact d'une surface dure. Conçue pour neutraliser les droïdes de combat sans laisser de temps de réaction à l'ennemi.",
    manu: "Explosive Dynamics", stats: { power: 85, range: 35, rate: 90, stability: 20 }, video: "./img/grenade.webm" }
];

WPK.vehicles = [
  { id: "at-rt", name: "AT-RT", type: "Reconnaissance Transport", image: "./img/at-rt.jpg",
    desc: "Transport de reconnaissance tout-terrain. Pilotable par l'ensemble de la Wolfpack pour le soutien de reconnaissance",
    manu: "Rothana Heavy Engineering", pilots: [{ name: "Wolfpack", img: "./img/wolffe.webm" }],
    stats: { speed: 80, firepower: 50, armor: 20, maneuverability: 80 } },
  { id: "arc170", name: "Chasseur ARC-170", type: "Chasseur Lourd", image: "./img/arc170.jpg",
    desc: "Chasseur lourd de reconnaissance agressif. Modifié personnellement par l'Adjudant Warthog pour une maniabilité accrue. Pilotable exclusivement par Warthog.",
    manu: "Incom Corporation", pilots: [{ name: "Warthog", img: "./img/warthog.webm" }],
    stats: { speed: 85, firepower: 80, armor: 55, maneuverability: 80 } },
  { id: "laat_i", name: "LAAT/i Gunship", type: "Transport d'Assaut", image: "./img/laati.jpg",
    desc: "Transport d'infanterie offensif. Pilotable par les experts Warthog et Tracer pour les insertions à haut risque.",
    manu: "Rothana Heavy Engineering", pilots: [{ name: "Warthog", img: "./img/warthog.webm" }, { name: "Tracer", img: "./img/tracer.webm" }],
    stats: { speed: 60, firepower: 75, armor: 90, maneuverability: 50 } },
  { id: "laat_c", name: "LAAT/c Carrier", type: "Transport de Fret", image: "./img/laatc.jpg",
    desc: "Variante cargo pour le déploiement de l'AT-TE. Pilotable par Warthog et Tracer pour le largage de matériel lourd.",
    manu: "Rothana Heavy Engineering", pilots: [{ name: "Warthog", img: "./img/warthog.webm" }, { name: "Tracer", img: "./img/tracer.webm" }],
    stats: { speed: 50, firepower: 40, armor: 90, maneuverability: 45 } }
];

WPK.medals = [
  { id: "chasseur", name: "Médaille du Chasseur des Cimes", image: "./img/loupecarlate.png", color: "border-red-600",
    desc: "Attribuée aux opérateurs maîtrisant les déplacements tactiques avancés (Jetpack, Grappin, ATRT). Elle récompense l’agilité, la mobilité et la capacité à exploiter efficacement le terrain. Décernée aux spécialistes apportant un avantage stratégique grâce à leur maîtrise des hauteurs." },
  { id: "traque", name: "Marque de la Traque Opérationnelle", image: "./img/traque operationnelle.png", color: "border-blue-800",
    desc: "Cette médaille récompense les unités ayant mené leurs missions avec une efficacité et une précision exemplaires. Elle distingue les opérateurs capables d’atteindre leurs objectifs sans erreur majeure et avec une excellente coordination. Attribuée pour des performances remarquables en opération." },
  { id: "sentinelle", name: "Insigne des Sentinelles de la Meute", image: "./img/loupardent.png", color: "border-red-600",
    desc: "Décerné aux unités chargées de la protection du commandement, cet insigne symbolise la vigilance et la discipline. Il récompense les opérateurs capables de sécuriser efficacement les positions critiques en toutes circonstances. Attribué pour une implication directe et fiable dans la défense du CMDM." },
  { id: "predator", name: "Griffe du Prédateur", image: "./img/predateur.png", color: "border-yellow-400",
    desc: "Distinction suprême de la Wolfpack, elle récompense les vétérans ayant atteint un niveau d’excellence exceptionnel. Elle distingue les opérateurs ayant marqué durablement la compagnie par leur engagement, leur leadership et leurs performances. Attribuée uniquement aux membres ayant atteint le niveau le plus haut de la meute." }
];
