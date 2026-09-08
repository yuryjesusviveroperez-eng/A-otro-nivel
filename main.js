/* main.js — página principal: gráfico de impacto y contadores */

let grafico;

function formatoMoneda(valor) {
  return valor.toLocaleString('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function iniciarGrafico() {
  const lienzo = document.getElementById('graficoPersonas');
  if (!lienzo) return;

  const eventos = getHistorial().filter(e => e.tipo === 'personas');
  const etiquetas = eventos.length
    ? eventos.map(e => new Date(e.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }))
    : ['Hoy'];
  const datos = eventos.length ? eventos.map(e => e.valor) : [getPersonas()];

  if (grafico) grafico.destroy();

  grafico = new Chart(lienzo.getContext('2d'), {
    type: 'line',
    data: {
      labels: etiquetas,
      datasets: [{
        label: 'Personas ayudadas',
        data: datos,
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

function actualizarContadores() {
  const elPersonas = document.getElementById('numPersonas');
  const elFondos = document.getElementById('numFondos');
  const barra = document.getElementById('barraMeta');
  const textoMeta = document.getElementById('textoMeta');
  if (!elPersonas) return;

  elPersonas.textContent = getPersonas().toLocaleString('es-ES');
  const fondos = getFondos();
  const meta = getMeta();
  elFondos.textContent = formatoMoneda(fondos);

  const porcentaje = Math.min((fondos / meta) * 100, 100);
  barra.style.width = porcentaje + '%';
  textoMeta.textContent = `${porcentaje.toFixed(0)}% de la meta de ${formatoMoneda(meta)} para la próxima feria`;
}

function mostrarCelebracion(meta) {
  const overlay = document.getElementById('celebracion');
  if (!overlay) return;
  overlay.querySelector('.meta-alcanzada-texto').textContent = `¡Meta de ${formatoMoneda(meta)} alcanzada!`;
  overlay.classList.add('visible');
  setTimeout(() => overlay.classList.remove('visible'), 4500);
}

// Si el administrador actualiza los datos en otra pestaña del mismo
// navegador, esta pestaña se refresca sola (ver nota sobre alcance
// real de "tiempo real" en data.js).
window.addEventListener('storage', () => {
  actualizarContadores();
  iniciarGrafico();
});

document.addEventListener('metaAlcanzada', e => mostrarCelebracion(e.detail.meta));

document.addEventListener('DOMContentLoaded', () => {
  iniciarGrafico();
  actualizarContadores();
  setInterval(actualizarContadores, 5000);
});
