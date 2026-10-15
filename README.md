# Ingresa Ya · Landing

Landing pública de **Ingresa Ya**, app de cultura general con retroalimentación estilo
Duolingo. HTML + CSS + JavaScript puro: sin frameworks, sin build y sin dependencias.

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
| `index.html` | Página única: hero, características, duelos, cómo funciona, FAQ, CTA |
| `politica-de-privacidad.html` | Política de privacidad (URL para Google Play) |
| `styles.css` | Diseño responsive (mobile-first, breakpoints 960 y 720) |
| `script.js` | Menú móvil, animaciones al hacer scroll, acordeón FAQ, toast |
| `favicon.svg` | Isotipo de la mascota |

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
- **Botón de descarga:** el CTA `#downloadBtn` tiene `href="#"` y muestra un toast;
  reemplázalo por el enlace real (Play Store o APK) y quita el `id` si no quieres el toast.
- **Mascota:** SVG simbólico `#mascota`, reutilizado con `<use>` en nav, hero, CTA y footer.
- **Animaciones:** las secciones con clase `reveal` aparecen al entrar en pantalla;
  con `?static` (p. ej. `/?static`) se muestran todas de inmediato — útil para capturas.

## Despliegue (GitHub Pages)

1. Subir este repo a la rama `main`.
2. *Settings → Pages → Deploy from a branch* → rama `main`, carpeta `/ (root)`.
3. La URL queda `https://<usuario>.github.io/<repo>/`.

URL de la política de privacidad para Play Console:
`https://romelx23.github.io/colibri_landing/politica-de-privacidad.html`
