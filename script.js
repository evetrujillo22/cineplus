
const ads = document.getElementById("ads");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const status = document.getElementById("status");

let timer = null;
let running = false;
let index = 0;

const messages = [
  {
    title: "¡Felicidades! 🎁",
    text: "Has sido seleccionado para recibir una oferta especial.",
    button: "Reclamar ahora",
    type: "offer",
    position: { top: "34%", left: "35%" }
  },
  {
    title: "¿Permitir notificaciones?",
    text: "Recibe novedades y ofertas directamente en tu navegador.",
    button: "Aceptar",
    type: "notification",
    position: { top: "90px", left: "5%" }
  },
  {
    title: "¡Protege tu dispositivo!",
    text: "Descubre nuestra oferta especial de seguridad.",
    button: "Descargar",
    type: "green",
    position: { bottom: "17%", left: "16%" }
  },
  {
    title: "¡Hasta 70% de descuento!",
    text: "Descubre nuestra colección de calzado deportivo.",
    button: "Comprar ahora",
    type: "side",
    position: { top: "34%", right: "12px" }
  },
  {
    title: "Tu navegador necesita atención",
    text: "Comprueba siempre las actualizaciones en la configuración oficial.",
    button: "Ver aviso",
    type: "warning",
    position: { bottom: "16px", right: "16px" }
  },
  {
    title: "¡Oferta exclusiva por hoy!",
    text: "Aprovecha los precios especiales de esta promoción.",
    button: "Ver oferta",
    type: "offer",
    position: { top: "20%", left: "40%" }
  },
  {
    title: "¡Has ganado un premio!",
    text: "Descubre esta promoción especial y sus condiciones.",
    button: "Ver premio",
    type: "offer",
    position: { top: "42%", left: "24%" }
  },
  {
    title: "Descubre nuevas ofertas",
    text: "Encuentra productos destacados y promociones.",
    button: "Explorar",
    type: "side",
    position: { top: "50%", right: "12px" }
  },
  {
    title: "¡No te lo pierdas!",
    text: "Consulta las novedades disponibles.",
    button: "Más información",
    type: "green",
    position: { bottom: "28%", left: "20%" }
  },
  {
    title: "Aviso importante",
    text: "Verifica la procedencia de los avisos antes de actuar.",
    button: "Consultar",
    type: "warning",
    position: { bottom: "16px", right: "16px" }
  },
  {
    title: "¡Grandes descuentos!",
    text: "Encuentra artículos seleccionados a precios especiales.",
    button: "Ver catálogo",
    type: "offer",
    position: { top: "28%", left: "42%" }
  },
  {
    title: "Nuevas recomendaciones",
    text: "Descubre contenido y promociones.",
    button: "Descubrir",
    type: "side",
    position: { top: "25%", right: "12px" }
  }
];

function createAd(item) {
  const card = document.createElement("section");
  card.className = "ad-window";

  if (item.type === "green") {
    card.classList.add("green-banner", "bottom-banner");
  } else if (item.type === "side") {
    card.classList.add("red-banner", "side-banner", "right-banner");
  } else if (item.type === "warning") {
    card.classList.add("warning-strip", "bottom-banner");
  } else if (item.type === "notification") {
    card.classList.add("notification-demo");
  }

  Object.assign(card.style, item.position);

  const head = document.createElement("div");
  head.className = "ad-head";

  const label = document.createElement("span");
  label.textContent = "Publicidad";

  const close = document.createElement("button");
  close.className = "close";
  close.type = "button";
  close.textContent = "×";
  close.setAttribute("aria-label", "Cerrar anuncio");
  close.addEventListener("click", () => card.remove());

  head.append(label, close);

  const body = document.createElement("div");
  body.className = "ad-body";

  const title = document.createElement("h3");
  title.textContent = item.title;

  const text = document.createElement("p");
  text.textContent = item.text;

  const button = document.createElement("button");
  button.className = "ad-button";
  button.type = "button";
  button.textContent = item.button;

  button.addEventListener("click", () => {
    text.textContent =
      "Este botón forma parte de una demostración educativa.";
    button.textContent = "Aviso informativo";
    button.disabled = true;
  });

  body.append(title, text, button);
  card.append(head, body);
  ads.append(card);
}

function showNext() {
  if (index >= messages.length) {
    stopSimulation();
    status.textContent = "Demostración completada.";
    return;
  }

  createAd(messages[index]);
  index++;

  status.textContent =
    `Anuncios mostrados: ${index} de ${messages.length}`;
}

function startSimulation() {
  if (running) return;

  if (index >= messages.length) {
    status.textContent = "Pulsa Reiniciar para comenzar de nuevo.";
    return;
  }

  running = true;
  start.disabled = true;
  stop.disabled = false;

  status.textContent = "Mostrando anuncios...";

  showNext();

  timer = setInterval(() => {
    if (index >= messages.length) {
      stopSimulation();
      status.textContent = "Demostración completada.";
      return;
    }

    showNext();

    if (index >= messages.length) {
      stopSimulation();
      status.textContent = "Demostración completada.";
    }
  }, 1400);
}

function stopSimulation() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }

  running = false;
  start.disabled = false;
  stop.disabled = true;

  if (index < messages.length) {
    status.textContent =
      "Simulación detenida. Los anuncios visibles permanecen en pantalla.";
  }
}

function resetSimulation() {
  stopSimulation();
  ads.replaceChildren();
  index = 0;

  status.textContent = "Simulación detenida. Lista para comenzar.";
}

start.addEventListener("click", startSimulation);
stop.addEventListener("click", stopSimulation);
reset.addEventListener("click", resetSimulation);
