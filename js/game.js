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

/** Fisher-Yates sobre una còpia: conserva intactes les preguntes i les opcions. */
function shuffleQuestions(questions) {
  const shuffled = questions.slice();
  for (let index = shuffled.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    const question = shuffled[index];
    shuffled[index] = shuffled[other];
    shuffled[other] = question;
  }
  return shuffled;
}

/** Inicia una partida nova amb la categoria que arriba d'access.js. */
function startGame(name, categoryKey) {
  gameState.active = false;
  gameState.turn++;
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
          Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 4;
      })) {
    error.textContent = "Aquesta categoria no existeix o encara no té preguntes vàlides.";
    document.getElementById("game-back").focus();
    return;
  }

  Object.assign(gameState, {
    name: name, category: categoryKey, questions: shuffleQuestions(category.questions),
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
  question.options.forEach(function (option, chosenIndex) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn game-option";
    button.textContent = option;
    button.addEventListener("click", function () {
      // Un clic pendent d'una pregunta anterior no pot respondre la nova.
      if (turn === gameState.turn) { answerQuestion(chosenIndex); }
    });
    options.appendChild(button);
  });
  title.focus();
}

/** Funció pura: es pot provar també des de la consola del navegador. */
function checkAnswer(question, chosenIndex) {
  return Number.isInteger(chosenIndex) && chosenIndex >= 0 && chosenIndex < 4 &&
    chosenIndex === question.correct;
}

function answerQuestion(chosenIndex) {
  if (!gameState.active || gameState.answered) { return; }
  if (chosenIndex !== null && (!Number.isInteger(chosenIndex) || chosenIndex < 0 || chosenIndex > 3)) {
    return;
  }
  gameState.answered = true;
  const question = gameState.questions[gameState.index];
  const isCorrect = checkAnswer(question, chosenIndex);
  if (isCorrect) { gameState.score++; }
  // chosen i correct són els textos de les opcions; category és la clau del banc.
  gameState.answers.push({
    text: question.text, chosen: chosenIndex === null ? null : question.options[chosenIndex],
    correct: question.options[question.correct], isCorrect: isCorrect
  });
  // Bloquegem totes les opcions abans de mostrar el feedback.
  const buttons = document.getElementById("game-options").querySelectorAll("button");
  buttons.forEach(function (button, index) {
    button.disabled = true;
    button.classList.add("disabled");
    if (index === question.correct) {
      button.classList.add("correct");
      button.textContent += " — Correcta";
    } else if (index === chosenIndex) {
      button.classList.add("wrong");
      button.textContent += " — La teva resposta";
    }
  });
  document.getElementById("game-score").textContent = "Punts: " + gameState.score;
  document.getElementById("game-feedback").textContent = chosenIndex === null ?
    "Temps esgotat. La resposta correcta és: " + question.options[question.correct] :
    isCorrect ? "Correcte! Has guanyat un punt." :
    "Incorrecte. La resposta correcta és: " + question.options[question.correct];
  const next = document.getElementById("game-next");
  next.textContent = gameState.index === gameState.questions.length - 1 ? "Veure resultats" : "Següent";
  next.hidden = false;
  next.focus();
}

function nextQuestion() {
  if (!gameState.active || !gameState.answered) { return; }
  gameState.index++;
  if (gameState.index < gameState.questions.length) {
    renderQuestion();
  } else {
    gameState.active = false;
    gameState.turn++;
    showResults({
      name: gameState.name, category: gameState.category, score: gameState.score,
      total: gameState.questions.length, answers: gameState.answers.slice()
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("game-next").addEventListener("click", nextQuestion);
  document.getElementById("game-back").addEventListener("click", function () {
    gameState.active = false;
    gameState.turn++;
    showScreen("screen-types");
    const greeting = document.getElementById("types-greeting");
    if (greeting) { greeting.focus(); }
  });
});
