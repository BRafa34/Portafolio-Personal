# Preparación para el portal de evaluación

## Antes de entregar

1. Completa tu identidad, CV y enlaces en `public/data/cv.json`.
2. Añade tus fotografías y contenido multimedia; conserva los originales fuera de los archivos optimizados.
3. Revisa `npm.cmd run validate:cv`. Los avisos de contenido pendiente deben resolverse según lo que pida la evaluación.
4. Ejecuta `npm.cmd start` y revisa escritorio y móvil, navegación con teclado, imágenes, enlaces, filtros, detalles y reproducción.
5. Ejecuta `npm.cmd run package:delivery`.

## Archivos generados

En `entrega/` se crean dos ZIP fechados:

- `portafolio-web-....zip`: sitio listo para un servidor estático, con `index.html` en la raíz del ZIP. No necesita PHP ni instalar Angular en el servidor.
- `portafolio-fuentes-....zip`: proyecto Angular, JSON, recursos, instrucciones, configuración Pages y plantilla original. Excluye dependencias descargadas y resultados de compilación. Para reproducirlo: extraer, `npm.cmd ci`, `npm.cmd run build:pages`.

Sube el ZIP o enlace que solicite el portal, junto con las capturas/evidencias que especifique. Si exige código fuente, usa el ZIP de fuentes. Si exige una web compilada, usa el ZIP web. Si exige URL, completa el despliegue Pages y verifica el enlace. El portal puede limitar el tamaño; las fotos y videos afectan los ZIP.

## Estado de entrega

La aplicación y los pasos de empaquetado están preparados. Las fotografías y datos personales aún deben ser proporcionados. No se conoce el repositorio GitHub, la URL del portal, sus requisitos exactos ni las credenciales. No se ha publicado el sitio ni enviado archivos al portal. Los ZIP iniciales sirven para revisar la adaptación; vuelve a generarlos con los datos definitivos antes de entregar.
