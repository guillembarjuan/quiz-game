/*
 * timer.js
 * Propietari: Guillem (guillembarjuan)
 * Temporitzador de cada pregunta.
 *
 * Ús esperat des de game.js (fent servir TIME_PER_QUESTION de main.js):
 *
 *   startTimer(TIME_PER_QUESTION, function (segons) {
 *     // s'executa a l'inici i cada segon
 *   }, function () {
 *     // s'ha acabat el temps: comptar la pregunta com a fallada
 *     // i passar a la següent
 *   });
 *
 *   // Quan el jugador respon, abans de passar de pregunta:
 *   stopTimer();
 *
 * Requisits a l'HTML: un element <div id="timer"></div> dins
 * screen-game. Si no hi és, el temporitzador compta igual però
 * no dibuixa res.
 */

// Identificador de l'interval actiu (null si no n'hi ha cap)
let timerIntervalId = null;

/**
 * Dibuixa el número i la barra dins #timer. Funció interna.
 *
 * @param {number} remaining - Segons que queden.
 * @param {number} total - Segons inicials, per calcular el % de la barra.
 * @param {boolean} instant - Si és true, la barra canvia sense animació.
 */
function renderTimer(remaining, total, instant) {
  const container = document.getElementById("timer");
  if (!container) {
    return;
  }

  container.setAttribute("role", "timer");

  let number = container.querySelector(".timer__number");
  let fill = container.querySelector(".timer__fill");

  // Creem els elements la primera vegada
  if (!number || !fill) {
    container.innerHTML = "";

    number = document.createElement("span");
    number.className = "timer__number";

    const bar = document.createElement("div");
    bar.className = "timer__bar";

    fill = document.createElement("div");
    fill.className = "timer__fill";

    bar.appendChild(fill);
    container.appendChild(number);
    container.appendChild(bar);
  }

  number.textContent = remaining;

  // Últims 5 segons: classe d'avís
  container.classList.toggle("timer--danger", remaining <= 5);

  const percent = total > 0 ? (remaining / total) * 100 : 0;

  if (instant) {
    // En reiniciar, la barra s'omple de cop, sense animació
    fill.style.transition = "none";
    fill.style.width = percent + "%";
    void fill.offsetWidth;
    fill.style.transition = "";
  } else {
    fill.style.width = percent + "%";
  }
}

/**
 * Inicia un compte enrere. Si ja n'hi havia un en marxa, l'atura abans.
 *
 * @param {number} seconds - Segons del compte enrere.
 * @param {function(number)} onTick - Es crida de seguida amb `seconds`
 *   i després cada segon amb els segons que queden (fins a 0).
 * @param {function()} onTimeout - Es crida una sola vegada en arribar a 0,
 *   amb el temporitzador ja aturat (s'hi pot cridar startTimer de nou).
 */
function startTimer(seconds, onTick, onTimeout) {
  stopTimer();

  const total = seconds;
  let remaining = seconds;

  renderTimer(remaining, total, true);
  if (typeof onTick === "function") {
    onTick(remaining);
  }

  if (remaining <= 0) {
    if (typeof onTimeout === "function") {
      onTimeout();
    }
    return;
  }

  const intervalId = setInterval(function () {
    remaining--;
    renderTimer(remaining, total, false);

    if (typeof onTick === "function") {
      onTick(remaining);
    }

    // Si onTick ha aturat o reiniciat el temporitzador, no seguim
    if (timerIntervalId !== intervalId) {
      return;
    }

    if (remaining <= 0) {
      stopTimer();
      if (typeof onTimeout === "function") {
        onTimeout();
      }
    }
  }, 1000);

  timerIntervalId = intervalId;
}

/**
 * Atura el compte enrere actual sense cridar cap callback.
 * El número i la barra es queden com estaven.
 * Es pot cridar encara que no hi hagi cap temporitzador en marxa.
 */
function stopTimer() {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
}
