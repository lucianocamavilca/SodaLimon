document.addEventListener("DOMContentLoaded", () => {
  // Marcar ítems como completados
  const listaItems = document.querySelectorAll('.card.flotante ul li');

  listaItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('completado'); // Cambiar el estado del ítem
      item.querySelector('span').classList.toggle('completado'); // Cambiar el estado de los textos
      actualizarContadores(); // Actualizar los contadores después de marcar
    });
  });

  // Eliminar ítems de la lista con la "X"
  const lista = document.querySelectorAll('.card.flotante ul li');

  lista.forEach(item => {
    // Crear la "X" para eliminar el ítem
    const xEliminar = document.createElement('span');
    xEliminar.textContent = '';
    xEliminar.classList.add('eliminar-x');

    // Añadir la "X" a cada ítem
    item.appendChild(xEliminar);

    xEliminar.addEventListener('click', (event) => {
      event.stopPropagation(); // Evitar que se active el click del ítem
      item.remove(); // Eliminar el ítem de la lista
      actualizarContadores(); // Actualizar los contadores después de eliminar
    });
  });

  // Agregar nuevos ítems
  const formAgregarItem = document.getElementById('form-agregar-item');
  const inputItem = document.getElementById('input-item');
  const listaCards = document.querySelectorAll('.card.flotante ul');

  formAgregarItem.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el envío del formulario
    
    // Crear un nuevo ítem
    const nuevoItem = document.createElement('li');
    nuevoItem.textContent = inputItem.value;

    // Crear un span para el estado de cada ítem
    const estado = document.createElement('span');
    estado.classList.add('estado');
    estado.textContent = 'pendiente';
    nuevoItem.appendChild(estado);

    
    // Crear la "X" para eliminar el ítem
      const xEliminar = document.createElement('span');
    xEliminar.textContent = '❌';
    xEliminar.classList.add('eliminar-x');

     // Añadir la "X" de eliminación al ítem
      nuevoItem.appendChild(xEliminar);

    // Agregar el nuevo ítem a la lista
       listaCards.forEach((ul) => {
      ul.appendChild(nuevoItem);
    });

 

    // Limpiar el input después de agregar
    inputItem.value = ''; 
    actualizarContadores(); // Actualizar los contadores
  });

  // Contar ítems completados y pendientes
  const contadorPendientes = document.getElementById('contador-pendientes');
  const contadorCompletados = document.getElementById('contador-completados');

  function actualizarContadores() {
    const items = document.querySelectorAll('.card.flotante ul li');
    let pendientes = 0;
    let completados = 0;

    items.forEach(item => {
      if (item.classList.contains('completado')) {
        completados++;
      } else {
        pendientes++;
      }
    });

    contadorPendientes.textContent = `Pendientes: ${pendientes}`;
    contadorCompletados.textContent = `Completados: ${completados}`;
  }

  // Llamar a la función cuando se haga clic en un ítem
  document.querySelectorAll('.card.flotante ul li').forEach(item => {
    item.addEventListener('click', actualizarContadores);
  });

  // Filtro de búsqueda
  const filtroInput = document.getElementById('filtro');

  filtroInput.addEventListener('input', () => {
    const textoFiltro = filtroInput.value.toLowerCase();
    const items = document.querySelectorAll('.card.flotante ul li');
    
    items.forEach(item => {
      const textoItem = item.textContent.toLowerCase();
      if (textoItem.includes(textoFiltro)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // Establecer hover y animación para los ítems de la lista
  document.querySelectorAll('.card.flotante ul li').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = "#f1f1f1";
      item.style.transform = "scale(1.05)";
      item.style.transition = "0.2s";
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = "";
      item.style.transform = "";
    });
  });

  // Inicializar contadores al cargar la página
  actualizarContadores();
});
