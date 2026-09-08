/* ============================================================
   admin.js — Panel de administrador (versión de demostración)

   AVISO DE SEGURIDAD REAL:
   Esta "contraseña" vive en un archivo .js que cualquiera puede
   abrir y leer en el navegador — no protege nada de verdad. Sirve
   para que veas el panel funcionando ya mismo en GitHub Pages.
   Antes de usarlo con dinero y datos reales, cambia esto por un
   inicio de sesión real (por ejemplo Firebase Auth, Supabase Auth
   o Netlify Identity), para que solo tu equipo pueda entrar.
   ============================================================ */

const CLAVE_DEMO = 'cambia-esta-clave';

const formLogin = document.getElementById('formLogin');
const seccionLogin = document.getElementById('login');
const seccionPanel = document.getElementById('panel');

formLogin.addEventListener('submit', function (e) {
  e.preventDefault();
  const clave = document.getElementById('clave').value;
  if (clave === CLAVE_DEMO) {
    seccionLogin.classList.add('oculto');
    seccionPanel.classList.remove('oculto');
    cargarPanel();
  } else {
    document.getElementById('errorLogin').textContent = 'Clave incorrecta.';
  }
});

function cargarPanel() {
  document.getElementById('valorPersonas').textContent = getPersonas().toLocaleString('es-ES');
  document.getElementById('valorFondos').textContent = getFondos().toLocaleString('es-ES', { style: 'currency', currency: 'USD' });
  document.getElementById('inputMeta').value = getMeta();
  const codigos = getCodigosValidos();
  document.getElementById('listaCodigos').textContent = codigos.length ? codigos.join(', ') : 'No hay códigos disponibles todavía.';
}

document.getElementById('formPersonas').addEventListener('submit', function (e) {
  e.preventDefault();
  const suma = parseInt(document.getElementById('sumaPersonas').value, 10) || 0;
  if (suma !== 0) setPersonas(Math.max(0, getPersonas() + suma));
  this.reset();
  cargarPanel();
});

document.getElementById('formFondos').addEventListener('submit', function (e) {
  e.preventDefault();
  const suma = parseFloat(document.getElementById('sumaFondos').value) || 0;
  if (suma !== 0) setFondos(Math.max(0, getFondos() + suma));
  this.reset();
  cargarPanel();
});

document.getElementById('formMeta').addEventListener('submit', function (e) {
  e.preventDefault();
  const nuevaMeta = parseFloat(document.getElementById('inputMeta').value);
  if (nuevaMeta > 0) setMeta(nuevaMeta);
  cargarPanel();
});

document.getElementById('formNuevoCodigo').addEventListener('submit', function (e) {
  e.preventDefault();
  const nuevo = document.getElementById('nuevoCodigo').value;
  if (nuevo.trim()) agregarCodigo(nuevo);
  this.reset();
  cargarPanel();
});
