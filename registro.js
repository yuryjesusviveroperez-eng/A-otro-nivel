/* registro.js — valida el código, crea la cuenta (si la piden) y guarda al miembro */

import { usarCodigo, crearMiembro } from "./data.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

const checkboxCuenta = document.getElementById('quiereCuenta');
const camposCuenta = document.getElementById('camposCuenta');

checkboxCuenta.addEventListener('change', () => {
  camposCuenta.classList.toggle('oculto', !checkboxCuenta.checked);
});

document.getElementById('formRegistro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const boton = this.querySelector('button[type="submit"]');
  const mensaje = document.getElementById('mensajeRegistro');
  const quiereCuenta = checkboxCuenta.checked;
  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    colegio: document.getElementById('colegio').value.trim(),
    salon: document.getElementById('salon').value.trim(),
    motivos: document.getElementById('motivos').value.trim(),
    talento: document.getElementById('talento').value.trim(),
    codigo: document.getElementById('codigo').value.trim()
  };

  boton.disabled = true;

  // Primero la cuenta (si la pidió) — así, si algo sale mal aquí, el
  // código exclusivo todavía no se ha gastado y la persona lo puede
  // volver a intentar.
  let uid = null;
  if (quiereCuenta) {
    boton.textContent = 'Creando tu cuenta...';
    try {
      const correo = document.getElementById('cuentaCorreo').value.trim();
      const clave = document.getElementById('cuentaClave').value;
      const credencial = await createUserWithEmailAndPassword(auth, correo, clave);
      uid = credencial.user.uid;
    } catch (err) {
      boton.disabled = false;
      boton.textContent = 'Registrarme';
      mensaje.textContent = err.code === 'auth/email-already-in-use'
        ? 'Ese correo ya tiene una cuenta. Prueba con otro, o quita la casilla de cuenta si solo quieres registrarte.'
        : 'No pudimos crear la cuenta — revisa el correo y que la clave tenga al menos 6 caracteres.';
      mensaje.className = 'mensaje error';
      mensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }

  boton.textContent = 'Verificando código...';
  const valido = await usarCodigo(datos.codigo);

  boton.disabled = false;
  boton.textContent = 'Registrarme';

  if (!valido) {
    mensaje.textContent = 'Ese código no es válido o ya fue usado. Consíguelo en la próxima feria o escríbenos a nuestro correo.';
    mensaje.className = 'mensaje error';
    mensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  await crearMiembro(datos, uid);

  mensaje.textContent = uid
    ? '¡Listo! Ya eres parte de A Otro Nivel y tu cuenta quedó creada. Entra cuando quieras desde "Mi cuenta" para ver tu información.'
    : '¡Listo! Ya eres parte de A Otro Nivel. Pronto te escribiremos con los próximos pasos.';
  mensaje.className = 'mensaje exito';
  mensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
  this.reset();
  camposCuenta.classList.add('oculto');
});
