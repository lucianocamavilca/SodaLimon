// Contador de visitas
const counter = localStorage.getItem("visitas") || 0;
const updated = parseInt(counter) + 1;
localStorage.setItem("visitas", updated);
document.getElementById("visit-counter").innerText = updated;

// Función para agregar antecedentes
function agregarAntecedente() {
  const input = document.getElementById("nuevo-antecedente");
  const texto = input.value.trim();
  if (!texto) return; // Si el texto está vacío, no hacer nada

  // Crear un nuevo ítem de lista con el antecedente
  const li = document.createElement("li");
  li.innerHTML = `${texto} <button onclick="eliminarAntecedente(this)">Eliminar</button>`;

  // Agregar el ítem a la lista de antecedentes
  document.querySelector(".antecedentes ul").appendChild(li);

  // Limpiar el campo de entrada
  input.value = "";
}

// Función para eliminar un antecedente
function eliminarAntecedente(btn) {
  btn.parentElement.remove(); // Eliminar el ítem de la lista
}

// Filtrado de registros clínicos
document.getElementById("buscador").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const registros = document.querySelectorAll(".clinical-records .record");

  registros.forEach((reg) => {
    reg.style.display = reg.innerText.toLowerCase().includes(query) ? "block" : "none";
  });
});

// Función para manejar el envío del formulario de consulta
document.getElementById('formularioConsulta').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir la recarga de la página

  // Obtener los valores del formulario
  const motivo = document.getElementById('motivo').value;
  const diagnostico = document.getElementById('diagnostico').value;
  const tratamiento = document.getElementById('tratamiento').value;
  const notas = document.getElementById('notas').value;
  const medico = document.getElementById('medico').value;
  const fecha = document.getElementById('fecha').value;

  // Crear el nuevo registro de consulta
  const nuevoRegistro = `
    <div class="record">
      <h3>Consulta - ${fecha}</h3>
      <p><strong>Motivo:</strong> ${motivo}</p>
      <p><strong>Diagnóstico:</strong> ${diagnostico}</p>
      <p><strong>Tratamiento:</strong> ${tratamiento}</p>
      <p><strong>Notas:</strong> ${notas}</p>
      <p><strong>Médico tratante:</strong> ${medico}</p>
    </div>
  `;

  // Insertar el nuevo registro al final de la lista de registros
  document.getElementById('registros').insertAdjacentHTML('beforeend', nuevoRegistro);

  // Limpiar el formulario después de agregar
  document.getElementById('formularioConsulta').reset();
});
