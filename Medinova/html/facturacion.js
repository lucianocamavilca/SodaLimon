let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

// Elementos del DOM
const form = document.getElementById("form-factura");
const tbody = document.getElementById("facturas-body");
const filtro = document.getElementById("filtro");
const toast = document.getElementById("toast");
const ctx = document.getElementById("graficoFacturacion").getContext("2d");

let grafico;

document.addEventListener("DOMContentLoaded", () => {
  renderizarFacturas(facturas);
  actualizarResumen();
  generarGrafico();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fecha = document.getElementById("fecha").value;
  const paciente = document.getElementById("paciente").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const estado = document.getElementById("estado").value;

  if (!fecha || !paciente || !monto || !estado) return;

  facturas.push({ fecha, paciente, monto, estado });
  guardarFacturas();
  form.reset();
  mostrarToast("✅ Factura registrada correctamente");
  renderizarFacturas(facturas);
  actualizarResumen();
  generarGrafico();
});

function limpiarFormulario() {
  form.reset();
}

function guardarFacturas() {
  localStorage.setItem("facturas", JSON.stringify(facturas));
}

function mostrarToast(mensaje) {
  toast.textContent = mensaje;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function formatearEstado(estado) {
  switch (estado) {
    case "pagado": return "Pagado";
    case "pendiente": return "Pendiente";
    case "en-proceso": return "En proceso";
    default: return estado;
  }
}

// 🧨 Eliminar factura
function eliminarFactura(index) {
  if (confirm("¿Deseas eliminar esta factura?")) {
    facturas.splice(index, 1);
    guardarFacturas();
    renderizarFacturas(facturas);
    actualizarResumen();
    generarGrafico();
    mostrarToast("🗑️ Factura eliminada");
  }
}

function renderizarFacturas(data) {
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No hay facturas registradas.</td></tr>`;
    return;
  }

  data.forEach((factura, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${factura.fecha}</td>
      <td>${factura.paciente}</td>
      <td>S/ ${factura.monto.toFixed(2)}</td>
      <td><span class="estado ${factura.estado}">${formatearEstado(factura.estado)}</span></td>
      <td><button onclick="eliminarFactura(${index})" class="btn-eliminar">🗑️</button></td>
    `;
    tbody.appendChild(row);
  });
}

function actualizarResumen() {
  let total = 0, pagado = 0, pendiente = 0;

  facturas.forEach(f => {
    total += f.monto;
    if (f.estado === "pagado") pagado += f.monto;
    if (f.estado === "pendiente") pendiente += f.monto;
  });

  document.getElementById("total-facturado").textContent = total.toFixed(2);
  document.getElementById("total-pagado").textContent = pagado.toFixed(2);
  document.getElementById("total-pendiente").textContent = pendiente.toFixed(2);
}

filtro.addEventListener("input", () => {
  const texto = filtro.value.toLowerCase();
  const filtrado = facturas.filter(f =>
    f.paciente.toLowerCase().includes(texto) ||
    f.estado.toLowerCase().includes(texto)
  );
  renderizarFacturas(filtrado);
});

function generarGrafico() {
  if (grafico) grafico.destroy();

  const agrupado = {};
  facturas.forEach(f => {
    agrupado[f.fecha] = (agrupado[f.fecha] || 0) + f.monto;
  });

  const fechas = Object.keys(agrupado);
  const montos = Object.values(agrupado);

  grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: fechas,
      datasets: [{
        label: "Facturación por Fecha (S/)",
        data: montos,
        backgroundColor: "#2e86de",
        barPercentage: 0.5,
        categoryPercentage: 0.6,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `S/ ${ctx.raw}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => `S/ ${value}`
          }
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 30
          }
        }
      }
    }
  });
}
