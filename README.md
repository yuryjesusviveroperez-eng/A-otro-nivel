# A Otro Nivel

Sitio web de la fundación: wiki de la organización, página de registro de miembros y panel interno para el equipo. Las estadísticas y los códigos exclusivos viven en Firebase (Firestore + Authentication), en tiempo real para todos los visitantes.

## Estructura

```
a-otro-nivel/
├── index.html            Página principal (historia corta, impacto en vivo, CTA)
├── wiki.html              Wiki completa: misión, ferias, uso de fondos, FAQ
├── registro.html           Formulario de registro (colegio, salón, motivos, talento, código)
├── admin.html              Panel interno: login y actualización de estadísticas/códigos
├── css/style.css          Estilos y paleta del sitio
├── js/firebase-config.js   Conexión al proyecto de Firebase
├── js/data.js               Lectura/escritura en Firestore (estadísticas y códigos)
├── js/main.js                Gráfico y contadores de la página principal (tiempo real)
├── js/registro.js            Valida el código y guarda al miembro
└── js/admin.js                Login con Firebase Auth y lógica del panel interno
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo (por ejemplo `a-otro-nivel`) y sube todos estos archivos a la raíz.
2. En el repositorio: **Settings → Pages → Source**, elige la rama `main` y la carpeta `/root`.
3. En un par de minutos el sitio queda disponible en `https://tu-usuario.github.io/a-otro-nivel/`.

No necesitas ningún paso de compilación: sigue siendo HTML, CSS y JavaScript planos — Firebase se conecta por CDN, sin `npm` ni bundler.

## Cómo quedó conectado Firebase

- **Estadísticas**: colección `estadisticas`, documento `Actual`, campos `Personas`, `Fondos`, `Meta`. La página principal se suscribe a ese documento (`onSnapshot`), así que cualquier visitante ve el número cambiar sin recargar en cuanto el equipo lo actualiza desde `admin.html`.
- **Códigos exclusivos**: colección `codigos`, un documento por código (el código es el ID del documento) con el campo `usado` (booleano). Al registrarse, `registro.js` intenta marcarlo como usado con una transacción, para que dos personas no puedan gastar el mismo código a la vez.
- **Acceso al panel**: `admin.html` pide correo y clave, validados por Firebase Authentication. Solo entran las cuentas que crees en Authentication → Users — para sumar a alguien más al equipo, se agrega ahí, sin tocar código.
- Las reglas de seguridad de Firestore son las que realmente protegen los datos (no el archivo `firebase-config.js`, cuyas claves son públicas por diseño).

## Lo que sigue guardándose solo en este navegador

El formulario de registro (nombre, colegio, salón, motivos, talento) todavía se guarda en `localStorage`, no en Firestore. Cuando quieras verlos desde cualquier dispositivo o recibirlos por correo, el paso natural es crear una colección `miembros` en Firestore igual a como hiciste con `codigos`, o conectar el formulario a un servicio como Formspree.

## Sobre Trustpilot y las imágenes

A propósito no incluí el logo de Trustpilot ni imágenes tomadas de otras páginas:

- El sello de Trustpilot solo debe mostrarse cuando la verificación sea real — Trustpilot entrega su propio widget oficial una vez completado el proceso, y usarlo antes sería aprovechar una marca ajena sin permiso.
- Las fotos de otras páginas tienen derechos de autor de quien las tomó. Para las ferias y visitas, lo mejor es usar fotos propias (con el consentimiento de las personas fotografiadas) en vez de imágenes de internet.
