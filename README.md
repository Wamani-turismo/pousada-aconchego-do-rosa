# Pousada Aconchego do Rosa — sitio web

Sitio one-page, bilingüe (PT/ES), para la posada familiar Aconchego do Rosa en Praia do Rosa, Santa Catarina, Brasil. Sin backend: HTML + CSS + JS estático, listo para publicar en Netlify, Vercel o cualquier hosting estático.

## Estructura

```
index.html              → toda la página
assets/css/style.css    → estilos
assets/js/i18n.js       → textos en portugués y español
assets/js/main.js       → lógica: idioma, menú, animaciones, WhatsApp
assets/img/             → logo y fotos
robots.txt, sitemap.xml → SEO básico
```

## Cómo verlo en tu computadora

Abrí `index.html` con doble clic, o (mejor, para que cargue todo bien) desde una terminal:

```bash
cd POUSADA-ACONCHEGO-DO-ROSA
npx serve .
```

y entrá a la dirección que te muestre (por ej. http://localhost:3000).

## Cómo cambiar el número de WhatsApp

Abrí `assets/js/main.js` y editá la primera línea:

```js
const WHATSAPP_NUMBER = "554892213877";
```

Si al probar el botón no abre bien el chat, probá con el "9" extra que suelen tener los celulares de Brasil:

```js
const WHATSAPP_NUMBER = "5548992213877";
```

## Cómo cambiar textos (portugués / español)

Todos los textos están en `assets/js/i18n.js`, separados en dos bloques: `pt` y `es`. Cada clave (por ejemplo `hero_title`) tiene su versión en cada idioma — hay que actualizar las dos para que el toggle PT/ES siga funcionando bien.

Las reseñas de huéspedes (sección "Avaliações/Reseñas") están escritas directamente en `index.html`, tal como las dejaron los huéspedes en Booking, y no se traducen.

## Cómo reemplazar/agregar fotos

1. Poné las fotos nuevas en `assets/img/` (recomendado: formato `.webp` o `.jpg`, no más de 1600px de ancho para que cargue rápido).
2. En `index.html`, buscá los bloques con la clase `gallery__placeholder` (dice "Foto em breve" / "Foto próximamente") y reemplazalos por:
   ```html
   <img src="assets/img/NOMBRE-DE-TU-FOTO.jpg" alt="Descripción de la foto" loading="lazy">
   ```
3. Para que se pueda hacer zoom (lightbox), envolvé el `<img>` dentro de un `div.gallery__item` con el atributo `data-lightbox="assets/img/NOMBRE-DE-TU-FOTO.jpg"` (mirá el primer ítem de la galería en `index.html` como ejemplo).
4. La foto del hero (portada grande) es `assets/img/hero.jpg` — reemplazá ese archivo por la versión en alta resolución cuando la tengan, manteniendo el mismo nombre (o actualizá la ruta en `assets/css/style.css`, buscá `.hero {`).

El logo (`assets/img/logo.png` y `assets/img/logo-transp.png`) no se debe modificar ni redibujar.

## Deploy (publicar el sitio)

**Netlify (recomendado, gratis):**
1. Entrá a [netlify.com](https://netlify.com) y creá una cuenta.
2. Arrastrá la carpeta `POUSADA-ACONCHEGO-DO-ROSA` completa a la pantalla de "Deploy".
3. Netlify te da un link tipo `nombre-random.netlify.app` al instante.
4. Cuando tengan el dominio propio (ej. `aconchegodorosa.com.br`), se conecta desde "Domain settings".

**Vercel:** mismo proceso, desde [vercel.com](https://vercel.com), o conectando el repo de GitHub para que se actualice solo con cada cambio.

## SEO / redes sociales

- El `<title>`, meta description y datos `schema.org` (tipo `LodgingBusiness`) ya están cargados con los datos reales de la posada.
- Al pegar el link del sitio en WhatsApp o redes, va a mostrar automáticamente la foto de portada y la descripción (Open Graph).
- Falta actualizar la URL real (`aconchegodorosa.com.br`) en `index.html`, `robots.txt` y `sitemap.xml` una vez que el dominio esté activo — buscá esa URL con Ctrl+F en cada archivo.

## Pendientes (assets que faltan)

- Fotos en alta resolución: fachada, jardín, fogata/quincho, cocina, dormitorio, balcón/terraza.
- Videos (opcional, para el hero o la galería).
- Confirmar si el número de WhatsApp necesita el "9" extra (ver arriba).
