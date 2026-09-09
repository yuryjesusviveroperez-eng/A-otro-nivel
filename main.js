/* main.js — página principal: se conecta en tiempo real a Firestore */

import { suscribirseAEstadisticas } from "./data.js";

let grafico;
const historialPersonas = [];
let fondosAnterior = null;

function formatoMoneda(valor) {
  return Number(valor || 0).toLocaleString('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function pintarGrafico() {
  const lienzo = document.getElementById('graficoPersonas');
  if (!lienzo) return;

  const etiquetas = historialPersonas.map(() => '');

  if (grafico) {
    grafico.data.labels = etiquetas;
    grafico.data.datasets[0].data = historialPersonas;
    grafico.update();
    return;
  }

  grafico = new Chart(lienzo.getContext('2d'), {
    type: 'line',
    data: {
      labels: etiquetas,
      datasets: [{
        label: 'Personas ayudadas',
        data: historialPersonas,
        borderColor: '#e7a23a',
        backgroundColor: 'rgba(231,162,58,0.15)',
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#e7a23a',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#8d92ab' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#8d92ab' }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true }
      }
    }
  });
}

function mostrarCelebracion(meta) {
  const overlay = document.getElementById('celebracion');
  if (!overlay) return;
  overlay.querySelector('.meta-alcanzada-texto').textContent = `¡Meta de ${formatoMoneda(meta)} alcanzada!`;
  overlay.classList.add('visible');
  setTimeout(() => overlay.classList.remove('visible'), 4500);
}

let intervaloCuenta = null;

function iniciarCuentaRegresiva(fechaISO) {
  const contenedor = document.getElementById('cuentaRegresiva');
  if (!contenedor) return;
  if (intervaloCuenta) clearInterval(intervaloCuenta);

  if (!fechaISO) {
    contenedor.classList.add('oculto');
    return;
  }

  const objetivo = new Date(fechaISO).getTime();

  function actualizar() {
    const restante = objetivo - Date.now();
    if (restante <= 0) {
      contenedor.classList.add('oculto');
      clearInterval(intervaloCuenta);
      return;
    }
    contenedor.classList.remove('oculto');
    document.getElementById('cuentaDias').textContent = Math.floor(restante / 86400000);
    document.getElementById('cuentaHoras').textContent = Math.floor((restante % 86400000) / 3600000);
    document.getElementById('cuentaMinutos').textContent = Math.floor((restante % 3600000) / 60000);
  }

  actualizar();
  intervaloCuenta = setInterval(actualizar, 60000);
}

function alRecibirDatos(datos) {
  const personas = datos.Personas || 0;
  const fondos = datos.Fondos || 0;
  const meta = datos.Meta || 1;

  const elPersonasHero = document.getElementById('numPersonasHero');
  const elPersonas = document.getElementById('numPersonas');
  const elFondos = document.getElementById('numFondos');
  const barra = document.getElementById('barraMeta');
  const textoMeta = document.getElementById('textoMeta');

  if (elPersonasHero) elPersonasHero.textContent = personas.toLocaleString('es-ES');
  if (elPersonas) elPersonas.textContent = personas.toLocaleString('es-ES');
  if (elFondos) elFondos.textContent = formatoMoneda(fondos);

  if (barra && textoMeta) {
    const porcentaje = Math.min((fondos / meta) * 100, 100);
    barra.style.width = porcentaje + '%';
    textoMeta.textContent = `${porcentaje.toFixed(0)}% de la meta de ${formatoMoneda(meta)} para la próxima feria`;
  }

  historialPersonas.push(personas);
  if (historialPersonas.length > 20) historialPersonas.shift();
  pintarGrafico();

  iniciarCuentaRegresiva(datos.ProximaFeria);

  if (fondosAnterior !== null && fondosAnterior < meta && fondos >= meta) {
    mostrarCelebracion(meta);
  }
  fondosAnterior = fondos;
}

document.addEventListener('DOMContentLoaded', () => {
  suscribirseAEstadisticas(alRecibirDatos);
});
