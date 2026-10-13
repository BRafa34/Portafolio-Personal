# Inspección de la plantilla y adaptación

## Estado recibido

La carpeta no tenía `package.json`, `angular.json`, componentes Angular ni repositorio `.git`. La instrucción local es `Agente.md`, leída íntegramente antes de modificar archivos. No se encontraron instrucciones `AGENTS.md` en el proyecto ni en sus directorios ascendentes.

La plantilla se identifica en sus cabeceras como **Lonely**, de BootstrapMade, actualizada el 7 de agosto de 2024 con Bootstrap **5.3.3**. El punto de entrada original es `index.html`, HTML estático que se sirve directamente con Apache/XAMPP, sin compilación.

## Archivos y diseño

- `index.html`: navegación con anclas, hero, perfil, habilidades, CV, servicios, portafolio, testimonios, contacto y pie. Contiene identidades, contactos y textos ficticios de demostración.
- `portfolio-details.html`: detalles con carrusel e información de proyecto.
- `service-details.html`: detalle de servicios.
- `starter-page.html`: página base de referencia.
- `assets/css/main.css`: variables de color, fuentes, menú responsive, portada, cronología, barras, rejilla, contacto y estilos de páginas secundarias.
- `assets/img/`: fotografías de demostración y recursos gráficos; no se recibieron fotografías personales.
- `assets/js/main.js`: manipulación directa del DOM, menú móvil, scrollspy, preloader, animación de habilidades, filtros y carruseles.
- `forms/contact.php`: depende de `php-email-form.php`, biblioteca de pago no incluida. `forms/Readme.txt` confirma la limitación.
- `assets/scss/Readme.txt`: el SCSS fuente no está disponible en esta distribución.

El diseño usa azul `#2c4964`, rosa original `#d43076`, blancos y gris claro `#f2f6f9`. Las fuentes son Roboto para texto, Poppins para navegación y Playfair Display para encabezados. Tiene una portada alta con imagen, barra superior fija, encabezados con subrayado rosa, cronología de líneas y círculos y una rejilla de trabajos.

## Dependencias originales

Bootstrap e iconos se distribuyen localmente. AOS anima al hacer scroll; Waypoints inicia barras; GLightbox abre imágenes; imagesLoaded e Isotope distribuyen/filtran la rejilla; Swiper controla carruseles; validate.js intenta enviar el formulario PHP. Google Fonts se carga desde un servicio externo. No se encontró gestor de paquetes previo.

## Decisiones de Angular

La aplicación usa Angular 21 con componentes standalone; es compatible con Node 24.14.1 disponible. Bootstrap CSS se carga **una sola vez** desde su archivo original, sin instalar otra versión. Se conservan Bootstrap Icons y CSS original. Los scripts originales no se ejecutan en Angular: el menú, scrollspy, filtros y detalles se implementan con estado Angular y un diálogo nativo accesible. Se evita inicializar plugins antes de que el JSON llegue o duplicar eventos.

Los filtros mantienen una rejilla Bootstrap responsive. El diálogo reemplaza el detalle de proyecto de ejemplo. Multimedia admite imágenes, video y audio nativos, con controles y sin reproducción automática. No se necesitan AOS, Swiper ni Isotope para las secciones actuales. Las barras reflejan solo niveles escritos por la persona usuaria, permitiendo `null` si no hay valoración. Se respeta la preferencia de movimiento reducido.

Se conservaron los archivos originales. El CSS adicional cambia el rosa ligeramente a `#ba2767` para mejorar el contraste, adapta encabezados semánticos y controles por teclado, y añade estados vacíos sin fotografías de otras personas. Al proporcionar la portada real se recupera la fotografía a pantalla ancha de la plantilla.

No se trasladaron biografías, credenciales, proyectos, contactos o testimonios ficticios. Los servicios sin datos se sustituyen por habilidades e idiomas. El contacto presenta exclusivamente los enlaces reales del JSON y nunca aparenta enviar mensajes.

## Ejecución y publicación

La entrada Angular es `src/main.ts`/`src/index.html`; desarrollo con `npm start`, compilación con `npm run build`. Solo se copian los recursos públicos y los iconos al despliegue, además de los recursos que resuelve el compilador CSS. Los HTML de demostración y PHP no forman parte del sitio publicado.

La caché persistente del CLI está desactivada en `angular.json`: en este entorno Windows, `ng build` terminaba con un fallo nativo (código `-1073741819`) cuando estaba habilitada; con la caché desactivada la compilación de producción finalizó correctamente. La optimización de fuentes no descarga Google Fonts durante el build, para que compilar no dependa de ese servicio; el navegador conserva los enlaces de la plantilla y las fuentes de respaldo.

La compilación Pages usa rutas relativas y anclas, con workflow de GitHub Actions. La publicación y el envío al portal requieren repositorio/acceso y datos definitivos; no se han realizado.
