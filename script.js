/* ALTURA REAL PARA EVITAR BRINCO POR BARRA URL EN CELULAR */
function fijarAltoPantalla() {
  const alto = window.innerHeight;

  document.documentElement.style.setProperty(
    "--alto-pantalla",
    alto + "px"
  );
}

fijarAltoPantalla();

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    fijarAltoPantalla();
  }, 300);
});


const btnEntrar = document.getElementById("btnEntrar");
const portada = document.getElementById("portada");
const invitacion = document.getElementById("invitacion");
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");


/* ENTRAR A LA INVITACIÓN */
btnEntrar.addEventListener("click", () => {

  portada.classList.add("saliendo");

  musica.play().catch(() => {
    console.log("El navegador bloqueó la reproducción automática.");
  });

  setTimeout(() => {
    portada.style.display = "none";

    invitacion.classList.remove("oculto");
    invitacion.classList.add("entrando");

    btnMusica.classList.remove("oculto");

    activarAnimacionesHojas();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 1000);

});


/* BOTÓN MÚSICA */
let musicaActiva = true;

btnMusica.addEventListener("click", () => {

  if (musicaActiva) {
    musica.pause();
    btnMusica.textContent = "×";
  } else {
    musica.play().catch(() => {
      console.log("El navegador bloqueó la reproducción automática.");
    });

    btnMusica.textContent = "♪";
  }

  musicaActiva = !musicaActiva;

});


/* CONTADOR */
const fechaEvento = new Date("2026-12-18T12:00:00").getTime();

function actualizarContador() {

  const ahora = new Date().getTime();
  const diferencia = fechaEvento - ahora;

  if (diferencia <= 0) {

    document.getElementById("contador").innerHTML =
      "<p>🎉 ¡Hoy es el gran día! 🎉</p>";

    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("dias").textContent =
    dias.toString().padStart(2, "0");

  document.getElementById("horas").textContent =
    horas.toString().padStart(2, "0");

  document.getElementById("minutos").textContent =
    minutos.toString().padStart(2, "0");

  document.getElementById("segundos").textContent =
    segundos.toString().padStart(2, "0");
}

setInterval(actualizarContador, 1000);
actualizarContador();


/* ANIMACIÓN TARJETAS */
const elementos = document.querySelectorAll(".reveal");

const observerHojas = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");
      entry.target.classList.remove("salir");

      observerHojas.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.15,
  rootMargin: "0px 0px -80px 0px"
});


function activarAnimacionesHojas() {

  elementos.forEach((elemento) => {
    observerHojas.observe(elemento);
  });

}


/* =========================================
   GLOBOS REACCIONAN AL TACTO Y MOUSE
========================================= */

const globos = document.querySelectorAll(".globo");

function empujarGlobos(x, y) {

  globos.forEach((globo) => {

    const rect = globo.getBoundingClientRect();

    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const dx = centroX - x;
    const dy = centroY - y;

    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < 190) {

      const fuerza = (190 - distancia) / 190;

      const moverX = dx * fuerza * 0.45;
      const moverY = dy * fuerza * 0.35;

      globo.style.setProperty("--pushX", moverX + "px");
      globo.style.setProperty("--pushY", moverY + "px");

      clearTimeout(globo.resetPush);

      globo.resetPush = setTimeout(() => {
        globo.style.setProperty("--pushX", "0px");
        globo.style.setProperty("--pushY", "0px");
      }, 420);

    }

  });

}

/* MOUSE */
window.addEventListener("mousemove", (e) => {
  empujarGlobos(e.clientX, e.clientY);
});

/* TACTO */
window.addEventListener("touchmove", (e) => {

  if (!e.touches.length) return;

  const touch = e.touches[0];

  empujarGlobos(touch.clientX, touch.clientY);

}, { passive: true });
