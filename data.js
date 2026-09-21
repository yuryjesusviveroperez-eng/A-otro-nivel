/* ============================================================
   data.js — capa de datos conectada a Firestore

   Colección "estadisticas", documento "Actual", campos:
   Personas, Fondos, Meta (así los creaste en la consola).

   Colección "codigos": un documento por código, con el código
   como ID del documento y un campo booleano "usado".
   ============================================================ */

import {
  doc, onSnapshot, updateDoc, setDoc, getDoc, runTransaction,
  collection, getDocs, addDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

const refEstadisticas = doc(db, "estadisticas", "Actual");

/* -------------------- Estadísticas (tiempo real) --------------------
   Se suscribe a los cambios del documento. callback(datos) se llama
   de inmediato con los valores actuales, y de nuevo cada vez que
   cambian — para cualquier visitante, en cualquier parte, sin
   recargar la página. Devuelve una función para cancelar la
   suscripción si alguna vez la necesitas. */
export function suscribirseAEstadisticas(callback) {
  return onSnapshot(refEstadisticas, snap => {
    if (snap.exists()) callback(snap.data());
  });
}

/* Solo funciona con una sesión de administrador iniciada — lo exigen
   las reglas de seguridad de Firestore. */
export function actualizarEstadisticas(cambios) {
  return updateDoc(refEstadisticas, cambios);
}

/* -------------------- Códigos exclusivos --------------------
   Cada código se entrega en persona en una feria o visita, y solo
   sirve una vez. */

/* Intenta usar un código. Devuelve true si funcionó, false si no
   existe o ya se había usado. Usa una transacción para que dos
   personas no puedan gastar el mismo código al mismo tiempo. */
export async function usarCodigo(codigo) {
  const refCodigo = doc(db, "codigos", codigo.trim().toUpperCase());
  try {
    return await runTransaction(db, async (transaccion) => {
      const snap = await transaccion.get(refCodigo);
      if (!snap.exists() || snap.data().usado === true) return false;
      transaccion.update(refCodigo, { usado: true });
      return true;
    });
  } catch {
    return false;
  }
}

/* Solo para el panel de administrador: requiere sesión iniciada
   (las reglas solo dejan "list" a usuarios autenticados). */
export async function listarCodigos() {
  const snap = await getDocs(collection(db, "codigos"));
  return snap.docs.map(d => ({ codigo: d.id, usado: d.data().usado === true }));
}

/* Crea un código nuevo, listo para repartir (requiere sesión de
   administrador). */
export function agregarCodigo(codigo) {
  const refCodigo = doc(db, "codigos", codigo.trim().toUpperCase());
  return setDoc(refCodigo, { usado: false });
}

/* -------------------- Imágenes de contenido --------------------
   Un solo documento con una URL por cada espacio de imagen del
   sitio (Hero, Historia, Talento1-3, Equipo). El panel de admin
   solo pide pegar el enlace de una imagen ya subida a algún lado
   (por ejemplo, directo en tu repositorio de GitHub, o cualquier
   servicio de imágenes) — no sube archivos, para no depender de
   Firebase Storage, que necesita activar facturación. */

const refImagenes = doc(db, "contenido", "Imagenes");

export function suscribirseAImagenes(callback) {
  return onSnapshot(refImagenes, snap => {
    callback(snap.exists() ? snap.data() : {});
  });
}

export function actualizarImagenes(cambios) {
  return setDoc(refImagenes, cambios, { merge: true });
}

/* -------------------- Tienda solidaria --------------------
   Colección "productos": cada producto tiene su propio enlace
   externo (a donde tú decidas llevarlo — tu tienda Moja, u otro
   sitio). */

export function suscribirseAProductos(callback) {
  return onSnapshot(collection(db, "productos"), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export function agregarProducto(datos) {
  return addDoc(collection(db, "productos"), datos);
}

export function eliminarProducto(id) {
  return deleteDoc(doc(db, "productos", id));
}

/* -------------------- Miembros --------------------
   Si la persona crea una cuenta al registrarse, su documento queda
   identificado con su uid de Firebase Auth (así puede volver a
   entrar desde perfil.html y ver hace cuánto es miembro). Si no
   quiso cuenta, el registro se guarda igual pero con un ID
   automático — queda guardado, pero sin forma de iniciar sesión. */

export function crearMiembro(datos, uid) {
  const conFecha = { ...datos, FechaRegistro: new Date().toISOString(), TieneCuenta: !!uid };
  if (uid) return setDoc(doc(db, "miembros", uid), conFecha);
  return addDoc(collection(db, "miembros"), conFecha);
}

export async function obtenerMiembro(uid) {
  const snap = await getDoc(doc(db, "miembros", uid));
  return snap.exists() ? snap.data() : null;
}

/* -------------------- Citas para charlas --------------------
   Solicitudes públicas para llevar una charla a un colegio u otro
   lugar. Quedan "pendiente" hasta que el equipo las revise desde
   el panel. */

export function agregarCita(datos) {
  return addDoc(collection(db, "citas"), { ...datos, Estado: 'pendiente', FechaSolicitud: new Date().toISOString() });
}

export function suscribirseACitas(callback) {
  return onSnapshot(collection(db, "citas"), snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export function marcarCitaContactada(id) {
  return updateDoc(doc(db, "citas", id), { Estado: 'contactada' });
}

export function eliminarCita(id) {
  return deleteDoc(doc(db, "citas", id));
}
