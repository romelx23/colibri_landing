# Colibrí · Landing

Landing pública de **Colibrí**, app de cultura general con retroalimentación estilo
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
| `styles.css` | Diseño responsive (mobile-first, breakpoints 960 y 720) |
| `script.js` | Menú móvil, animaciones al hacer scroll, acordeón FAQ, toast |
| `favicon.svg` | Isotipo del colibrí |

## Personalizar

- **Colores y sombras:** variables en `:root` (`styles.css`). La paleta replica la app
  Flutter: `#7B6BF2` primario, `#FF8A3D` acento, `#F4F2FD` fondo.
- **Textos y secciones:** directamente en `index.html`.
- **Botón de descarga:** el CTA `#downloadBtn` tiene `href="#"` y muestra un toast;
  reemplázalo por el enlace real (Play Store o APK) y quita el `id` si no quieres el toast.
- **Mascota:** SVG simbólico `#colibri`, reutilizado con `<use>` en nav, hero, CTA y footer.
- **Animaciones:** las secciones con clase `reveal` aparecen al entrar en pantalla;
  con `?static` (p. ej. `/?static`) se muestran todas de inmediato — útil para capturas.

## Despliegue (GitHub Pages)

1. Subir este repo a la rama `main`.
2. *Settings → Pages → Deploy from a branch* → rama `main`, carpeta `/ (root)`.
3. La URL queda `https://<usuario>.github.io/<repo>/`.
