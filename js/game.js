/*
 * game.js
 * Propietari: Pol (polserrano)
 * Joc principal i gestió de preguntes.
 */

// Estat propi del joc: no modifica el banc compartit de Miquel.
const gameState = {
  name: "", category: null, questions: [], index: 0,
  score: 0, answers: [], answered: false, active: false, turn: 0
};
let gameAdvanceTimeout = null;

// Preguntes per partida. Si la categoria en té menys, es fan servir totes.
const QUESTIONS_PER_GAME = 5;
// Textos de l'última partida de cada categoria (només en memòria).
const lastGameTexts = {};

function cancelGameAdvance() {
  clearTimeout(gameAdvanceTimeout);
  gameAdvanceTimeout = null;
}

/** Fisher-Yates sobre una còpia: no modifica l'array original. */
function shuffle(items) {
  const shuffled = items.slice();
  for (let index = shuffled.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    const item = shuffled[index];
    shuffled[index] = shuffled[other];
    shuffled[other] = item;
  }
  return shuffled;
}

/**
 * Tria a l'atzar les preguntes d'una partida.
 * Primer agafa les que no van sortir a la partida anterior de la categoria
 * i només repeteix si no n'hi ha prou de noves. Les preguntes amb el mateix
 * text compten com una de sola.
 */
function pickGameQuestions(categoryKey, questions) {
  const seen = new Set();
  const unique = shuffle(questions).filter(function (question) {
    if (seen.has(question.text)) { return false; }
    seen.add(question.text);
    return true;
  });
  const previous = lastGameTexts[categoryKey] || [];
  const fresh = unique.filter(function (question) { return previous.indexOf(question.text) === -1; });
  const repeated = unique.filter(function (question) { return previous.indexOf(question.text) !== -1; });
  // Les repetides van al final, però el resultat es torna a barrejar.
  const picked = shuffle(fresh.concat(repeated).slice(0, QUESTIONS_PER_GAME));
  lastGameTexts[categoryKey] = picked.map(function (question) { return question.text; });
  return picked.map(prepareQuestion);
}

/**
 * Còpia de la pregunta amb les opcions barrejades.
 * Guarda el text de la correcta a `answer`: és el que es compara en respondre,
 * així la posició de l'opció no importa.
 */
function prepareQuestion(question) {
  return {
    text: question.text,
    options: shuffle(question.options),
    answer: question.options[question.correct]
  };
}

/** Inicia una partida nova amb la categoria que arriba d'access.js. */
function startGame(name, categoryKey) {
  cancelGameAdvance();
  gameState.active = false;
  gameState.turn++;
  if (typeof stopTimer === "function") { stopTimer(); }
  const category = typeof QUESTIONS !== "undefined" &&
    Object.prototype.hasOwnProperty.call(QUESTIONS, categoryKey) ? QUESTIONS[categoryKey] : null;
  const error = document.getElementById("game-error");
  const content = document.getElementById("game-content");
  error.textContent = "";
  content.hidden = true;
  showScreen("screen-game");

  // Validem les dades abans de començar per evitar una pantalla buida.
  if (!category || !Array.isArray(category.questions) || !category.questions.length ||
      !category.questions.every(function (question) {
        return question && typeof question.text === "string" &&
          Array.isArray(question.options) && question.options.length === 4 &&
          question.options.every(function (option) { return typeof option === "string"; }) &&
          // Es valida pel text: dues opcions iguals farien ambigua la resposta.
          new Set(question.options).size === 4 &&
          Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 4;
      })) {
    error.textContent = "Aquesta categoria no existeix o encara no té preguntes vàlides.";
    document.getElementById("game-back").focus();
    return;
  }

  Object.assign(gameState, {
    name: name, category: categoryKey, questions: pickGameQuestions(categoryKey, category.questions),
    index: 0, score: 0, answers: [], answered: false, active: true
  });
  document.getElementById("game-category").textContent = category.label;
  content.hidden = false;
  renderQuestion();
}

