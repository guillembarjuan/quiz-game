/*
 * access.js
 * Propietari: Joan (joanosunaa)
 * Pantalles d'accés: nom del jugador i tipus de preguntes.
 */

// Esperem main.js i el DOM abans de llegir l'estat compartit.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("welcome-form");
  const input = document.getElementById("player-name");
  const error = document.getElementById("name-error");
  const greeting = document.getElementById("types-greeting");
  const categories = document.getElementById("category-list");

  function renderCategories() {
    categories.replaceChildren();
    // Cap categoria està escrita a mà: el banc de Miquel és la font única.
    Object.keys(QUESTIONS).forEach(function (key) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn";
      button.textContent = QUESTIONS[key].label;
      button.addEventListener("click", function () {
        startGame(state.playerName, key);
      });
      categories.appendChild(button);
    });
    if (!categories.childElementCount) {
      const message = document.createElement("p");
      message.className = "access-empty";
      message.textContent = "Encara no hi ha categories disponibles. Torna-ho a provar més tard.";
      categories.appendChild(message);
    }
  }

  // El submit cobreix tant el botó com la tecla Enter.
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = input.value.trim();
    const message = !name ? "Escriu el teu nom." :
      Array.from(name).length > 20 ? "El nom ha de tenir com a màxim 20 caràcters." : "";
    error.textContent = message;
    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (message) {
      input.focus();
      return;
    }
    input.value = name;
    state.playerName = name;
    greeting.textContent = "Hola, " + name + "!";
    renderCategories();
    showScreen("screen-types");
    greeting.focus();
  });

  input.addEventListener("input", function () {
    error.textContent = "";
    input.removeAttribute("aria-invalid");
  });
});
