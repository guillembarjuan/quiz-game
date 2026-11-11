/*
 * timer.js
 * Propietari: Guillem (guillembarjuan)
 * Temporitzador de cada pregunta.
 */

// Identificador de l'interval actiu (null si no n'hi ha cap)
let timerIntervalId = null;

// Dibuixa el número i la barra dins #timer
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

// Inicia el compte enrere
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

// Atura el compte enrere actual
function stopTimer() {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
}
