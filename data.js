/* ============================================================
   data.js — Capa de datos de "A Otro Nivel"

   IMPORTANTE (léelo antes de publicar el sitio):
   Este archivo guarda todo en localStorage, es decir, dentro del
   navegador de cada persona. Sirve perfecto como demo y para que
   veas el sitio funcionando ya mismo en GitHub Pages, pero tiene
   dos límites reales que debes conocer:

   1. Los números que edite el administrador en admin.html solo se
      actualizan "en vivo" para quienes tengan el sitio abierto en
      el MISMO navegador. Para que todos los visitantes del mundo
      vean el mismo contador en tiempo real, necesitas una base de
      datos real (por ejemplo Firebase Realtime Database o
      Supabase), porque GitHub Pages solo sirve archivos estáticos
      y no tiene servidor propio.
   2. localStorage no es seguro para datos sensibles ni para una
      contraseña de administrador de verdad (ver aviso en admin.js).

   Cuando quieras dar el salto a datos reales, esta es la única
   pieza que tendrías que cambiar: reemplaza las funciones de este
   archivo por llamadas a tu backend, y el resto del sitio
   (main.js, registro.js, admin.js) sigue funcionando igual porque
   todos hablan a través de estas funciones.
   ============================================================ */

const CLAVES = {
  personas: 'aon_personas_ayudadas',
  fondos: 'aon_fondos_recaudados',
  meta: 'aon_meta_actual',
  historial: 'aon_historial',
  codigos: 'aon_codigos_validos',
  miembros: 'aon_miembros'
};

const VALORES_INICIALES = {
  personas: 0,
  fondos: 0,
  meta: 5000000
};

function getPersonas() {
  return parseInt(localStorage.getItem(CLAVES.personas), 10) || VALORES_INICIALES.personas;
}

function getFondos() {
  return parseFloat(localStorage.getItem(CLAVES.fondos)) || VALORES_INICIALES.fondos;
}

function getMeta() {
  return parseFloat(localStorage.getItem(CLAVES.meta)) || VALORES_INICIALES.meta;
}

function getHistorial() {
  return JSON.parse(localStorage.getItem(CLAVES.historial) || '[]');
}

function registrarEvento(tipo, valor) {
  const historial = getHistorial();
  historial.push({ tipo, valor, fecha: new Date().toISOString() });
  localStorage.setItem(CLAVES.historial, JSON.stringify(historial.slice(-60)));
}

function setPersonas(valor) {
  localStorage.setItem(CLAVES.personas, valor);
  registrarEvento('personas', valor);
}

function setFondos(valor) {
  localStorage.setItem(CLAVES.fondos, valor);
  registrarEvento('fondos', valor);
  const meta = getMeta();
  if (valor >= meta) {
    document.dispatchEvent(new CustomEvent('metaAlcanzada', { detail: { valor, meta } }));
  }
}

function setMeta(valor) {
  localStorage.setItem(CLAVES.meta, valor);
}

/* -------------------- Códigos exclusivos --------------------
   Cada código se reparte en persona durante una feria o visita,
   y solo sirve una vez: así el registro crece al ritmo de sus
   eventos reales y no queda abierto a cualquiera en internet. */

function getCodigosValidos() {
  return JSON.parse(localStorage.getItem(CLAVES.codigos) || '[]');
}

function agregarCodigo(codigo) {
  const codigos = getCodigosValidos();
  const limpio = codigo.trim().toUpperCase();
  if (limpio && !codigos.includes(limpio)) {
    codigos.push(limpio);
    localStorage.setItem(CLAVES.codigos, JSON.stringify(codigos));
  }
}

function usarCodigo(codigo) {
  const codigos = getCodigosValidos();
  const limpio = codigo.trim().toUpperCase();
  const indice = codigos.indexOf(limpio);
  if (indice === -1) return false;
  codigos.splice(indice, 1);
  localStorage.setItem(CLAVES.codigos, JSON.stringify(codigos));
  return true;
}

/* -------------------- Miembros registrados -------------------- */

function guardarMiembro(datos) {
  const miembros = JSON.parse(localStorage.getItem(CLAVES.miembros) || '[]');
  miembros.push({ ...datos, fecha: new Date().toISOString() });
  localStorage.setItem(CLAVES.miembros, JSON.stringify(miembros));
}

function getMiembros() {
  return JSON.parse(localStorage.getItem(CLAVES.miembros) || '[]');
}
