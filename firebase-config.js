/* ============================================================
   firebase-config.js — conexión al proyecto de Firebase

   El apiKey y demás valores de aquí abajo NO son secretos: están
   pensados para ir en el navegador de cualquier visitante. Lo que
   de verdad protege tus datos son las reglas de seguridad que ya
   configuraste en Firestore (Reglas), no ocultar este archivo.
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTwn2GDqWA4e0Js7gX4JjjSDdu7eTVFkE",
  authDomain: "a-otro-nivel-a7d99.firebaseapp.com",
  projectId: "a-otro-nivel-a7d99",
  storageBucket: "a-otro-nivel-a7d99.firebasestorage.app",
  messagingSenderId: "1077555808117",
  appId: "1:1077555808117:web:71930cae62bf5653bdb53c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
