document.addEventListener("DOMContentLoaded", () => {
  const btnAgregar = document.getElementById("btnAgregar");
  const btnAlta = document.getElementById("btnAlta");
  const contenedor = document.getElementById("tratamientos-activos");

  const estados = ["pendiente", "en-progreso", "completado"];
  const etiquetas = {
    "pendiente": "⏳ Por iniciar",
    "en-progreso": "🟡 En curso",
    "completado": "✅ Finalizado"
  };

  // Agregar tratamiento
  btnAgregar.addEventListener("click", () => {
    const nombre = document.getElementById("nuevoNombre").value.trim();
    const descripcion = document.getElementById("nuevaDescripcion").value.trim();

    if (!nombre || !descripcion) {
      mostrarToast("⚠️ Completa ambos campos");
      return;
    }

    const card = document.createElement("div");
    card.className = "treatment-card";
    card.innerHTML = `
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
      <span class="status-label pendiente">${etiquetas["pendiente"]}</span>
      <button class="btn-eliminar">🗑️</button>
    `;
    contenedor.appendChild(card);
    document.getElementById("nuevoNombre").value = "";
    document.getElementById("nuevaDescripcion").value = "";
    mostrarToast("✅ Tratamiento añadido");

    agregarEventos(card.querySelector(".status-label"), card.querySelector(".btn-eliminar"));
  });

  // Alta
  btnAlta.addEventListener("click", () => {
    mostrarToast("✅ Paciente dado de alta correctamente");
  });

  // Mostrar tratamientos si los hay al inicio
  crearEjemplos();

  // Mostrar / Ocultar
  window.toggleTratamientos = function () {
    contenedor.style.display = contenedor.style.display === "none" ? "block" : "none";
  };

  // Función para mostrar toast
  function mostrarToast(mensaje) {
    const toast = document.createElement("div");
    toast.className = "toast show";
    toast.textContent = mensaje;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove("show"), 3000);
    setTimeout(() => toast.remove(), 3500);
  }

  // Cambio de estado + eliminar
  function agregarEventos(label, botonEliminar) {
    label.addEventListener("click", () => {
      let actual = estados.find(e => label.classList.contains(e));
      let siguiente = estados[(estados.indexOf(actual) + 1) % estados.length];
      label.className = `status-label ${siguiente}`;
      label.textContent = etiquetas[siguiente];
    });

    botonEliminar.addEventListener("click", () => {
      label.parentElement.remove();
      mostrarToast("🗑️ Tratamiento eliminado");
    });
  }

  // Ejemplos iniciales
  function crearEjemplos() {
    const ejemplos = [
      {
        nombre: "Antibióticos",
        descripcion: "Amoxicilina 500mg cada 8h por 7 días",
        estado: "completado"
      },
      {
        nombre: "Reposo",
        descripcion: "Mínimo 3 días. Evitar exposición al frío.",
        estado: "en-progreso"
      },
      {
        nombre: "Controles",
        descripcion: "Consulta de seguimiento el 17/03/2025",
        estado: "pendiente"
      }
    ];

    ejemplos.forEach(e => {
      const card = document.createElement("div");
      card.className = "treatment-card";
      card.innerHTML = `
        <h3>${e.nombre}</h3>
        <p>${e.descripcion}</p>
        <span class="status-label ${e.estado}">${etiquetas[e.estado]}</span>
        <button class="btn-eliminar">🗑️</button>
      `;
      contenedor.appendChild(card);
      agregarEventos(card.querySelector(".status-label"), card.querySelector(".btn-eliminar"));
    });
  }
});
