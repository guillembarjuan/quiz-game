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
    showScreen("screen-types");
  });

  input.addEventListener("input", function () {
    error.textContent = "";
    input.removeAttribute("aria-invalid");
  });
});
