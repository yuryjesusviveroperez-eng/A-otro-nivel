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
  suscribirseAEstadisticas, actualizarEstadisticas, agregarCodigo, listarCodigos,
  suscribirseAImagenes, actualizarImagenes,
  suscribirseAProductos, agregarProducto, eliminarProducto,
  suscribirseACitas, marcarCitaContactada, eliminarCita
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
    suscribirseAImagenes(datos => {
      document.getElementById('imgHero').value = datos.Hero || '';
      document.getElementById('imgHistoria').value = datos.Historia || '';
      document.getElementById('imgEquipo').value = datos.Equipo || '';
      document.getElementById('imgTalento1').value = datos.Talento1 || '';
      document.getElementById('imgTalento2').value = datos.Talento2 || '';
      document.getElementById('imgTalento3').value = datos.Talento3 || '';
    });
    suscribirseAProductos(pintarListaProductos);
    suscribirseACitas(pintarListaCitas);
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

document.getElementById('formImagenes').addEventListener('submit', async function (e) {
  e.preventDefault();
  await actualizarImagenes({
    Hero: document.getElementById('imgHero').value.trim(),
    Historia: document.getElementById('imgHistoria').value.trim(),
    Equipo: document.getElementById('imgEquipo').value.trim(),
    Talento1: document.getElementById('imgTalento1').value.trim(),
    Talento2: document.getElementById('imgTalento2').value.trim(),
    Talento3: document.getElementById('imgTalento3').value.trim()
  });
});

function pintarListaProductos(productos) {
  const contenedor = document.getElementById('listaProductosAdmin');
  if (!productos.length) {
    contenedor.innerHTML = '<p class="campo-ayuda">Todavía no hay productos publicados.</p>';
    return;
  }
  contenedor.innerHTML = productos.map(p => `
    <div class="fila-producto-admin">
      <span>${p.Nombre}${p.Precio ? ' — ' + p.Precio : ''}</span>
      <button type="button" data-id="${p.id}">Eliminar</button>
    </div>
  `).join('');

  contenedor.querySelectorAll('button[data-id]').forEach(boton => {
    boton.addEventListener('click', () => eliminarProducto(boton.dataset.id));
  });
}

document.getElementById('formProducto').addEventListener('submit', async function (e) {
  e.preventDefault();
  await agregarProducto({
    Nombre: document.getElementById('prodNombre').value.trim(),
    Descripcion: document.getElementById('prodDescripcion').value.trim(),
    Precio: document.getElementById('prodPrecio').value.trim(),
    ImagenUrl: document.getElementById('prodImagen').value.trim(),
    LinkExterno: document.getElementById('prodLink').value.trim()
  });
  this.reset();
});

function pintarListaCitas(citas) {
  const contenedor = document.getElementById('listaCitas');
  if (!citas.length) {
    contenedor.innerHTML = '<p class="campo-ayuda">No hay solicitudes por ahora.</p>';
    return;
  }
  const orden = { pendiente: 0, contactada: 1 };
  citas.sort((a, b) => (orden[a.Estado] ?? 0) - (orden[b.Estado] ?? 0));

  contenedor.innerHTML = citas.map(c => `
    <div class="fila-producto-admin" style="align-items:flex-start; flex-direction:column;">
      <div style="display:flex; justify-content:space-between; width:100%; gap:0.75rem;">
        <span><strong>${c.Lugar}</strong> (${c.Tipo}) — ${c.Estado === 'contactada' ? 'contactada ✓' : 'pendiente'}</span>
        <span>
          ${c.Estado !== 'contactada' ? `<button type="button" data-contactar="${c.id}" style="color:var(--verde);">Marcar contactada</button>` : ''}
          <button type="button" data-eliminar="${c.id}">Eliminar</button>
        </span>
      </div>
      <span class="campo-ayuda">${c.Nombre} · ${c.Contacto} · fecha deseada: ${c.FechaDeseada || 'sin especificar'}</span>
      ${c.Mensaje ? `<span class="campo-ayuda">${c.Mensaje}</span>` : ''}
    </div>
  `).join('');

  contenedor.querySelectorAll('button[data-contactar]').forEach(boton => {
    boton.addEventListener('click', () => marcarCitaContactada(boton.dataset.contactar));
  });
  contenedor.querySelectorAll('button[data-eliminar]').forEach(boton => {
    boton.addEventListener('click', () => eliminarCita(boton.dataset.eliminar));
  });
}
