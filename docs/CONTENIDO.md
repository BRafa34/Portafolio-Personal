# Cómo completar el currículum

Edita `public/data/cv.json` conservando las claves. Usa textos reales y conserva `""` o `[]` cuando algo siga pendiente. El JSON no admite comentarios ni comas al final. Ejecuta `npm.cmd run validate:cv` para detectar errores.

Si `"demo": true`, el archivo aún contiene datos ficticios de muestra, aunque la página no muestra una advertencia. Sustituye la presentación, experiencia, habilidades e idiomas por datos verificables antes de publicar y luego cambia `demo` a `false`. Los proyectos Aquatrack y CleanSwipe se describen a partir de sus repositorios públicos; revisa la descripción de OdontoLab cuando su repositorio esté disponible. Las fotografías personales, nombre, formación y contacto existentes proceden del archivo que ya habías completado; revisa también esos datos antes de compartir la página.

Las imágenes de los proyectos actuales se cargan por URL desde Unsplash; no se guardan en el proyecto. Son fotografías ilustrativas, no capturas de las aplicaciones. Puedes sustituir cada `projects[].image.src` por una URL pública de una captura real. El repositorio de OdontoLab devolvió 404 durante la revisión; confirma que sea público y que el enlace sea correcto antes de publicar.

## Perfil

`name`: nombre; `role`: profesión/carrera; `intro`: presentación breve; `bio`: biografía; `location`: ubicación que quieras publicar; `availability`: disponibilidad. `photo` y `cover` tienen `src` y `alt`. `cvFile` es una ruta relativa a un PDF en `public/`, o texto vacío para ocultar el botón.

## Formación y experiencia

Cada entrada de `education` o `experience` sigue esta estructura. Reemplaza los campos entre corchetes con tus datos antes de añadirla:

```json
{
  "title": "[Título o cargo real]",
  "organization": "[Institución o empresa real]",
  "period": "[Fechas reales]",
  "description": "[Descripción real]",
  "highlights": ["[Actividad o logro real]"]
}
```

Puedes dejar `highlights: []` si no necesitas viñetas.

También se admite el formato abreviado `{ "institution": "[Institución real]", "degree": "[Título real]", "year": "[Fechas reales]" }`. Equivale a `organization`, `title` y `period`. `description` y `highlights` son opcionales. Omitirlos no interrumpe las demás secciones.

## Habilidades e idiomas

`skills`: objetos `{ "name": "[Habilidad real]", "level": null }`. Cambia `null` por un número de 0 a 100 solo si quieres aportar una valoración propia; no se asignan porcentajes automáticamente.

`languages`: objetos `{ "name": "[Idioma]", "level": "[Nivel real]" }`.

## Proyectos

Cada proyecto usa un `id` único. Las categorías crean automáticamente los filtros; el valor `Todos` está reservado.

```json
{
  "id": "proyecto-1",
  "title": "[Nombre del proyecto real]",
  "category": "[Categoría]",
  "description": "[Problema, trabajo realizado y resultado real]",
  "image": { "src": "", "alt": "" },
  "technologies": [],
  "url": "",
  "repository": ""
}
```

Para la imagen, coloca el archivo en `public/photos/` y usa `photos/nombre.webp`. Completa su `alt`. Usa URLs completas `https://...` para sitio y repositorio; deja `""` si no existen. No añadas enlaces de ejemplo.

La extensión debe coincidir exactamente con el archivo: `.jpeg` y `.jpg` son nombres diferentes. Los archivos de `assets/img/` son originales de referencia; para añadir tus fotografías a Angular, guarda copias en `public/photos/` y usa `photos/nombre.jpeg` en el JSON. La portada puede llevar `alt: ""` si se utiliza únicamente como fondo decorativo.

## Multimedia

```json
{
  "type": "image",
  "src": "photos/archivo-real.webp",
  "alt": "[Descripción real de la imagen]",
  "title": "[Título real]",
  "description": "[Contexto real]"
}
```

`type` admite `image`, `video` y `audio`. Los archivos pueden estar en `public/media/` usando rutas `media/archivo.mp4` o `media/archivo.mp3`. Se admiten URLs completas a archivos multimedia; su disponibilidad depende del servidor externo. No uses URLs de páginas YouTube/Vimeo como archivos de video.

Para video, puedes añadir `"captionSrc": "media/subtitulos.vtt"`; se mostrará una pista en español. Describe el contenido visual y ofrece una transcripción del audio en `description` cuando corresponda. No hay reproducción automática. Las imágenes se abren a tamaño completo en otra pestaña.

## Contacto

`email` y `phone` muestran enlaces `mailto:` y `tel:`. `links` admite objetos `{ "label": "[Nombre del perfil]", "url": "[URL real completa]" }`, por ejemplo para tu cuenta de GitHub o LinkedIn. Los campos vacíos no producen enlaces.

Todos los textos se interpolan como texto, no como HTML. Las rutas de recursos deben ser relativas a `public/`, sin `/` inicial, o URLs http/https completas. Respeta mayúsculas/minúsculas en los nombres de archivos para que funcionen también en GitHub Pages.