/** Dibuixa només la pregunta actual i crea els quatre botons de resposta. */
function renderQuestion() {
  if (!gameState.active) { return; }
  gameState.answered = false;
  const turn = ++gameState.turn;
  const question = gameState.questions[gameState.index];
  document.getElementById("game-feedback").textContent = "";
  document.getElementById("game-next").hidden = true;
  document.getElementById("game-progress").textContent =
    "Pregunta " + (gameState.index + 1) + " de " + gameState.questions.length;
  document.getElementById("game-score").textContent = "Punts: " + gameState.score;
  const title = document.getElementById("game-question");
  title.textContent = question.text;
  const options = document.getElementById("game-options");
  options.replaceChildren();
  question.options.forEach(function (option) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn game-option";
    button.textContent = option;
    button.addEventListener("click", function () {
      // Un clic pendent d'una pregunta anterior no pot respondre la nova.
      if (turn === gameState.turn) { answerQuestion(option); }
    });
    options.appendChild(button);
  });
  title.focus();
  const time = document.getElementById("game-time");
  const timer = document.getElementById("timer");
  time.hidden = false;
  if (timer) { timer.hidden = true; }
  time.textContent = "Temporitzador encara no disponible.";
  // La integració és opcional fins que Guillem porti timer.js a test.
  if (typeof startTimer === "function") {
    const seconds = typeof TIME_PER_QUESTION === "number" ? TIME_PER_QUESTION : 15;
    startTimer(seconds, function (remaining) {
      if (gameState.active && turn === gameState.turn) {
        time.textContent = "Temps restant: " + remaining + " s";
        // Guillem ja dibuixa el compte enrere: evitem dos comptadors visibles.
        const hasVisualTimer = timer && timer.querySelector(".timer__number");
        time.hidden = Boolean(hasVisualTimer);
        if (timer) {
          timer.hidden = !hasVisualTimer;
          timer.setAttribute("aria-label", time.textContent);
        }
      }
    }, function () {
      if (gameState.active && turn === gameState.turn) { answerQuestion(null); }
    });
  } else {
    time.textContent = "Temporitzador encara no disponible.";
  }
}

/** Funció pura: compara el text triat amb el de la correcta. Es pot provar des de la consola. */
function checkAnswer(question, chosenText) {
  return typeof chosenText === "string" && chosenText === question.answer;
}

/** chosenText és el text de l'opció triada, o null si s'ha acabat el temps. */
function answerQuestion(chosenText) {
  if (!gameState.active || gameState.answered) { return; }
  const question = gameState.questions[gameState.index];
  if (chosenText !== null && question.options.indexOf(chosenText) === -1) { return; }
  gameState.answered = true;
  if (typeof stopTimer === "function") { stopTimer(); }
  const isCorrect = checkAnswer(question, chosenText);
  if (isCorrect) { gameState.score++; }
  // chosen i correct són els textos de les opcions; category és la clau del banc.
  gameState.answers.push({
    text: question.text, chosen: chosenText, correct: question.answer, isCorrect: isCorrect
  });
  // Bloquegem totes les opcions abans de mostrar el feedback.
  const buttons = document.getElementById("game-options").querySelectorAll("button");
  buttons.forEach(function (button, index) {
    const option = question.options[index];
    button.disabled = true;
    button.classList.add("disabled");
    if (option === question.answer) {
      button.classList.add("correct");
      button.textContent += " — Correcta";
    } else if (option === chosenText) {
      button.classList.add("wrong");
      button.textContent += " — La teva resposta";
    }
  });
  document.getElementById("game-score").textContent = "Punts: " + gameState.score;
  document.getElementById("game-feedback").textContent = chosenText === null ?
    "Temps esgotat. La resposta correcta és: " + question.answer :
    isCorrect ? "Correcte! Has guanyat un punt." :
    "Incorrecte. La resposta correcta és: " + question.answer;
  const next = document.getElementById("game-next");
  next.textContent = gameState.index === gameState.questions.length - 1 ? "Veure resultats" : "Següent";
  next.hidden = false;
  next.focus();
  // Donem temps a llegir la correcta abans d'avançar en esgotar el temps.
  if (chosenText === null) {
    const turn = gameState.turn;
    gameAdvanceTimeout = setTimeout(function () {
      if (gameState.active && turn === gameState.turn) { nextQuestion(); }
    }, 1800);
  }
}

function nextQuestion() {
  if (!gameState.active || !gameState.answered) { return; }
  cancelGameAdvance();
  gameState.index++;
  if (gameState.index < gameState.questions.length) {
    renderQuestion();
  } else {
    gameState.active = false;
    gameState.turn++;
    if (typeof stopTimer === "function") { stopTimer(); }
    showResults({
      name: gameState.name, category: gameState.category, score: gameState.score,
      total: gameState.questions.length, answers: gameState.answers.slice()
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("game-next").addEventListener("click", nextQuestion);
  document.getElementById("game-back").addEventListener("click", function () {
    cancelGameAdvance();
    gameState.active = false;
    gameState.turn++;
    if (typeof stopTimer === "function") { stopTimer(); }
    showScreen("screen-types");
    const greeting = document.getElementById("types-greeting");
    if (greeting) { greeting.focus(); }
  });
});
