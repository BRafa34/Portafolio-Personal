# Portafolio personal · Angular + Lonely

Adaptación de la plantilla **Lonely de BootstrapMade**, siguiendo `Agente.md`. Mantiene sus tipografías Roboto/Poppins/Playfair Display, colores azul y rosa, navegación, portada, encabezados subrayados y cronología del CV. Usa componentes standalone de Angular 21, contenido JSON y Bootstrap 5.3.3 local.

## Ejecutar y compilar

Requiere Node compatible con Angular 21 (el entorno usado tiene Node 24.14.1) y npm. La primera instalación requiere internet; Google Fonts también usa internet, con fuentes de sistema como alternativa.

```powershell
npm.cmd ci
npm.cmd start
```

Abre `http://127.0.0.1:4200`. En terminales que permiten scripts puedes usar `npm` en lugar de `npm.cmd`.

```powershell
npm.cmd run validate:cv
npm.cmd run build
npm.cmd run build:pages
npm.cmd run preview
npm.cmd run package:delivery
```

El sitio compilado está en `dist/portafolio/browser`. `build:pages` usa `<base href="./">`, compatible con un repositorio Pages, un dominio propio y subcarpetas. La navegación usa fragmentos de una sola página, sin rutas que necesiten reglas de reescritura. Para XAMPP, sirve el contenido compilado desde una subcarpeta; abrir `src/index.html` directamente no ejecuta Angular.

Después de compilar, `npm.cmd run preview` sirve el resultado en `http://127.0.0.1:4173/portafolio/` para comprobarlo bajo una subcarpeta como en GitHub Pages. Es una vista previa local, no un servidor de publicación. Usa `npm start` para probar reproducción de video/audio; este servidor simple no implementa peticiones por rangos para avanzar en archivos grandes.

**El `index.html` de la raíz y los otros HTML originales siguen siendo la plantilla de referencia, no la aplicación Angular.** La entrada de la aplicación es `src/index.html`. Los recursos y formularios originales se conservan para referencia; no se publica el formulario PHP.

## Personalizar

- Datos del CV: `public/data/cv.json`. Las listas vacías y los textos vacíos muestran estados «por completar»; no se han inventado datos personales.
- Fotos: coloca copias en `public/photos/`. Completa `profile.photo`, `profile.cover`, `projects[].image` y/o `media[]`, con rutas relativas como `photos/perfil.webp` y textos alternativos reales.
- CV descargable: coloca tu PDF en `public/` e indica su ruta relativa en `profile.cvFile`.
- Estilo adicional y recortes: `src/styles.css`. El CSS original permanece en `assets/css/main.css`.
- Esquema y ejemplos para añadir entradas: `docs/CONTENIDO.md`.

**Para ver los cambios mientras editas:** ejecuta `npm.cmd start` y abre `http://127.0.0.1:4200`. Al guardar `public/data/cv.json`, Angular recarga la página. La vista previa de `http://127.0.0.1:4173/portafolio/` sirve una copia compilada: después de editar necesitas ejecutar `npm.cmd run build:pages` y recargar esa pestaña. Edita siempre el JSON de `public/`; los archivos de `dist/` se reemplazan al compilar.

La validación de cada compilación comprueba tipos, URLs, niveles, identificadores y existencia de recursos locales. Revisa además que los datos sean tuyos, que no queden campos pendientes y que los enlaces externos funcionen. Para videos, usa archivos reproducibles (p. ej. MP4), no URLs de páginas de YouTube. Puedes añadir `captionSrc` con un archivo WebVTT de subtítulos y aportar transcripciones en la descripción del audio/video.

## GitHub Pages

Se preparó `.github/workflows/pages.yml`. Cuando crees el repositorio, sube los archivos fuente incluyendo `package-lock.json` y la carpeta `.github`. No subas `node_modules`, `dist` ni los ZIP de `entrega`.

1. Crea un repositorio en GitHub y sube el proyecto a la rama `main`.
2. En **Settings → Pages**, selecciona **GitHub Actions** como origen.
3. El push a `main` ejecuta instalación, validación, compilación y despliegue. También puedes iniciar el workflow manualmente.
4. Comprueba el enlace y las imágenes en la URL que devuelva GitHub.

Si usas otra rama, ajusta `branches` en el workflow. Sin repositorio, acceso a GitHub ni configuración Pages no puede confirmarse una publicación. Los pasos y archivos están preparados; no se ha publicado automáticamente.

## Entrega al portal

Consulta `docs/ENTREGA.md`. `npm.cmd run package:delivery` genera ZIP del sitio compilado y del código fuente en `entrega/`. Elige lo que pida el portal; no se conoce su URL ni sus requisitos de formato/tamaño. Debes completar los datos y las fotos antes de la entrega definitiva.

## Plantilla y créditos

Consulta `docs/ANALISIS-PLANTILLA.md` para la inspección y las decisiones de adaptación. Se mantienen los créditos y enlaces de BootstrapMade/DevTools en el pie y los avisos del CSS original. Las fotos de ejemplo se conservan en `assets/img` para referencia y no se muestran como fotos personales en la aplicación.
