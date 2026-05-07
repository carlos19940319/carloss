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

    agregarDecoracionHojas();
    activarAnimacionesHojas();

    window.scrollTo({
      top:0,
      behavior:"smooth"
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
    musica.play();
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

  const dias = Math.floor(
    diferencia / (1000 * 60 * 60 * 24)
  );

  const horas = Math.floor(
    (diferencia / (1000 * 60 * 60)) % 24
  );

  const minutos = Math.floor(
    (diferencia / (1000 * 60)) % 60
  );

  const segundos = Math.floor(
    (diferencia / 1000) % 60
  );

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

/* ANIMACIÓN TARJETAS TIPO HOJAS */
const elementos = document.querySelectorAll(".reveal");

/* OBSERVER CORREGIDO PARA EVITAR PARPADEO */
const observerHojas = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");
      entry.target.classList.remove("salir");

      /*
        Esto evita que la tarjeta se vuelva a animar
        cada vez que subes o bajas el scroll.
      */
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

function agregarDecoracionHojas() {

  const tarjetas = document.querySelectorAll(".hoja-card");

  tarjetas.forEach((tarjeta) => {

    if (tarjeta.querySelector(".globo")) return;

    const globo1 = document.createElement("div");
    globo1.classList.add("globo", "globo1");

    const globo2 = document.createElement("div");
    globo2.classList.add("globo", "globo2");

    const globo3 = document.createElement("div");
    globo3.classList.add("globo", "globo3");

    tarjeta.appendChild(globo1);
    tarjeta.appendChild(globo2);
    tarjeta.appendChild(globo3);

  });

}
