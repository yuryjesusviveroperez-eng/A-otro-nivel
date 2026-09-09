/* ============================================================
   admin.js — panel de administrador con Firebase Auth real

   Ya no hay clave fija en el código: el inicio de sesión lo valida
   Firebase contra la cuenta que creaste en Authentication → Users.
   Solo esa cuenta (y las que agregues ahí) puede entrar y escribir
   en Firestore, según las reglas de seguridad que configuraste.
   ============================================================ */

import {
  signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from "./firebase-config.js";
import {
  suscribirseAEstadisticas, actualizarEstadisticas, agregarCodigo, listarCodigos
} from "./data.js";

const formLogin = document.getElementById('formLogin');
const seccionLogin = document.getElementById('login');
const seccionPanel = document.getElementById('panel');
const errorLogin = document.getElementById('errorLogin');
const botonSalir = document.getElementById('botonSalir');

let datosActuales = { Personas: 0, Fondos: 0, Meta: 0 };
let cancelarSuscripcion = null;

formLogin.addEventListener('submit', async function (e) {
  e.preventDefault();
  errorLogin.textContent = '';
  try {
    await signInWithEmailAndPassword(
      auth,
      document.getElementById('correo').value.trim(),
      document.getElementById('clave').value
    );
  } catch {
    errorLogin.textContent = 'Correo o clave incorrectos.';
  }
});

botonSalir.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, (usuario) => {
  if (usuario) {
    seccionLogin.classList.add('oculto');
    seccionPanel.classList.remove('oculto');
    cancelarSuscripcion = suscribirseAEstadisticas(datos => {
      datosActuales = datos;
      pintarPanel();
    });
    cargarCodigos();
  } else {
    seccionLogin.classList.remove('oculto');
    seccionPanel.classList.add('oculto');
    if (cancelarSuscripcion) cancelarSuscripcion();
  }
});

function aFormatoLocal(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function pintarPanel() {
  document.getElementById('valorPersonas').textContent = (datosActuales.Personas || 0).toLocaleString('es-ES');
  document.getElementById('valorFondos').textContent = (datosActuales.Fondos || 0).toLocaleString('es-ES', { style: 'currency', currency: 'USD' });
  document.getElementById('inputMeta').value = datosActuales.Meta || 0;
  document.getElementById('inputProximaFeria').value = aFormatoLocal(datosActuales.ProximaFeria);
}

async function cargarCodigos() {
  const codigos = await listarCodigos();
  const disponibles = codigos.filter(c => !c.usado).map(c => c.codigo);
  document.getElementById('listaCodigos').textContent =
    disponibles.length ? disponibles.join(', ') : 'No hay códigos disponibles todavía.';
}

document.getElementById('formPersonas').addEventListener('submit', async function (e) {
  e.preventDefault();
  const suma = parseInt(document.getElementById('sumaPersonas').value, 10) || 0;
  if (suma !== 0) await actualizarEstadisticas({ Personas: Math.max(0, (datosActuales.Personas || 0) + suma) });
  this.reset();
});

document.getElementById('formFondos').addEventListener('submit', async function (e) {
  e.preventDefault();
  const suma = parseFloat(document.getElementById('sumaFondos').value) || 0;
  if (suma !== 0) await actualizarEstadisticas({ Fondos: Math.max(0, (datosActuales.Fondos || 0) + suma) });
  this.reset();
});

document.getElementById('formMeta').addEventListener('submit', async function (e) {
  e.preventDefault();
  const nuevaMeta = parseFloat(document.getElementById('inputMeta').value);
  if (nuevaMeta > 0) await actualizarEstadisticas({ Meta: nuevaMeta });
});

document.getElementById('formProximaFeria').addEventListener('submit', async function (e) {
  e.preventDefault();
  const valor = document.getElementById('inputProximaFeria').value;
  if (valor) await actualizarEstadisticas({ ProximaFeria: new Date(valor).toISOString() });
});

document.getElementById('formNuevoCodigo').addEventListener('submit', async function (e) {
  e.preventDefault();
  const nuevo = document.getElementById('nuevoCodigo').value;
  if (nuevo.trim()) {
    await agregarCodigo(nuevo);
    await cargarCodigos();
  }
  this.reset();
});
