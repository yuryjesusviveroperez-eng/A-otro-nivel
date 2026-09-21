/* ============================================================
   i18n.js — selector de idioma español / inglés

   Por ahora solo index.html tiene sus textos traducidos (con
   atributos data-i18n en el HTML). El resto de páginas del sitio
   se sigue mostrando en español. Para traducir otra página, se le
   agregan los mismos atributos data-i18n y se completan las claves
   que falten en el diccionario de abajo.
   ============================================================ */

const traducciones = {
  es: {
    'nav.como': 'Cómo funciona',
    'nav.wiki': 'Wiki',
    'nav.galeria': 'Galería',
    'nav.tienda': 'Tienda',
    'nav.impacto': 'Impacto',
    'nav.registrate': 'Regístrate',
    'hero.marcador': 'Imagen destacada — se agrega desde el panel de administrador',
    'hero.lema': 'A otro nivel',
    'hero.h1': 'El talento no pregunta dónde duermes.',
    'hero.p': 'Organizamos ferias de innovación donde científicos, artesanos y creadores en condición de calle muestran lo que saben hacer. Lo recaudado vuelve a ellos: más ferias, más campañas, y un camino real para salir de la calle.',
    'cuenta.titulo': 'Próxima feria en',
    'cuenta.dias': 'días',
    'cuenta.horas': 'horas',
    'cuenta.min': 'min',
    'hero.boton1': 'Conoce nuestra historia',
    'hero.boton2': 'Únete como voluntario',
    'herocifra.etiqueta': 'personas ayudadas hasta hoy',
    'como.h2': 'Así funciona A Otro Nivel',
    'como.p': 'Tres pasos, siempre en ese orden: primero encontramos el talento, después lo mostramos, y con lo recaudado devolvemos oportunidades a quienes lo demostraron.',
    'paso1.h3': 'Buscamos el talento en la calle',
    'paso1.p': 'Visitamos lugares donde viven personas en condición de calle y las invitamos a mostrar lo que saben hacer: ciencia, oficios, arte, ideas. A cada visita entregamos un código exclusivo para unirse a la comunidad.',
    'paso2.h3': 'Lo mostramos en una feria',
    'paso2.p': 'Organizamos ferias de innovación abiertas al público, donde cada participante presenta su talento frente a asistentes, aliados y posibles empleadores.',
    'paso3.h3': 'Repartimos lo recaudado',
    'paso3.p': 'El dinero de cada feria financia nuevas ferias, campañas y apoyo directo para salir de la calle. El resto mantiene el sitio, la comida y los materiales que usamos en cada evento.',
    'impacto.h2': 'Nuestro impacto',
    'impacto.p': 'Estos números los actualiza nuestro equipo después de cada feria y cada donación confirmada — no son una simulación automática.',
    'impacto.personas': 'personas ayudadas',
    'impacto.fondos': 'recaudado para la próxima feria',
    'impacto.nota': 'Estos datos se guardan en este sitio y se actualizan manualmente desde el panel del equipo cada vez que cerramos una feria o confirmamos una donación. Preferimos un número real y algo más lento que uno automático que no podamos respaldar.',
    'talentos.h2': 'Lo que vas a encontrar en una feria',
    'talentos.p': 'Cada feria reúne historias y talentos distintos. Estos son algunos ejemplos del tipo de talento que buscamos reconocer.',
    'talento.imagen': 'Imagen',
    'talento1.h3': 'Ciencia e ingeniería popular',
    'talento1.p': 'Personas que diseñan soluciones propias con lo que tienen a la mano: reparaciones, inventos, mecanismos.',
    'talento2.h3': 'Oficios y artesanía',
    'talento2.p': 'Carpintería, costura, reparación de aparatos, trabajos manuales que ya dominan y pueden convertir en sustento.',
    'talento3.h3': 'Arte y expresión',
    'talento3.p': 'Música, pintura, escritura: formas de contar su historia que también abren puertas de trabajo.',
    'galeriateaser.h2': 'Fotos de nuestras ferias',
    'galeriateaser.p': 'Un vistazo a lo que pasa el día de una feria. Esta es la galería completa.',
    'galeriateaser.proximamente': 'Próximamente',
    'galeriateaser.link': 'Ver la galería completa →',
    'testimonios.h2': 'Lo que cuentan quienes ya pasaron por una feria',
    'testimonios.p': 'Espacios de ejemplo — se reemplazan por testimonios reales, siempre con el permiso de la persona antes de publicar su nombre o su historia.',
    'testimonio.texto': '"[Aquí va, en sus propias palabras, lo que la persona quiera contar sobre su experiencia en la feria]"',
    'testimonio.firma': '— Nombre, talento presentado',
    'ayudar.h2': 'Cómo puedes ayudar',
    'ayudar.p': 'No hace falta ir a una feria para sumar. Estas son las tres formas de aportar.',
    'donar.h3': 'Donar',
    'donar.p': 'Cada aporte se reparte entre nuevas ferias, apoyo directo y el mantenimiento del proyecto — el detalle está en la wiki.',
    'donar.link': 'Ver en qué se usa →',
    'voluntario.h3': 'Ser voluntario',
    'voluntario.p': 'Si ya recibiste un código en una feria o visita, este es tu siguiente paso.',
    'voluntario.link': 'Ir al registro →',
    'aliado.h3': 'Ser aliado',
    'aliado.p': 'Empresas y colectivos que quieran sumarse con espacio, difusión o recursos para una feria.',
    'aliado.link': 'Ver más abajo →',
    'tiendateaser.h2': 'Tienda solidaria',
    'tiendateaser.p': 'Objetos hechos por personas que pasaron por una feria, cada uno con su propio enlace de compra.',
    'tiendateaser.boton': 'Ver la tienda',
    'aliados.h2': 'Aliados y patrocinadores',
    'aliados.p': 'Casillas de ejemplo — cámbialas por los logos reales de tus aliados en cuanto los tengas.',
    'aliados.hueco': 'Tu logo aquí',
    'aliados.cta': '¿Tu empresa o colectivo quiere sumarse como aliado? Escríbenos a',
    'cta.h2': '¿Quieres ser parte de esto?',
    'cta.p': 'Buscamos voluntarios y aliados solidarios. El registro pide un código exclusivo que entregamos en cada feria o visita, así mantenemos la comunidad segura y real.',
    'cta.boton': 'Ir al registro',
    'compartir.whatsapp': 'WhatsApp',
    'compartir.x': 'X / Twitter',
    'compartir.copiar': 'Copiar enlace',
    'footer.tagline': 'Fundación que organiza ferias de innovación para mostrar el talento de personas en condición de calle y ayudarlas a salir de ahí.',
    'footer.sitio': 'Sitio',
    'footer.registro': 'Registro',
    'footer.micuenta': 'Mi cuenta',
    'footer.agenda': 'Agenda una charla',
    'footer.panel': 'Panel del equipo',
    'footer.contacto': 'Contacto',
    'footer.derechos': '© 2026 A Otro Nivel. Todos los derechos reservados.'
  },
  en: {
    'nav.como': 'How it works',
    'nav.wiki': 'Wiki',
    'nav.galeria': 'Gallery',
    'nav.tienda': 'Shop',
    'nav.impacto': 'Impact',
    'nav.registrate': 'Sign up',
    'hero.marcador': 'Featured image — added from the admin panel',
    'hero.lema': 'A level up',
    'hero.h1': 'Talent doesn\u2019t ask where you sleep.',
    'hero.p': 'We run innovation fairs where scientists, craftspeople and creators experiencing homelessness show what they can do. What we raise goes back to them: more fairs, more campaigns, and a real path off the street.',
    'cuenta.titulo': 'Next fair in',
    'cuenta.dias': 'days',
    'cuenta.horas': 'hours',
    'cuenta.min': 'min',
    'hero.boton1': 'Read our story',
    'hero.boton2': 'Join as a volunteer',
    'herocifra.etiqueta': 'people helped so far',
    'como.h2': 'How A Otro Nivel works',
    'como.p': 'Three steps, always in this order: first we find the talent, then we showcase it, then what we raise goes back to the people who showed up.',
    'paso1.h3': 'We look for talent on the street',
    'paso1.p': 'We visit places where people experiencing homelessness live and invite them to show what they know: science, trades, art, ideas. Each visit, we hand out an exclusive code to join the community.',
    'paso2.h3': 'We showcase it at a fair',
    'paso2.p': 'We hold innovation fairs open to the public, where each participant presents their talent to attendees, partners and potential employers.',
    'paso3.h3': 'We give back what we raise',
    'paso3.p': 'Money from each fair funds new fairs, campaigns and direct support to help people leave the street. The rest keeps the site, the food and the materials we use at every event running.',
    'impacto.h2': 'Our impact',
    'impacto.p': 'Our team updates these numbers after each fair and each confirmed donation — this isn\u2019t an automatic simulation.',
    'impacto.personas': 'people helped',
    'impacto.fondos': 'raised for the next fair',
    'impacto.nota': 'This data is stored on this site and updated manually from the team panel every time we close out a fair or confirm a donation. We\u2019d rather show a real, slightly slower number than an automatic one we can\u2019t back up.',
    'talentos.h2': 'What you\u2019ll find at a fair',
    'talentos.p': 'Every fair brings together different stories and talents. Here are a few examples of the kind of talent we look to recognize.',
    'talento.imagen': 'Image',
    'talento1.h3': 'Everyday science and engineering',
    'talento1.p': 'People who design their own solutions with whatever they have on hand: repairs, inventions, mechanisms.',
    'talento2.h3': 'Trades and craftsmanship',
    'talento2.p': 'Carpentry, sewing, appliance repair — hands-on skills they already have and can turn into a livelihood.',
    'talento3.h3': 'Art and expression',
    'talento3.p': 'Music, painting, writing: ways of telling their story that also open doors to work.',
    'galeriateaser.h2': 'Photos from our fairs',
    'galeriateaser.p': 'A look at what a fair day looks like. This is the short preview — see the full gallery.',
    'galeriateaser.proximamente': 'Coming soon',
    'galeriateaser.link': 'See the full gallery →',
    'testimonios.h2': 'What people who\u2019ve been through a fair say',
    'testimonios.p': 'Placeholder spaces — to be replaced with real testimonials, always with the person\u2019s permission before publishing their name or story.',
    'testimonio.texto': '"[The person\u2019s own words about their experience at the fair go here]"',
    'testimonio.firma': '— Name, talent presented',
    'ayudar.h2': 'How you can help',
    'ayudar.p': 'You don\u2019t need to attend a fair to pitch in. Here are three ways to help.',
    'donar.h3': 'Donate',
    'donar.p': 'Every contribution is split between new fairs, direct support and keeping the project running — the breakdown is in the wiki.',
    'donar.link': 'See how it\u2019s used →',
    'voluntario.h3': 'Volunteer',
    'voluntario.p': 'If you already got a code at a fair or visit, this is your next step.',
    'voluntario.link': 'Go to sign-up →',
    'aliado.h3': 'Become a partner',
    'aliado.p': 'Companies and collectives who want to chip in with space, promotion or resources for a fair.',
    'aliado.link': 'See more below →',
    'tiendateaser.h2': 'Community shop',
    'tiendateaser.p': 'Items made by people who came through a fair, each with its own purchase link.',
    'tiendateaser.boton': 'Visit the shop',
    'aliados.h2': 'Partners and sponsors',
    'aliados.p': 'Placeholder boxes — swap them for real partner logos once you have them.',
    'aliados.hueco': 'Your logo here',
    'aliados.cta': 'Does your company or collective want to become a partner? Write to us at',
    'cta.h2': 'Want to be part of this?',
    'cta.p': 'We\u2019re looking for volunteers and supportive partners. Sign-up requires an exclusive code we hand out at every fair or visit, keeping the community safe and real.',
    'cta.boton': 'Go to sign-up',
    'compartir.whatsapp': 'WhatsApp',
    'compartir.x': 'X / Twitter',
    'compartir.copiar': 'Copy link',
    'footer.tagline': 'A nonprofit that runs innovation fairs to showcase the talent of people experiencing homelessness and help them leave the street.',
    'footer.sitio': 'Site',
    'footer.registro': 'Sign up',
    'footer.micuenta': 'My account',
    'footer.agenda': 'Book a talk',
    'footer.panel': 'Team panel',
    'footer.contacto': 'Contact',
    'footer.derechos': '© 2026 A Otro Nivel. All rights reserved.'
  }
};

function aplicarIdioma(idioma) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const clave = el.getAttribute('data-i18n');
    const texto = traducciones[idioma]?.[clave];
    if (texto !== undefined) el.textContent = texto;
  });
  document.documentElement.lang = idioma;
  localStorage.setItem('aon_idioma', idioma);
  const boton = document.getElementById('botonIdioma');
  if (boton) boton.textContent = idioma === 'es' ? 'EN' : 'ES';
}

document.addEventListener('DOMContentLoaded', () => {
  const guardado = localStorage.getItem('aon_idioma') || 'es';
  aplicarIdioma(guardado);

  const boton = document.getElementById('botonIdioma');
  if (boton) {
    boton.addEventListener('click', () => {
      const actual = document.documentElement.lang === 'en' ? 'en' : 'es';
      aplicarIdioma(actual === 'es' ? 'en' : 'es');
    });
  }
});
