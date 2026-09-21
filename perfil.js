/* perfil.js — inicio de sesión de miembros y vista de su perfil */

import {
  signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from "./firebase-config.js";
import { obtenerMiembro } from "./data.js";

const seccionLogin = document.getElementById('login');
const seccionPerfil = document.getElementById('perfil');
const errorLogin = document.getElementById('errorLogin');

document.getElementById('formLoginMiembro').addEventListener('submit', async function (e) {
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

document.getElementById('botonSalir').addEventListener('click', () => signOut(auth));

function calcularAntiguedad(fechaISO) {
  if (!fechaISO) return '';
  const dias = Math.floor((Date.now() - new Date(fechaISO).getTime()) / 86400000);
  if (dias < 1) return 'Miembro desde hoy';
  if (dias < 30) return `Miembro hace ${dias} día${dias === 1 ? '' : 's'}`;
  const meses = Math.floor(dias / 30);
  if (meses < 12) return `Miembro hace ${meses} mes${meses === 1 ? '' : 'es'}`;
  const anios = Math.floor(meses / 12);
  return `Miembro hace ${anios} año${anios === 1 ? '' : 's'}`;
}

onAuthStateChanged(auth, async (usuario) => {
  if (!usuario) {
    seccionLogin.classList.remove('oculto');
    seccionPerfil.classList.add('oculto');
    return;
  }

  const datos = await obtenerMiembro(usuario.uid);
  if (!datos) {
    // Sesión de administrador u otra cuenta sin perfil de miembro.
    seccionLogin.classList.remove('oculto');
    seccionPerfil.classList.add('oculto');
    errorLogin.textContent = 'Esta cuenta no tiene un perfil de miembro.';
    return;
  }

  seccionLogin.classList.add('oculto');
  seccionPerfil.classList.remove('oculto');
  document.getElementById('perfilNombre').textContent = datos.nombre || '';
  document.getElementById('perfilAntiguedad').textContent = calcularAntiguedad(datos.FechaRegistro);
  document.getElementById('perfilColegio').textContent = datos.colegio || '';
  document.getElementById('perfilTalento').textContent = datos.talento || '';
  document.getElementById('perfilMotivos').textContent = datos.motivos || '';
});
