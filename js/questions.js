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
      }
    ]
  }
};