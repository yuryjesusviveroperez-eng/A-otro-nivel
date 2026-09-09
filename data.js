/* ============================================================
   data.js — capa de datos conectada a Firestore

   Colección "estadisticas", documento "Actual", campos:
   Personas, Fondos, Meta (así los creaste en la consola).

   Colección "codigos": un documento por código, con el código
   como ID del documento y un campo booleano "usado".
   ============================================================ */

import {
  doc, onSnapshot, updateDoc, setDoc, runTransaction,
  collection, getDocs
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
