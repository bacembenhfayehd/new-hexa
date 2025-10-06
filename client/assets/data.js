import Fertiboost from "./images/category/Fertiboost.png"
import Fertigel from "./images/category/Fertigel.png";
import Actifert from "./images/category/Actifert.png";
import Fertibeads from "./images/category/Fertibeads.png";
import Fertisol from "./images/category/Fertisol.png";
import Fertiraw from "./images/category/Fertiraw.png";
import image1 from "./images/home/image1.jpg";
import image2 from "./images/home/image2.jpg";
import image3 from "./images/home/image3.jpg";
import image4 from "./images/home/image4.jpg";
import image5 from "./images/home/img6.jpg";
import image6 from "./images/home/img7.jpg";
import image7 from "./images/home/img8.jpg";
import image8 from "./images/home/img7.jpg";
import test from "./images/category/test.jpeg"

export const menulists = [
  { id: 1, path: "/",       link: "accueil" },
  { id: 2, path: "/all-products", link: "produit" },
  { id: 3, path: "/about",   link: "à propos" },
  { id: 4, path: "/auth",   link: "connexion" },
  { id: 5, path: "/formule",   link: "votre formule" },
  
];


export const categorylists = [
  {
    id: 1,
    image: Actifert,
    title: "Actifert",
  },
  {
    id: 2,
    image: Fertibeads,
    title: "Hexabeads",
  },
  {
    id: 3,
    image: Fertiboost,
    title: "Hexaboost",
  },
  {
    id: 4,
    image: Fertigel,
    title: "Hexagel",
  },
  {
    id: 5,
    image: Fertiraw,
    title: "Hexaraw",
  },
  {
    id: 6,
    image: Fertisol,
    title: "Hexasol",
  },
];

