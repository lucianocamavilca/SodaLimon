const botonesMas = document.querySelectorAll('.mas');
const botonesMenos = document.querySelectorAll('.menos');
const cantidades = document.querySelectorAll('.cantidad');
const total = document.querySelector('.total');

botonesMas.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    let cantidad = parseInt(cantidades[index].textContent);
    cantidad++;
    cantidades[index].textContent = cantidad;
    actualizarTotal();
  });
});

botonesMenos.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    let cantidad = parseInt(cantidades[index].textContent);
    if (cantidad > 0) {
      cantidad--;
      cantidades[index].textContent = cantidad;
      actualizarTotal();
    }
  });
});

function actualizarTotal() {
  let suma = 0;
  cantidades.forEach((cant, i) => {
    const producto = cant.closest('.producto'); // Busca el contenedor del producto
    const precioTexto = producto.querySelector('.precio').textContent.replace('S/ ', '').trim();
    const precio = parseFloat(precioTexto);

    suma += parseInt(cant.textContent) * precio;
  });
  total.textContent = `S/ ${suma.toFixed(2)}`;
}




