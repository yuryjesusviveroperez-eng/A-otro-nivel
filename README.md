# A Otro Nivel

Sitio web de la fundación: wiki de la organización, página de registro de miembros y panel interno para el equipo.

## Estructura

```
a-otro-nivel/
├── index.html          Página principal (historia corta, impacto, CTA)
├── wiki.html            Wiki completa: misión, ferias, uso de fondos, FAQ
├── registro.html         Formulario de registro (colegio, salón, motivos, talento, código)
├── admin.html            Panel interno para actualizar estadísticas y códigos
├── css/style.css        Estilos y paleta del sitio
├── js/data.js            Capa de datos (localStorage) — leer primero
├── js/main.js             Gráfico y contadores de la página principal
├── js/registro.js         Validación del formulario de registro
└── js/admin.js            Lógica del panel interno
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo (por ejemplo `a-otro-nivel`) y sube todos estos archivos a la raíz.
2. En el repositorio: **Settings → Pages → Source**, elige la rama `main` y la carpeta `/root`.
3. En un par de minutos el sitio queda disponible en `https://tu-usuario.github.io/a-otro-nivel/`.

No necesitas ningún paso extra de compilación: es HTML, CSS y JavaScript planos.

## Cosas importantes antes de usarlo con datos reales

Este sitio está listo para mostrarse y funciona de verdad en el navegador, pero como es 100% estático (GitHub Pages no tiene servidor propio), hay tres límites que debes conocer:

1. **Los números "en vivo" son por navegador, no globales.** Lo que el equipo actualiza en `admin.html` se guarda en `localStorage`, es decir, dentro de ese navegador. Para que todas las personas del mundo vean el mismo contador actualizándose de verdad en tiempo real, necesitas una base de datos real detrás — por ejemplo **Firebase Realtime Database** o **Supabase** (ambas tienen planes gratuitos y se conectan bien a un sitio estático). El único archivo que tendrías que cambiar es `js/data.js`: el resto del sitio seguiría funcionando igual.
2. **La clave del panel de administrador no es segura.** Vive en `js/admin.js`, un archivo que cualquiera puede abrir. Sirve para la demo, pero antes de manejar datos y dinero reales, cámbiala por un inicio de sesión de verdad (Firebase Auth, Supabase Auth o similar).
3. **El registro guarda los datos localmente, no te los envía por correo.** Si quieres recibir cada registro en `soyese102015@gmail.com`, conecta el formulario a un servicio como Formspree, o mejor, a la misma base de datos real del punto 1.

## Sobre Trustpilot y las imágenes

A propósito no incluí el logo de Trustpilot ni imágenes tomadas de otras páginas:

- El sello de Trustpilot solo debe mostrarse cuando la verificación sea real — Trustpilot entrega su propio widget oficial una vez completado el proceso, y usarlo antes sería aprovechar una marca ajena sin permiso.
- Las fotos de otras páginas tienen derechos de autor de quien las tomó. Para las ferias y visitas, lo mejor es usar fotos propias (con el consentimiento de las personas fotografiadas) en vez de imágenes de internet.

## Códigos exclusivos

Los códigos que controlan el registro (`js/data.js`, función `getCodigosValidos`) empiezan vacíos. Agrégalos desde `admin.html` antes de cada feria o visita, y repártelos en persona — así el registro crece al ritmo real del proyecto.
