# Ingresa Ya · Landing

Landing pública de **Ingresa Ya**, app de cultura general con retroalimentación estilo
Duolingo. HTML + CSS + JavaScript puro: sin frameworks, sin build y sin dependencias.

Incluye sección de **historia** (por qué existe el proyecto) y **formulario de acceso
anticipado** (waitlist) que envía los leads a Google Sheets.

## Cómo verla

```bash
# opción 1: abrir el archivo directo
start index.html

# opción 2: servidor estático
npx serve .          # o: python -m http.server 8080
```

## Estructura

| Archivo | Contenido |
| --- | --- |
| `index.html` | Página única: hero, características, duelos, cómo funciona, historia, FAQ, acceso anticipado |
| `politica-de-privacidad.html` | Política de privacidad |
| `styles.css` | Diseño responsive (mobile-first, breakpoints 960 y 720) |
| `script.js` | Menú móvil, animaciones al hacer scroll, acordeón FAQ, toast y formulario de waitlist |
| `favicon.svg` | Isotipo de la mascota |

## Arquitectura de la app Ingresa Ya (resumen)

Esto es lo que corre dentro de la app Flutter (`../colibri`), resumido para la landing:

| Capa | Tecnología |
| --- | --- |
| Interfaz | **Flutter** (Dart), tema propio, mascota y motion graphics |
| Estado y rutas | **Riverpod 2** + **go_router** (5 tabs + rutas fullscreen) |
| Persistencia | **SharedPreferences** (sesión, progreso y SRS local; sin base de datos) |
| Preguntas | JSON en `assets/questions/` (233 preguntas, funciona sin conexión) |
| API | **Node.js + Express + PostgreSQL** con JWT (invitado por `deviceId`) |
| Tiempo real | **WebSockets** (`ws`): salas de duelo por código de 6 dígitos, hasta 8 jugadores |
| Backend | Desplegado en **Render** (`colibri-back.onrender.com`) |

> Nota: la app **no usa SQLite**; el progreso vive en SharedPreferences y el
> banco de preguntas en assets JSON. El backend hermano está en `../colibri-backend`.

## Formulario de acceso anticipado

El formulario (`#waitlistForm`) envía `{app, nombre, email}` a Google Apps Script.
Configúralo en 5 minutos siguiendo [`../waitlist/README.md`](../waitlist/README.md)
y pega la URL en `script.js`:

```js
const WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/AKfyc.../exec';
```

Los leads de esta landing quedan en la pestaña `ingresaya` de tu hoja de cálculo.

## Paleta (oficial, del logo)

| Color | HEX | Uso |
| --- | --- | --- |
| Azul | `#107CF8` | Primario, botones, enlaces |
| Azul marino | `#031779` | Texto, gradiente profundo, CTA |
| Turquesa | `#05D2C7` | Acento, estados correctos, mascota |
| Amarillo | `#FDDA35` | Detalles, ala del colibrí, tags |

Están centralizadas en las variables de `:root` (`styles.css`); cambiarlas ahí
recalcola toda la página.

## Personalizar

- **Colores y sombras:** variables en `:root` (`styles.css`).
- **Textos y secciones:** directamente en `index.html`.
- **Historia:** sección `#historia`; el panel aside lista la arquitectura real de la app.
- **Mascota:** SVG simbólico `#mascota`, reutilizado con `<use>` en nav, hero, CTA y footer.
- **Animaciones:** las secciones con clase `reveal` aparecen al entrar en pantalla;
  con `?static` (p. ej. `/?static`) se muestran todas de inmediato — útil para capturas.

## Despliegue (Cloudflare Pages)

Este sitio está desplegado en **Cloudflare Pages** y servido en
`https://colibri-landing-969.pages.dev` (proyecto conectado al repo
`github.com/romelx23/colibri_landing`).

1. Subir los cambios a la rama `main` del repo.
2. Cloudflare redespliega solo (build command vacío, output = raíz).

> El repo se puede renombrar a `ingresaya_landing` desde *Settings → Repository name*;
> GitHub mantiene una redirección automática desde el nombre viejo y Cloudflare Pages
> sigue funcionando. El nombre del proyecto en el dashboard de Cloudflare
> (`colibri-landing-969`) es solo cosmético y puedes cambiarlo por separado.
