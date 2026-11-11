/*
 * main.js
 * Propietari: Guillem (guillembarjuan)
 * Estat global i navegació entre pantalles.
 */

// Estat compartit de la partida
const state = {
  playerName: "",
  category: null
};

// Segons disponibles per respondre cada pregunta
const TIME_PER_QUESTION = 15;

// Mostra la pantalla amb l'id indicat i amaga la resta
function showScreen(id) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(function (screen) {
    if (screen.id === id) {
      screen.classList.add("active");
    } else {
      screen.classList.remove("active");
    }
  });
}

// Quan la pàgina s'ha carregat, comencem per la pantalla de benvinguda
document.addEventListener("DOMContentLoaded", function () {
  showScreen("screen-welcome");
});
