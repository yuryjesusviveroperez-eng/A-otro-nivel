/* registro.js — valida el código exclusivo contra Firestore y guarda al miembro */

import { usarCodigo } from "./data.js";

function guardarMiembroLocal(datos) {
  // Por ahora, los datos del formulario se guardan en este navegador.
  // El siguiente paso natural, cuando quieras, es crear una colección
  // "miembros" en Firestore (igual a como hiciste con "codigos") para
  // verlos desde cualquier dispositivo o recibirlos por correo.
  const miembros = JSON.parse(localStorage.getItem('aon_miembros') || '[]');
  miembros.push({ ...datos, fecha: new Date().toISOString() });
  localStorage.setItem('aon_miembros', JSON.stringify(miembros));
}

document.getElementById('formRegistro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const boton = this.querySelector('button[type="submit"]');
  const mensaje = document.getElementById('mensajeRegistro');
  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    colegio: document.getElementById('colegio').value.trim(),
    salon: document.getElementById('salon').value.trim(),
    motivos: document.getElementById('motivos').value.trim(),
    talento: document.getElementById('talento').value.trim(),
    codigo: document.getElementById('codigo').value.trim()
  };

  boton.disabled = true;
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

  guardarMiembroLocal(datos);

  mensaje.textContent = '¡Listo! Ya eres parte de A Otro Nivel. Pronto te escribiremos con los próximos pasos.';
  mensaje.className = 'mensaje exito';
  mensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
  this.reset();
});
