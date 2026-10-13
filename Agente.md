# Instrucciones para la IA: portafolio personal multimedia en Angular

## Objetivo

Construye y adapta en este proyecto una aplicación web multimedia que funcione como portafolio personal. Sigue los requisitos de la evaluación y trabaja sobre la plantilla de portafolio Bootstrap que proporcionará la persona usuaria. La persona usuaria también proporcionará sus fotografías y datos personales.

## Requisitos de la evaluación

1. Usar como punto de partida una plantilla de portafolio hecha con Bootstrap, que la persona usuaria buscará y descargará.
2. Analizar los archivos de esa plantilla antes de hacer cambios: identifica su estructura, estilos, componentes visuales, recursos, dependencias y forma de ejecución. Luego adáptala al proyecto Angular; no la reemplaces por un diseño genérico ni supongas que es compatible sin inspeccionarla.
3. Usar las fotografías personales que proporcione la persona usuaria. Conserva los originales y utiliza copias optimizadas o referencias a los archivos cuando convenga. No inventes fotos, identidad, biografía ni datos de contacto.
4. Mantener la información del currículum en un archivo JSON fácil de editar. Incluye, según los datos disponibles, presentación, formación, experiencia, habilidades, proyectos, idiomas y enlaces. Si falta información, deja un campo claramente identificable para completar; no inventes credenciales.
5. Dejar la aplicación lista para desplegar en GitHub, preferentemente GitHub Pages si encaja con el repositorio y sus restricciones. Configura correctamente la ruta base y los recursos para que funcionen en el destino.
6. Preparar los archivos y pasos necesarios para subir el resultado al portal de la evaluación. No afirmes que algo se publicó o se subió si no se completó realmente.

## Forma de trabajo

- Antes de editar, inspecciona el repositorio, sus instrucciones (`AGENTS.md` u otros archivos de guía), la versión de Angular, los scripts y la plantilla Bootstrap disponible.
- Si la plantilla o las fotos todavía no están en el proyecto, continúa con el análisis de lo que sí exista y solicita esos archivos cuando sean indispensables para adaptarlos. No inventes que ya los recibiste.
- Conserva el estilo visual reconocible de la plantilla Bootstrap y adapta su estructura a Angular de forma mantenible. Reutiliza sus recursos cuando corresponda y evita duplicar librerías o cargar dos veces Bootstrap.
- Usa componentes Angular adecuados para la navegación y las secciones del portafolio. Mantén el contenido separado de la presentación y carga los datos del currículum desde JSON.
- Crea secciones claras, por ejemplo: inicio/perfil, sobre mí, formación, experiencia, habilidades, proyectos, galería o multimedia y contacto. Ajusta las secciones a la plantilla y a la información real disponible.
- Haz que la navegación funcione en móvil y escritorio. Cuida la accesibilidad: textos alternativos útiles, contraste legible, navegación por teclado, etiquetas para controles y jerarquía de encabezados.
- Usa las fotos personales con proporciones y recortes apropiados, sin deformarlas. Optimiza tamaños y formatos cuando sea posible, y añade textos alternativos basados únicamente en lo que se conoce.
- No añadas formularios que aparenten enviar mensajes si no existe un servicio funcional; ofrece enlaces de contacto reales proporcionados por la persona usuaria.
- Respeta el gestor de paquetes y la configuración existentes. No hagas actualizaciones amplias de dependencias salvo que sean necesarias y expliques por qué.
- Antes de dar por terminado el trabajo, ejecuta los comandos de compilación o validación disponibles en el proyecto y corrige los errores que introduzcan tus cambios.

## Entrega

Al finalizar, resume qué se adaptó, dónde se editan los datos del CV, dónde se colocan o cambian las fotos, cómo ejecutar y compilar la aplicación, y qué falta para el despliegue o la entrega al portal. Distingue claramente entre lo que quedó hecho y lo que depende de archivos, datos, acceso o acciones de la persona usuaria.
