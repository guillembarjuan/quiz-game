/**
 * js/results.js
 * Propietari: Miquel Vico
 * Gestió de la pantalla de resultats i navegació posterior.
 */

/**
 * Mostra els resultats finals del joc.
 * @param {Object} result - Objecte de resultat.
 * @param {string} result.name - Nom de l'usuari.
 * @param {string} result.category - Clau de la categoria jugada.
 * @param {number} result.score - Nombre d'encerts.
 * @param {number} result.total - Nombre total de preguntes.
 * @param {Array} result.answers - Llista de respostes: [{ text, chosen, correct, isCorrect }]
 */
function showResults(result) {
  const summaryEl = document.getElementById("results-summary");
  const listEl = document.getElementById("results-list");

  if (!summaryEl || !listEl) return;

  // 1. Mostrar resum
  summaryEl.textContent = `${result.name}, has encertat ${result.score} de ${result.total}`;

  // 2. Netejar llista prèvia
  listEl.innerHTML = "";

  // 3. Generar el detall de cada pregunta
  result.answers.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("results__item");

    if (item.isCorrect) {
      itemDiv.classList.add("results__item--correct");
    } else {
      itemDiv.classList.add("results__item--incorrect");
    }

    const badgeStatus = item.isCorrect
      ? `<span class="results__badge results__badge--ok">Correcta</span>`
      : `<span class="results__badge results__badge--fail">Incorrecta</span>`;

    const chosenText = item.chosen !== null ? item.chosen : "Temps esgotat";

    let solutionHtml = "";
    if (!item.isCorrect) {
      solutionHtml = `<div class="results__correct-solution">Resposta correcta: <strong>${item.correct}</strong></div>`;
    }

    itemDiv.innerHTML = `
      <div class="results__question-text">${index + 1}. ${item.text}</div>
      <div class="results__answer-info">
        ${badgeStatus} La teva resposta: <strong>${chosenText}</strong>
      </div>
      ${solutionHtml}
    `;

    listEl.appendChild(itemDiv);
  });

  // 4. Mostrar la pantalla de resultats
  showScreen("screen-results");
}

// Inicialització dels esdeveniments dels botons
document.addEventListener("DOMContentLoaded", () => {
  const btnRestart = document.getElementById("btn-restart");
  const btnExit = document.getElementById("btn-exit");

  if (btnRestart) {
    btnRestart.addEventListener("click", () => {
      showScreen("screen-types");
    });
  }

  if (btnExit) {
    btnExit.addEventListener("click", () => {
      if (typeof state !== "undefined") {
        state.playerName = "";
      }
      showScreen("screen-welcome");
    });
  }
});