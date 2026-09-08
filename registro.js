/* registro.js — validación y envío del formulario de registro
   El formulario solo se acepta con un código exclusivo válido,
   entregado en persona en cada feria o visita. Cada código se
   consume al usarse, para que el registro crezca al ritmo real
   de sus eventos y no quede expuesto abiertamente. */

document.getElementById('formRegistro').addEventListener('submit', function (e) {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    colegio: document.getElementById('colegio').value.trim(),
    salon: document.getElementById('salon').value.trim(),
    motivos: document.getElementById('motivos').value.trim(),
    talento: document.getElementById('talento').value.trim(),
    codigo: document.getElementById('codigo').value.trim()
  };

  const mensaje = document.getElementById('mensajeRegistro');

  if (!usarCodigo(datos.codigo)) {
    mensaje.textContent = 'Ese código no es válido o ya fue usado. Consíguelo en la próxima feria o escríbenos a nuestro correo.';
    mensaje.className = 'mensaje error';
    mensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  guardarMiembro(datos);

  mensaje.textContent = '¡Listo! Ya eres parte de A Otro Nivel. Pronto te escribiremos con los próximos pasos.';
  mensaje.className = 'mensaje exito';
  mensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
  this.reset();
});
