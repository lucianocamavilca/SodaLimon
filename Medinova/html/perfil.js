// Datos iniciales del paciente
const datosPaciente = {
  nombre: 'Juan Pérez',
  edad: 30,
  correo: 'juan.perez@mail.com',
  telefono: '+1 234 567 890',
  historialMedico: [
    { fecha: '10 de Enero de 2023', consulta: 'Consulta general' },
    { fecha: '5 de Marzo de 2023', consulta: 'Visita al cardiólogo' }
  ],
  citas: [
    { fecha: '15 de Julio, 2023', descripcion: 'Consulta de seguimiento' },
    { fecha: '20 de Julio, 2023', descripcion: 'Examen de laboratorio' }
  ]
};

// Actualizar la información en la página
function actualizarInformacion() {
  document.getElementById('username').textContent = datosPaciente.nombre;
  document.getElementById('edad').textContent = `${datosPaciente.edad} años`;
  document.getElementById('correo').textContent = datosPaciente.correo;
  document.getElementById('telefono').textContent = datosPaciente.telefono;

  // Cargar el historial médico dinámicamente
  const historialMedicoList = document.getElementById('historial-medico');
  historialMedicoList.innerHTML = ''; // Limpiar historial previo
  datosPaciente.historialMedico.forEach((consulta) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${consulta.consulta}</strong>: ${consulta.fecha}`;
    historialMedicoList.appendChild(li);
  });
}

// Función para editar la información del paciente
function editarInfo() {
  const nuevoNombre = prompt('Ingresa el nuevo nombre:', datosPaciente.nombre);
  const nuevaEdad = prompt('Ingresa la nueva edad:', datosPaciente.edad);
  const nuevoCorreo = prompt('Ingresa el nuevo correo:', datosPaciente.correo);
  const nuevoTelefono = prompt('Ingresa el nuevo teléfono:', datosPaciente.telefono);

  // Actualizar datos
  if (nuevoNombre) datosPaciente.nombre = nuevoNombre;
  if (nuevaEdad) datosPaciente.edad = parseInt(nuevaEdad);
  if (nuevoCorreo) datosPaciente.correo = nuevoCorreo;
  if (nuevoTelefono) datosPaciente.telefono = nuevoTelefono;

  // Actualizar la UI con los nuevos datos
  actualizarInformacion();
}

// Función para cancelar una cita
function cancelarCita(citaId) {
  const cita = document.getElementById(citaId);
  cita.innerHTML = '<p>Cita cancelada.</p>';
}

// Función para volver al Dashboard
function volverAlDashboard() {
  window.location.href = "dashboard.html";  // Redirige al dashboard
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
  actualizarInformacion(); // Actualiza los datos al cargar la página

  // Agregar evento al botón de editar información
  document.getElementById('editarBtn').addEventListener('click', editarInfo);
});
