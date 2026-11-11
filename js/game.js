/*
 * game.js
 * Propietari: Pol (polserrano)
 * Joc principal i gestió de preguntes.
 */

// Estat propi del joc: no modifica el banc compartit de Miquel.
const gameState = {
  name: "", category: null, questions: [], index: 0,
  score: 0, answers: [], answered: false, active: false
};

/** Inicia una partida nova amb la categoria que arriba d'access.js. */
function startGame(name, categoryKey) {
  gameState.active = false;
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
    name: name, category: categoryKey, questions: category.questions.slice(),
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
  const question = gameState.questions[gameState.index];
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
    button.addEventListener("click", function () { answerQuestion(chosenIndex); });
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
  gameState.answered = true;
  const question = gameState.questions[gameState.index];
  const isCorrect = checkAnswer(question, chosenIndex);
  if (isCorrect) { gameState.score++; }
  // chosen i correct són els textos de les opcions; category és la clau del banc.
  gameState.answers.push({
    text: question.text, chosen: chosenIndex === null ? null : question.options[chosenIndex],
    correct: question.options[question.correct], isCorrect: isCorrect
  });
  nextQuestion();
}

function nextQuestion() {
  if (!gameState.active || !gameState.answered) { return; }
  gameState.index++;
  if (gameState.index < gameState.questions.length) {
    renderQuestion();
  } else {
    gameState.active = false;
    showResults({
      name: gameState.name, category: gameState.category, score: gameState.score,
      total: gameState.questions.length, answers: gameState.answers.slice()
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("game-back").addEventListener("click", function () {
    gameState.active = false;
    showScreen("screen-types");
  });
});