export const productlists = [
  {
    id: 1,
    image: image1,
    title: "HEXABOOST® ESTABLISHMENT (Fe, Zn, Mn) ",
    bprice: 853,
    price: 5000,
    category: "Fertiboost",
    benefices: "S applique en fertigation",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
    Shortdescription:
      `Engrais liquides destinés à l’application foliaire et à la correction des carences, assurant une 
nutrition équilibrée et rapidement assimilable. `,
    Fulldescription: `HEXABOOST® ESTABLISHMENT une formulation avancée combinant des oligo
éléments essentiels (Fer, Zinc, Manganèse) chélatés par EDTA, spécialement conçue pour 
optimiser les premières phases du développement des cultures, notamment l’établissement et 
l’enracinement. `,
    
  },
  {
    id: 2,
    image: image2,
    title: "Capturing Nature’s Beauty",
    bprice: 452,
    price: 1420,
    category: "Fertiboost",
    benefices: "S applique en fertigation",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
     Shortdescription:
      `Engrais liquides destinés à l’application foliaire et à la correction des carences, assurant une 
nutrition équilibrée et rapidement assimilable. `,
    Fulldescription: `HEXABOOST® ESTABLISHMENT une formulation avancée combinant des oligo
éléments essentiels (Fer, Zinc, Manganèse) chélatés par EDTA, spécialement conçue pour 
optimiser les premières phases du développement des cultures, notamment l’établissement et 
l’enracinement. `,
  },
  {
    id: 3,
    image: image3,
    title: "Ceramic Tea Sets with a Twist",
    bprice: 105,
    price: 100,
    category: "Fertiboost",
    benefices: "S applique en fertigation",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
     Shortdescription:
      `Engrais liquides destinés à l’application foliaire et à la correction des carences, assurant une 
nutrition équilibrée et rapidement assimilable. `,
    Fulldescription: `HEXABOOST® ESTABLISHMENT une formulation avancée combinant des oligo
éléments essentiels (Fer, Zinc, Manganèse) chélatés par EDTA, spécialement conçue pour 
optimiser les premières phases du développement des cultures, notamment l’établissement et 
l’enracinement. `
  },
  {
    id: 4,
    image: image4,
    title: "HEXAGEL® 22-22-22+2MgO+TE",
    bprice: 40000,
    price: 50000,
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    benefices: `- S’applique en fertigation ou en incorporation au sol, idéal pour toutes les cultures. 
               - Améliore la rétention d’eau et la structure du sol .
               - Favorise l’absorption des nutriments et stimule l’activité microbienne .
               - Accroît la résistance des cultures face aux stress abiotiques (sécheresse, salinité) .
               - Favorise le développement racinaire et la croissance végétale .
               - Modifie les propriétés de fixation du sol, avec des avantages tels que : neutralise aussi 
bien les sols acides qu'alcalins et régule la valeur du pH des sols.`,
    category: "Fertigel",
    Shortdescription:
      "Engrais en suspension hautement concentrés, offrant une nutrition efficace et limitant les pertesde nutriments.",
    Fulldescription: `HEXAGEL® 22-22-22+2MgO+TE est un engrais en suspension bien équilibré conçu pour
fournir des nutriments essentiels par application foliaire et au sol. Cette formulation de haute
qualité fournit de l’azote, du phosphore et du potassium dans des proportions égales, avec de
l’oxyde de magnésium et des oligo-éléments ajoutés pour soutenir la vitalité des cultures, une
croissance équilibrée et des rendements élevés.
HEXAGEL® 22-22-22 Extra : En plus de la composition spéciale du HEXAGEL® 22-22-
22+2MgO+TE, le HEXAGEL® 22-22-22 Extra contient un pourcentage idéal d'acide
fulvique et de matières organiques, ce qui améliore l'efficacité de l'absorption des éléments
nutritifs.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 5,
    image: test,
    title: "HEXAGEL® 22-22-22 Extra",
    bprice: 40000,
    price: 50000,
    benefices: `pas encore`,
    category: "Fertigel",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    Shortdescription:
      "Engrais en suspension hautement concentrés, offrant une nutrition efficace et limitant les pertesde nutriments.",
    Fulldescription: `
HEXAGEL® 22-22-22 Extra : En plus de la composition spéciale du HEXAGEL® 22-22-
22+2MgO+TE, le HEXAGEL® 22-22-22 Extra contient un pourcentage idéal d'acide
fulvique et de matières organiques, ce qui améliore l'efficacité de l'absorption des éléments
nutritifs.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 6,
    image: image4,
    title: "HEXAGEL® 12-52-12+2MgO+TE",
    bprice: 40000,
    price: 50000,
    benefices: `pas encore`,
    category: "Fertigel",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    Shortdescription:
      "Engrais en suspension hautement concentrés, offrant une nutrition efficace et limitant les pertesde nutriments.",
    Fulldescription: `
HEXAGEL® 12-52-12+2MgO+TEest un engrais en gel NPK à haute teneur en phosphore
fabriqué pour satisfaire tous les besoins en phosphore de la plante, enrichi en magnésium et en
oligo-éléments chélatés`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 7,
    image: image4,
    title: "HEXAGEL® 12-52-12 EXTRA",
    bprice: 40000,
    price: 50000,
    benefices: `pas encore`,
    category: "Fertigel",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    Shortdescription:
      "Engrais en suspension hautement concentrés, offrant une nutrition efficace et limitant les pertesde nutriments.",
    Fulldescription: `
HEXAGEL® 12-52-12 EXTRA: En plus de la composition spéciale du HEXAGEL® 12-
52-12+2MgO+TE, le HEXAGEL® 12-52-12 Extra contient un pourcentage idéal d'acide
fulvique et de matières organiques, ce qui améliore l'efficacité de l'absorption des éléments
nutritifs`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },

  {
    id: 8,
    image: image4,
    title: "HEXAGEL® 10-10-60+TE",
    bprice: 40000,
    price: 50000,
    benefices: `pas encore`,
    category: "Fertigel",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    Shortdescription:
      "Engrais en suspension hautement concentrés, offrant une nutrition efficace et limitant les pertesde nutriments.",
    Fulldescription: `
HEXAGEL® 10-10-60+TE : est un engrais NPK en suspension, spécialement formulé
avec une forte teneur en potasse (60%) pour répondre aux besoins des cultures en
phase de floraison et de fructification. Il favorise le développement des fruits,
améliore leur calibre, leur couleur et leur qualité, tout en renforçant la résistance des
plantes face aux stress abiotiques. Grâce à l’équilibre entre azote, phosphore et
potassium (10-10-60), cet engrais stimule également la croissance racinaire et
l’absorption des nutriments, tout en optimisant le transport des sucres et la synthèse
des amidons. Sa formulation enrichie en oligo-éléments (TE) garantit une nutrition
complète et améliore la performance des cultures.
HEXAGEL® 10-10-60+TE se distingue par sa haute solubilité et sa stabilité en solution,
assurant une application homogène et efficace, notamment en fertigation ou en pulvérisation
foliaire. Il est adapté à tous types de cultures, y compris les arbres fruitiers, les légumes et les
grandes cultures.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 9,
    image: image4,
    title: "HEXAGEL® 10-10-60 EXTRA",
    bprice: 40000,
    price: 50000,
    benefices: `pas encore`,
    category: "Fertigel",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    Shortdescription:
      "Engrais en suspension hautement concentrés, offrant une nutrition efficace et limitant les pertesde nutriments.",
    Fulldescription: `HEXAGEL® 10-10-60 EXTRA: En plus de la composition spéciale du HEXAGEL® 10-
10-60+TE, le HEXAGEL® 10-10-60 Extra contient un pourcentage idéal d'acide fulvique
et de matières organiques, ce qui améliore l'efficacité de l'absorption des éléments nutritifs.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 10,
    image: image4,
    title: "HEXAGEL® 40-10-10+TE",
    bprice: 40000,
    price: 50000,
    benefices: `pas encore`,
    category: "Fertigel",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    Shortdescription:
      "Engrais en suspension hautement concentrés, offrant une nutrition efficace et limitant les pertesde nutriments.",
    Fulldescription: `HEXAGEL® 40-10-10+TE : est un engrais NPK en suspension, formulé avec une
concentration élevée en azote pour stimuler la croissance végétative et maximiser le développement des cultures. Il contient également du phosphore et du potassium dans des
proportions équilibrées, favorisant l'enracinement et le renforcement des plantes.
Grâce à sa formulation enrichie en oligo-éléments (TE), HEXAGEL® 40-10-10+TE assure
une nutrition complète et une assimilation optimale des nutriments. Sa haute solubilité et sa
stabilité en solution garantissent une application efficace, adaptée à toutes les cultures et à
différents stades de croissance.
Cet engrais améliore la photosynthèse, renforce la résistance aux stress abiotiques et optimise
la productivité agricole, en particulier pendant les phases de forte demande en azote.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 11,
    image: image4,
    title: "HEXAGEL® 40-10-10+TE EXTRA",
    bprice: 40000,
    price: 50000,
    benefices: `pas encore`,
    category: "Fertigel",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    Shortdescription:
      "Engrais en suspension hautement concentrés, offrant une nutrition efficace et limitant les pertesde nutriments.",
    Fulldescription: `En plus de la composition spéciale du HEXAGEL® 40-
10-10+TE, le HEXAGEL® 40-10-10 Extra contient un pourcentage idéal d'acide fulvique
et de matières organiques, ce qui améliore l'efficacité de l'absorption des éléments nutritifs.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 12,
    image: image7,
    title: "ACTIFERT® HUMUS ",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    bprice: 4000,
    price: 8000,
    benefices: `- S’applique en fertigation ou en incorporation au sol, idéal pour toutes les cultures. 
               - Améliore la rétention d’eau et la structure du sol .
               - Favorise l’absorption des nutriments et stimule l’activité microbienne .
               - Accroît la résistance des cultures face aux stress abiotiques (sécheresse, salinité) .
               - Favorise le développement racinaire et la croissance végétale .
               - Modifie les propriétés de fixation du sol, avec des avantages tels que : neutralise aussi 
bien les sols acides qu'alcalins et régule la valeur du pH des sols.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
    category: "Actifert",
    Shortdescription:
      "Biostimulants et amendements du sol sous forme liquide, favorisant l’absorption des nutriments et la croissance des plantes.",
    Fulldescription: `ACTIFERT®HUMUS, est une solution innovante pour l'amélioration de la fertilité des sols et 
la stimulation de la croissance des plantes. Combinant les bienfaits des acides humiques et 
fulviques avec des microéléments essentiels Et une formulation équilibrée en éléments majeurs, 
ce produit optimise la disponibilité des nutriments et renforce la structure du sol. `,
  },
  {
    id: 13,
    image: image7,
    title: "ACTIFERT® pH-REGULATOR",
    bprice: 4000,
    price: 8000,
    benefices: "S applique en fertigation",
    category: "Actifert",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    Shortdescription:
      "Biostimulants et amendements du sol sous forme liquide, favorisant l’absorption des nutriments et la croissance des plantes.",
    Fulldescription: `ACTIFERT® pH-REGULATOR est une solution efficace conçue pour réduire l’alcalinité 
des solutions nutritives et optimiser l’absorption des éléments essentiels par les plantes. Grâce 
à sa formulation spécifique, il ajuste le pH des solutions d’irrigation et de pulvérisation, améliorant 
ainsi la disponibilité des nutriments et l’efficacité des traitements phytosanitaires. `,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 14,
    image: image7,
    title: "ACTIFERT®FULVO PHOS",
    bprice: 4000,
    price: 8000,
    category: "Actifert",
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    benefices: "S applique en fertigation",
    Shortdescription:
      "Biostimulants et amendements du sol sous forme liquide, favorisant l’absorption des nutriments et la croissance des plantes.",
    Fulldescription: `ACTIFERT®FULVO PHOS, Il s’agit d’un biostimulant et amendement du sol 
riche en acide phosphorique, acide fulvique et matière organique qui assure l’homogénéité et 
la solubilité du produit. `,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 15,
    image: image7,
    title: "ACTIFERT®AMINO",
    bprice: 4000,
    price: 8000,
    apparence: "x",
    densite: "5",
    ph: "2",
    couleur: "1",
    category: "Actifert",
    benefices: "S applique en fertigation",
    Shortdescription:
      "Biostimulants et amendements du sol sous forme liquide, favorisant l’absorption des nutriments et la croissance des plantes.",
    Fulldescription: `ACTIFERT®AMINO, Il s’agit d’un Biostimulant organique composé 
principalement de proportions concentrées des acides aminés, des polysaccharides, des micros 
et macros éléments et d’acides carboxylique ce qui le rend utile à tous les stades agricoles. `,
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 16,
    image: image7,
    title: "ACTIFERT®NODOSUM",
    bprice: 4000,
    price: 8000,
    category: "Actifert",
    benefices: "S applique en fertigation",
    Shortdescription:
      "Biostimulants et amendements du sol sous forme liquide, favorisant l’absorption des nutriments et la croissance des plantes.",
    Fulldescription: `ACTIFERT®NODOSUM, Il s’agit d’un composé organique à base d’extraits 
d’algues marines (Ascophyllum nodosum) riches en macronutriments, acides aminés, 
microéléments et hormones végétales. `,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 17,
    image: image7,
    title: "ACTIFERT® COMBO",
    bprice: 4000,
    price: 8000,
    category: "Actifert",
    benefices: `S’applique en fertigation ou en incorporation au sol, idéal pour toutes les cultures. 
Améliore la rétention d’eau et la structure du sol 
Favorise l’absorption des nutriments et stimule l’activité microbienne 
Accroît la résistance des cultures face aux stress abiotiques (sécheresse, salinité) 
Favorise le développement racinaire et la croissance végétale 
Modifie les propriétés de fixation du sol, avec des avantages tels que : neutralise aussi 
bien les sols acides qu'alcalins et régule la valeur du pH des sols.`,
    Shortdescription:
      "Biostimulants et amendements du sol sous forme liquide, favorisant l’absorption des nutriments et la croissance des plantes.",
    Fulldescription: `ACTIFERT® COMBO est un biostimulant de haute performance conçu pour améliorer la 
croissance et la résilience des cultures. Il combine une synergie unique d’acide humique, 
d’acide fulvique, d’extrait d’algue, des polysaccharides, d’acides aminés libres et des éléments 
nutritifs essentiels (N, P, K, Ca, Mg, Fe, Mn, Zn, etc.). Grâce à cette formulation équilibrée, 
ACTIFERT® COMBO stimule l’activité biologique du sol, favorise l’absorption des 
nutriments et améliore la résistance des plantes aux stress abiotiques. `,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 18,
    image: image8,
    title: "Rare Exotics and Supercars",
    bprice: 40000,
    price: 80000,
    category: "Fertiboost",
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 19,
    image: image6,
    title: "Rare Exotics and Supercars",
    bprice: 400,
    price: 800,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 20,
    image: image5,
    title: "HEXASOL® 30-10-10+TE",
    bprice: 200,
    price: 800,
    category: "Fertisol",
    benefices: "S applique en fertigation",
    Shortdescription:
      "Engrais NPK composés, riches en oligo-éléments, entièrement solubles dans l’eau etcompatibles avec les systèmes d’irrigation modernes.",
    Fulldescription: `HEXASOL® 30-10-10+TEest un engrais hydrosoluble riche en azote, spécialement conçu
pour stimuler la croissance végétative des cultures. Il est enrichi en oligo-éléments afin
d’assurer une nutrition complète et équilibrée.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 21,
    image: image7,
    title: "Graphic Non-Fiction",
    bprice: 200,
    price: 800,
    category: "Fertiboost",
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 22,
    image: image3,
    title: "HEXARAW® MAP 12-61",
    bprice: 853,
    price: 5000,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    Shortdescription: "Engrais binaires hydrosolubles.",
    Fulldescription: `HEXARAW®MKP 0-52-34 (phosphate monopotassique) est un engrais hydrosoluble
hautement concentré en phosphore et en potassium, idéal pour le développement des racines et
l’optimisation de la floraison.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 23,
    image: image3,
    title: "HEXARAW®MKP 0-52-34",
    bprice: 853,
    price: 5000,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    Shortdescription: "Engrais binaires hydrosolubles.",
    Fulldescription: `HEXARAW®MAP 12-61 (phosphate monoammonique) est un engrais hydrosoluble
hautement concentré en phosphore et en azote, conçu pour optimiser la nutrition des plantes
dès les premiers stades de croissance.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 24,
    image: image1,
    title: "HEXARAW® UP 17-44",
    bprice: 853,
    price: 5000,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    Shortdescription: "Engrais binaires hydrosolubles.",
    Fulldescription: `HEXARAW®UP 17-44 (urée phosphate) est un engrais hydrosoluble hautement concentré
en azote et en phosphore, spécialement formulé pour optimiser la croissance des cultures dès
les premiers stades. Grâce à sa solubilité totale et à son pH acide, il améliore l’absorption des
nutriments et la disponibilité du phosphore dans le sol.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 25,
    image: image1,
    title: "HEXARAW® SOP 0-0-51",
    bprice: 853,
    price: 5000,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    Shortdescription: "Engrais binaires hydrosolubles.",
    Fulldescription: `HEXARAW® SOP 0-0-51 est un engrais hydrosoluble à base de sulfate de potassium (SOP),
riche en potassium (51%) et en SO3 (46%). Il est particulièrement adapté aux cultures
nécessitant un apport élevé en potassium sans apport de chlorure, tout en améliorant la qualité
et la résistance des plantes.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },

  {
    id: 26,
    image: image1,
    title: "HEXARAW® NOP 13-0-46",
    bprice: 853,
    price: 5000,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    Shortdescription: "Engrais binaires hydrosolubles.",
    Fulldescription: `HEXARAW® NOP 13-0-46 une source hautement soluble en eau de nitrate de potassium,
idéale pour la fertigation et l'application foliaire. Il fournit une combinaison équilibrée d'azote
sous forme nitrique (13 %) et de potassium (46 %), deux éléments essentiels à la croissance des
cultures.
Grâce à sa solubilité élevée et à son assimilation rapide par les plantes, HEXARAW® NOP
13-0-46 favorise le développement racinaire, améliore la résistance au stress et optimise la
qualité des récoltes. Il est particulièrement adapté aux cultures sensibles au chlore et contribue
à une nutrition efficace sans risque de salinité excessive.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 27,
    image: image1,
    title: "HEXARAW® SAM 21",
    bprice: 853,
    price: 5000,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    Shortdescription: "Engrais binaires hydrosolubles.",
    Fulldescription: `HEXARAW® SAM 21 est un engrais agricole de haute qualité conçu pour répondre aux
besoins nutritionnels des cultures et optimiser leur croissance et leur rendement. Sa formulation
équilibrée, riche en azote et en soufre, favorise la fertilité des sols et améliore la santé des
plantes.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },

  {
    id: 28,
    image: image1,
    title: "HEXARAW® CN",
    bprice: 853,
    price: 5000,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    Shortdescription: "Engrais binaires hydrosolubles.",
    Fulldescription: `HEXARAW® CN est une source hautement soluble et rapidement assimilable de calcium (Ca)
et d’azote nitrique (N-NO₃), essentielle pour la croissance optimale des plantes et la qualité des
récoltes. Il est particulièrement adapté aux cultures sensibles aux carences en calcium et
favorise le développement des tissus végétaux, améliorant ainsi la résistance aux maladies et au
stress environnemental..`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 29,
    image: image1,
    title: "HEXARAW® MAG",
    bprice: 853,
    price: 5000,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    Shortdescription: "Engrais magnésien",
    Fulldescription: `HEXARAW® MAG est une source hautement soluble et rapidement assimilable de
magnésium (Mg). Le magnésium (Mg) est un élément essentiel à la croissance des plantes,
intervenant directement dans la photosynthèse et la production d’énergie. Pour répondre aux
besoins spécifiques des cultures.
HEXARAW® MAG propose deux solutions adaptée :
HEXARAW® MAG-S (Sulfate de Magnésium)
- Riche en magnésium (Mg) et en soufre (S), il favorise la synthèse des protéines et
améliore la structure du sol.
- Facilement assimilable par les plantes, idéal pour la fertigation et l’application foliaire.
- Renforce la résistance au stress et favorise une croissance équilibrée.
- Compatible avec la plupart des engrais, sauf ceux contenant du calcium en solution
concentrée.
HEXARAW® MAG-N (Nitrate de Magnésium)
- Association de magnésium et d’azote nitrique (N-NO₃) pour une assimilation rapide.
- Fournit une double action en apportant un magnésium directement disponible et un
azote favorisant la croissance végétative.
- Essentiel pour des feuilles saines et une meilleure production de biomasse.
- Recommandé en fertigation et application foliaire, avec une solubilité optimale.
Ces deux solutions permettent d’adapter la fertilisation aux exigences des cultures,
garantissant une absorption efficace du magnésium pour un rendement optimal.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },

  {
    id: 30,
    image: image1,
    title: "HEXARAW® UREA",
    bprice: 853,
    price: 5000,
    category: "Fertiraw",
    benefices: "S applique en fertigation",
    Shortdescription: "Engrais unaires granulés",
    Fulldescription: `HEXARAW® UREA est un engrais azoté à haute concentration, contenant 46% d’azote total
sous forme uréique. Il s’agit de la source d’azote la plus utilisée en agriculture pour stimuler la
croissance des cultures et optimiser le rendement.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 31,
    image: image1,
    title: "HEXASOL® 20-20-20+TE",
    bprice: 853,
    price: 5000,
    category: "Fertisol",
    benefices: "S applique en fertigation",
    Shortdescription:
      "Engrais NPK composés, riches en oligo-éléments, entièrement solubles dans l’eau etcompatibles avec les systèmes d’irrigation modernes.",
    Fulldescription: `HEXASOL® 20-20-20+TEest un engrais NPK hydrosoluble équilibré, spécialement conçu
pour fournir aux cultures une nutrition complète et homogène tout au long de leur cycle de
croissance. Sa formule parfaitement soluble contient des proportions égales d’azote (N), de
phosphore (P) et de potassium (K), favorisant à la fois le développement végétatif,
l’enracinement et la fructification.
Grâce à l’ajout d’oligo-éléments (TE), HEXASOL® 20-20-20+TEaméliore l’absorption des
nutriments, renforce la résistance des plantes aux stress abiotiques et optimise la production
agricole. Sa formulation hydrosoluble garantit une dissolution rapide`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },

  {
    id: 32,
    image: "../../public/images/home/image1.jpg",
    title: "HEXASOL® 10-52-10+TE",
    bprice: 853,
    price: 5000,
    category: "Fertisol",
    benefices: "S applique en fertigation",
    Shortdescription:
      "Engrais NPK composés, riches en oligo-éléments, entièrement solubles dans l’eau etcompatibles avec les systèmes d’irrigation modernes.",
    Fulldescription: `HEXASOL® 10-52-10+TEest un engrais hydrosoluble riche en phosphore, spécialement
formulé pour favoriser le développement racinaire des cultures dès les premiers stades de
croissance.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 33,
    image: "../../public/images/home/image1.jpg",
    title: "HEXASOL® 10-10-40+TE",
    bprice: 853,
    price: 5000,
    category: "Fertisol",
    benefices: "S applique en fertigation",
    Shortdescription:
      "Engrais NPK composés, riches en oligo-éléments, entièrement solubles dans l’eau etcompatibles avec les systèmes d’irrigation modernes.",
    Fulldescription: `HEXASOL® 10-52-10+TEest un engrais hydrosoluble équilibré en azote et phosphore, avec
une teneur élevée en potassium, enrichi en oligo-éléments . Il est spécialement formulé pour
améliorer la floraison, la fructification et la qualité des récolte
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 34,
    image: "../../public/images/home/image1.jpg",
    title: "HEXASOL® 3-37-37+TE",
    category: "Fertisol",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    Shortdescription:
      "Engrais NPK composés, riches en oligo-éléments, entièrement solubles dans l’eau etcompatibles avec les systèmes d’irrigation modernes.",
    Fulldescription: `HEXASOL® 3-37-37+TEest un engrais hydrosoluble hautement concentré en phosphore et
en potassium, spécialement formulé pour favoriser la floraison, la nouaison et le développement
des fruits.`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 35,
    image: "../../public/images/home/image1.jpg",
    title: "HEXASOL® 12-12-36+TE",
    category: "Fertisol",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    Shortdescription:
      "Engrais NPK composés, riches en oligo-éléments, entièrement solubles dans l’eau etcompatibles avec les systèmes d’irrigation modernes.",
    Fulldescription: `HEXASOL® 12-12-36+TEest un engrais hydrosoluble riche en potassium, spécialement
formulé pour favoriser le développement des fruits, des légumes et des cultures nécessitant un
apport élevé en potassium. Il assure une nutrition équilibrée grâce à sa composition en
macronutriments essentiels et sa haute solubilité, permettant une absorption rapide par les
plantes.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 36,
    image: "../../public/images/home/image1.jpg",
    title: "HEXASOL® 6-6-43+TE",
    category: "Fertisol",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    Shortdescription:
      "Engrais NPK composés, riches en oligo-éléments, entièrement solubles dans l’eau etcompatibles avec les systèmes d’irrigation modernes.",
    Fulldescription: `HEXASOL® 6-6-43+TEest un engrais hydrosoluble riche en potassium, spécialement formulé
pour favoriser le développement des fruits, des légumes et des cultures nécessitant un apport
élevé en potassium. Il assure une nutrition équilibrée grâce à sa composition en
macronutriments essentiels et sa haute solubilité, permettant une absorption rapide par les
plantes.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 37,
    image: "../../public/images/home/image1.jpg",
    title: "HEXASOL® 12-8-24+TE",
    category: "Fertisol",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    Shortdescription:
      "Engrais NPK composés, riches en oligo-éléments, entièrement solubles dans l’eau etcompatibles avec les systèmes d’irrigation modernes.",
    Fulldescription: `HEXASOL® 12-8-24+TEest un engrais hydrosoluble spécialement formulé pour les cultures
nécessitant un apport équilibré en azote, phosphore et un fort taux de potassium. Il est enrichi
en oligo-éléments pour optimiser la croissance, la floraison et la production des cultures.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 38,
    image: "../../public/images/home/image2.jpg",
    title: "HEXASOL® 15-30-15+TE",
    category: "Fertisol",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    Shortdescription:
      "Engrais NPK composés, riches en oligo-éléments, entièrement solubles dans l’eau etcompatibles avec les systèmes d’irrigation modernes.",
    Fulldescription: `HEXASOL® 15-30-15+TEest un engrais hydrosoluble riche en phosphore, spécialement
formulé pour favoriser le développement racinaire des cultures dès les premiers stades de
croissance.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 39,
    image:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/antiques-demo-product-09-768x768.jpg",
    title: "HEXABOOST® ESTABLISHMENT (Fe, Zn, Mn) ",
    bprice: 853,
    price: 5000,
    category:'Fertiboost',
    benefices: "S applique en fertigation",
    Shortdescription:
    "Engrais liquides destinés à l’application foliaire et à la correction des carences, assurant une nutrition équilibrée et rapidement assimilable. ",
  Fulldescription: `HEXABOOST® ESTABLISHMENT une formulation avancée combinant des oligo
éléments essentiels (Fer, Zinc, Manganèse) chélatés par EDTA, spécialement conçue pour 
optimiser les premières phases du développement des cultures, notamment l’établissement et 
l’enracinement.
`,
composition: {
  elementsNutritifs: {
    N: { AMINO30: "3%", AMINO15: "1.5%" },
    P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
    K2O: { AMINO30: "3%", AMINO15: "1.5%" },
  },
  matiereOrganique: "60%",
  acideAmineLibre: "30%",
  microElements: ["Fe", "B", "Mn", "Zn"],
  polysaccharide: "3%",
},
recommandations: {
  toutesCultures: {
    AMINO30: {
      goutteAGoutte: "3-5 L / Ha",
      pulverisation: "1-2 L / Ha",
      nutritive: "10-20 mL /1000L D’eau",
    },
    AMINO15: {
      goutteAGoutte: "6-30 L / Ha",
      pulverisation: "2-4 L / Ha",
      nutritive: "20-40 mL /1000L D’eau",
    },
  },
},
  },
  {
    id: 40,
    image:
      "https://bidpro.webdevia.com/wp-content/uploads/2018/12/photo-1596568359553-a56de6970068-600x414.jpg",
    title: "Watch Hyundai Sonata",
    category:'Fertiboost',
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 41,
    image:
      "https://bidpro.webdevia.com/wp-content/uploads/2018/05/florian-klauer-mk7D-4UCfmg-unsplash-600x414.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 42,
    image:
      "https://bidpro.webdevia.com/wp-content/uploads/2018/05/igor-karimov-59MGmlUiqwA-unsplash-600x414.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 43,
    image:
      "https://bidpro.webdevia.com/real-estate-auction-marketplace/wp-content/uploads/sites/5/2022/03/home-9-1-450x338.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 44,
    image:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/antiques-demo-product-10-768x768.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 45,
    image:
      "https://jew-theme.myshopify.com/cdn/shop/files/Rectangle_144.png?v=1703498789&width=1500",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 46,
    image:
      "https://themesflat.co/html/open9/assets/images/box-item/card-item-05.jpg",
    title: "2018 Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 47,
    image:
      "https://themesflat.co/html/open9/assets/images/box-item/card-item-06.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 48,
    image:
      "https://themesflat.co/html/open9/assets/images/box-item/card-item-07.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 49,
    image:
      "https://themesflat.co/html/open9/assets/images/box-item/card-item-08.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 50,
    image:
      "https://themesflat.co/html/open9/assets/images/box-item/card-item-01.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 51,
    image:
      "https://themesflat.co/html/open9/assets/images/box-item/card-item-02.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 52,
    image:
      "https://themesflat.co/html/open9/assets/images/box-item/card-item-03.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 53,
    image:
      "https://themesflat.co/html/open9/assets/images/box-item/card-item-04.jpg",
    title: "Watch Hyundai Sonata",
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
  {
    id: 54,
    image:test,
    title: "Watch Hyundai Sonata",
    category:'Fertibeads',
    bprice: 853,
    price: 5000,
    benefices: "S applique en fertigation",
    composition: {
      elementsNutritifs: {
        N: { AMINO30: "3%", AMINO15: "1.5%" },
        P2O5: { AMINO30: "3%", AMINO15: "1.5%" },
        K2O: { AMINO30: "3%", AMINO15: "1.5%" },
      },
      matiereOrganique: "60%",
      acideAmineLibre: "30%",
      microElements: ["Fe", "B", "Mn", "Zn"],
      polysaccharide: "3%",
    },
    recommandations: {
      toutesCultures: {
        AMINO30: {
          goutteAGoutte: "3-5 L / Ha",
          pulverisation: "1-2 L / Ha",
          nutritive: "10-20 mL /1000L D’eau",
        },
        AMINO15: {
          goutteAGoutte: "6-30 L / Ha",
          pulverisation: "2-4 L / Ha",
          nutritive: "20-40 mL /1000L D’eau",
        },
      },
    },
  },
]

export const processList = [
  {
    id: "01",
    title: "Engagement qualité",
    desc: "Nous nous engageons à produire des produits de qualité, conformes aux normes internationales et répondant aux besoins du secteur agricole",
    cover:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/auction-2.png",
  },
  {
    id: "02",
    title: "Développement durable",
    desc: "Nous œuvrons pour un avenir durable en adoptant des pratiques respectueuses de l'environnement, des technologies écologiques et des produits à faible impact",
    cover:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/auction.png",
  },
  {
    id: "03",
    title: "Innovation",
    desc: "L'innovation est au cœur de notre stratégie. Nous investissons dans la recherche et le développement pour proposer des solutions performantes aux défis actuels de l'agriculture.",
    cover:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/shape-7.png",
  },
  {
    id: "04",
    title: "Collaboration et expertise",
    desc: " Nous valorisons les partenariats avec des experts locaux et internationaux, afin d’enrichir notre savoir-faire et d’assurer l’excellence de nos produits et services.",
    cover:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/auction-3.png",
  },
];

export const topSellerList = [
  {
    id: 1,
    title: "William",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-5-1.png",
    amount: "100",
  },
  {
    id: 2,
    title: "Orko",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-6.png",
    amount: "200",
  },
  {
    id: 3,
    title: "Nipa",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-3.png",
    amount: "300",
  },
  {
    id: 4,
    title: "Joseph",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-2-2.png",
    amount: "100",
  },
  {
    id: 5,
    title: "Isabella",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-10-2.png",
    amount: "100",
  },
  {
    id: 6,
    title: "Emily",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-15-1.png",
    amount: "100",
  },
  {
    id: 7,
    title: "Devmahbub",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-8-3.png",
    amount: "100",
  },
  {
    id: 8,
    title: "Ava Garcia",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-4-1.png",
    amount: "100",
  },
  {
    id: 9,
    title: "Amelia Harris",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-13.png",
    amount: "100",
  },
  {
    id: 10,
    title: "Alexander",
    profile:
      "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-8.png",
    amount: "100",
  },
];

export const trustList = [
  {
    id: 1,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor1.png",
  },
  {
    id: 2,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor3.png",
  },
  {
    id: 3,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor2.png",
  },
  {
    id: 4,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor4.png",
  },
  {
    id: 5,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor5.png",
  },
  {
    id: 6,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor6.png",
  },
  {
    id: 7,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor7.png",
  },
  {
    id: 8,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor8.png",
  },
  {
    id: 9,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor9.png",
  },
  {
    id: 10,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor1.png",
  },
  {
    id: 4,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor3.png",
  },
  {
    id: 5,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor8.png",
  },
  {
    id: 6,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor1.png",
  },
  {
    id: 7,
    profile: "https://bidout-react.vercel.app/images/bg/sponsor9.png",
  },
];

export const topList = [
  {
    id: 1,
    catgeory: "Luxury Vehicles",
    total: 7,
    img1: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-01-300x200.jpg",
    img2: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-07-150x150.jpg",
    img3: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-03-150x150.jpg",
    img4: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-08-150x150.jpg",
  },
  {
    id: 2,
    catgeory: "Classic",
    total: 10,
    img1: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-09-300x200.jpg",
    img2: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-01-150x150.jpg",
    img3: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-07-150x150.jpg",
    img4: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-03-150x150.jpg",
  },
  {
    id: 3,
    catgeory: "Muscle Machines",
    total: 8,
    img1: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-07-300x200.jpg",
    img2: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-03-150x150.jpg",
    img4: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-07-150x150.jpg",
    img3: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-01-150x150.jpg",
  },
  {
    id: 4,
    catgeory: "Automotive",
    total: 4,
    img3: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-05-300x200.jpg",
    img2: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-05-768x768.jpg",
    img4: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-07-150x150.jpg",
    img1: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/automotive_product-04-768x768.jpg",
  },
];
