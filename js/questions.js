/**
 * js/questions.js
 * Propietari: Miquel Vico
 * Banc de preguntes categoritzat per al joc Quiz Trivial.
 */

const QUESTIONS = {
  esport: {
    label: "Esport",
    questions: [
      {
        text: "Quants jugadors té un equip de futbol al camp?",
        options: ["9", "10", "11", "12"],
        correct: 2
      },
      {
        text: "Cinquanta metres és la distància d'una piscina de quin tipus?",
        options: ["Olímpica", "Semiaquàtica", "Curta", "Recreativa"],
        correct: 0
      },
      {
        text: "Quin esport utilitza un 'puck' o disc en lloc d'una pilota?",
        options: ["Hoquei sobre gel", "Curling", "Bàsquet", "Waterpolo"],
        correct: 0
      },
      {
        text: "Quant dura un partit de basquetbol de la NBA (temps regulat)?",
        options: ["40 minuts", "48 minuts", "60 minuts", "90 minuts"],
        correct: 1
      },
      {
        text: "En quin esport destaca o ha destacat Rafa Nadal?",
        options: ["Golf", "Fórmula 1", "Tennis", "Natació"],
        correct: 2
      },
      {
      text: "Cada quants anys se celebren els Jocs Olímpics d'estiu?",
      options: ["Cada 2 anys", "Cada 3 anys", "Cada 4 anys", "Cada 5 anys"],
      correct: 2
      },
      {
      text: "Quin país va guanyar el Mundial de futbol de 2010?",
      options: ["Alemanya", "Espanya", "Països Baixos", "Brasil"],
      correct: 1
      },
      {
      text: "Quants punts val una cistella de tres a bàsquet?",
      options: ["1", "2", "4", "3"],
      correct: 3
      },
      {
      text: "En quin esport es fa servir una raqueta i un volant?",
      options: ["Bàdminton", "Tennis", "Pàdel", "Esquaix"],
      correct: 0
      },
      {
      text: "Quina és la distància oficial d'una marató?",
      options: ["21,097 km", "42,195 km", "30 km", "50 km"],
      correct: 1
      }
    ]
  },
  menjar: {
    label: "Menjar",
    questions: [
      {
        text: "Quin és l'ingredient principal del guacamole?",
        options: ["Tomàquet", "Ceba", "Alvocat", "Pebrot"],
        correct: 2
      },
      {
        text: "De quin país és originària la pizza margherita?",
        options: ["França", "Itàlia", "Espanya", "Grècia"],
        correct: 1
      },
      {
        text: "Quin formatge s'utilitza habitualment en un tiramisú tradicional?",
        options: ["Mascarpone", "Parmessà", "Mozzarella", "Cheddar"],
        correct: 0
      },
      {
        text: "Quin tipus de carn s'utilitza tradicionalment a la paella valenciana?",
        options: ["Vedella i porc", "Gall dindi i ànec", "Sardina i tonyina", "Conill i pollastre"],
        correct: 3
      },
      {
        text: "Quin és el cereal més consumit al món com a aliment bàsic a Àsia?",
        options: ["Blat", "Arròs", "Panís (maíz)", "Cègol"],
        correct: 1
      },
      {
      text: "Quin és l'ingredient principal de l'hummus?",
      options: ["Llenties", "Mongetes", "Pèsols", "Cigrons"],
      correct: 3
      },
      {
      text: "Quin ingredient principal té el pa tradicional?",
      options: ["Sucre", "Farina", "Sal", "Mantega"],
      correct: 1
      },
      {
      text: "Amb quina fruita es fa el vi?",
      options: ["Poma", "Taronja", "Raïm", "Préssec"],
      correct: 2
      },
      {
      text: "Quin formatge és típic de l'amanida grega?",
      options: ["Feta", "Brie", "Gorgonzola", "Emmental"],
      correct: 0
      },
      {
      text: "Quin dels següents aliments és un llegum?",
      options: ["Pastanaga", "Llenties", "Arròs", "Patata"],
      correct: 1
      }
    ]
  },
    geografia: {
  label: "Geografia",
  questions: [
  {
  text: "Quina és la capital de França?",
  options: ["Lió", "París", "Marsella", "Niça"],
  correct: 1
  },
  {
  text: "Quin és el continent més gran del món?",
  options: ["Àfrica", "Amèrica", "Àsia", "Europa"],
  correct: 2
  },
  {
  text: "Quina és la capital d'Itàlia?",
  options: ["Roma", "Milà", "Nàpols", "Florència"],
  correct: 0
  },
  {
  text: "Quin és el cim més alt de Catalunya?",
  options: ["Puigmal", "Pica d'Estats", "Aneto", "Montseny"],
  correct: 1
  },
  {
  text: "Quin és el país més gran del món per superfície?",
  options: ["Canadà", "Xina", "Rússia", "Estats Units"],
  correct: 2
  },
  {
  text: "Quin oceà banya la costa est dels Estats Units?",
  options: ["Pacífic", "Índic", "Àrtic", "Atlàntic"],
  correct: 3
  },
  {
  text: "Quants països formen el Regne Unit?",
  options: ["2", "3", "4", "5"],
  correct: 2
  },
  {
  text: "Quina és la capital del Japó?",
  options: ["Tòquio", "Kyoto", "Osaka", "Hiroshima"],
  correct: 0
  },
  {
  text: "Quin riu passa per la ciutat de Londres?",
  options: ["Sena", "Tàmesi", "Danubi", "Rin"],
  correct: 1
  },
  {
  text: "Quin és el desert calent més gran del món?",
  options: ["Gobi", "Kalahari", "Atacama", "Sàhara"],
  correct: 3
  }
  ]
  },
  ciencia: {
  label: "Ciència",
  questions: [
  {
  text: "Quin és el símbol químic de l'aigua?",
  options: ["H2O", "CO2", "O2", "NaCl"],
  correct: 0
  },
  {
  text: "Quin planeta és el més proper al Sol?",
  options: ["Venus", "Mercuri", "Mart", "Terra"],
  correct: 1
  },
  {
  text: "Quants ossos té aproximadament el cos d'un adult?",
  options: ["106", "206", "306", "406"],
  correct: 1
  },
  {
  text: "Quin gas necessitem respirar per viure?",
  options: ["Nitrogen", "Diòxid de carboni", "Oxigen", "Hidrogen"],
  correct: 2
  },
  {
  text: "Qui va formular la teoria de la relativitat?",
  options: ["Newton", "Galileu", "Darwin", "Einstein"],
  correct: 3
  },
  {
  text: "Quin planeta es coneix com el planeta vermell?",
  options: ["Mart", "Júpiter", "Venus", "Saturn"],
  correct: 0
  },
  {
  text: "Quin òrgan bombeja la sang pel cos?",
  options: ["Pulmó", "Fetge", "Cor", "Ronyó"],
  correct: 2
  },
  {
  text: "A quina temperatura bull l'aigua a nivell del mar?",
  options: ["50 °C", "90 °C", "100 °C", "120 °C"],
  correct: 2
  },
  {
  text: "Quin element químic té el símbol Fe?",
  options: ["Fluor", "Ferro", "Fòsfor", "Franci"],
  correct: 1
  },
  {
  text: "Quants planetes té el sistema solar?",
  options: ["8", "9", "10", "7"],
  correct: 0
  }
  ]
  }
};