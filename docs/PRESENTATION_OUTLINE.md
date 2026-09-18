# Guion de presentación — TechToJob V1

> Objetivo: presentar una decisión de producto respaldada por la implementación y por evidencia local verificable. Separar siempre el estado local de las acciones pendientes de publicación.

## 1. Problema y contexto

**En pantalla**

- Las candidaturas aisladas ofrecen poco contexto sobre la persona.
- El talento que empieza necesita oportunidades para aprender, construir y ser visible.
- Las empresas necesitan señales más humanas que una primera criba de currículums.

**Mensaje del presentador**

TechToJob no promete empleo ni utiliza cifras no confirmadas. La propuesta cambia el punto de partida: primero participación, trabajo visible y conversación; después, oportunidades con más contexto.

## 2. Posicionamiento y objetivo

**En pantalla**

- **No es otro portal de empleo: es una comunidad.**
- Conversión principal: entrar al Discord oficial.
- Recorrido: comprender → participar → ser conocido → conversar.

**Mensaje del presentador**

El CTA principal se mantiene coherente desde el hero hasta el cierre. La newsletter es una demostración secundaria y no compite con Discord.

## 3. Hero: dos audiencias, un mismo lugar

**Demostración**

1. Mostrar el mensaje principal y el CTA de Discord.
2. Abrir el recorrido de **Talento**.
3. Cambiar al recorrido de **Empresas**.
4. Señalar que cada control comunica su estado expandido y controla una región identificada.

**Mensaje del presentador**

El talento protagoniza la entrada; las empresas reciben contexto específico sin crear otra landing ni convertir la experiencia en un tablón de ofertas. El menú radial mantiene un H1 estable y usa controles de divulgación, no unas tabs ficticias.

## 4. Recorrido del producto

**En pantalla**

1. Posicionamiento: no dejar otro CV en una lista.
2. Cómo funciona: entrar, presentarse, participar y conversar.
3. Talento y empresas: beneficios y señales con contexto.
4. Torneos: reto, entrega, criterios públicos y resultado útil.
5. Networking: canales, dudas, personas y oportunidades compartidas.
6. Testimonios, noticias y newsletter: estructura editorial transparente.
7. Cierre: volver al CTA de Discord.

**Mensaje del presentador**

Las cuatro tarjetas de testimonios son provisionales. Cada una reserva de forma visible nombre, frase, foto pendiente y perfil pendiente, sin inventar personas, retratos ni enlaces. Las tres noticias también están etiquetadas como muestras editoriales.

## 5. Sistema visual y comportamiento responsive

**En pantalla**

- Sora y paleta principal `#2f3436`, `#84c0bf`, `#ffffff`.
- Curvas y símbolos oficiales como lenguaje visual recurrente.
- Grillas progresivas: una columna en móvil, composición intermedia en tablet y expansión controlada en escritorio.
- Sin carruseles ni contenido esencial dependiente de una animación.

**Mensaje del presentador**

La dirección visual nace de la identidad de TechToJob. Las verificaciones locales no detectaron desbordamiento horizontal a 390, 768 ni 1440 píxeles CSS. `prefers-reduced-motion` elimina el desplazamiento suave y las animaciones ambientales y de revelado.

## 6. Arquitectura y límites cliente-servidor

**En pantalla**

- Next.js App Router, React, TypeScript y Tailwind CSS v4.
- Rutas prerenderizadas de forma estática.
- Contenido centralizado en `messages/es.json`.
- Once Client Components con responsabilidades acotadas.

**Mensaje del presentador**

Tres límites gestionan interacción y foco: audiencia del hero, navegación móvil y newsletter. Ocho secciones usan `IntersectionObserver` para revelados progresivos y respetan movimiento reducido. El contenido principal, la metadata, JSON-LD, sitemap y robots se generan durante el build. El foco del skip link se resuelve con un destino `main` nativo y `tabindex="-1"`, sin añadir otro límite cliente.

## 7. Accesibilidad, privacidad, no-JS y SEO

**En pantalla**

- Landmarks, un H1, jerarquía de headings, foco visible y objetivos táctiles.
- Skip links con destino de foco correcto en inicio y aviso legal.
- Newsletter con etiqueta, ayuda, errores y estado de éxito enfocado.
- Sin analítica, cookies, almacenamiento, logs ni peticiones de newsletter.
- Canonical, Open Graph/Twitter, JSON-LD, sitemap y robots.

**Demostración**

1. Activar “Saltar al contenido” y comprobar el foco en `main`.
2. Mostrar el botón visible “Quiero recibir la selección mensual”.
3. Completar la demostración y mostrar el foco en el estado de éxito.
4. Reiniciar y comprobar que el foco vuelve al campo vacío.

**Mensaje del presentador**

Sin JavaScript no existe un formulario nativo, una acción ni un campo serializable. Con JavaScript, el correo permanece solo en memoria y no genera peticiones, almacenamiento, cookies ni logs.

## 8. Evidencia local verificada

**En pantalla**

| Verificación local — 17 de septiembre de 2026 | Resultado observado |
|---|---|
| `pnpm lint` | Correcto, sin advertencias. |
| `pnpm typecheck` | Correcto. |
| `git diff --check` | Correcto, sin errores de espacios. |
| `SITE_URL=https://example.com pnpm build` | Correcto; rutas estáticas generadas. |
| `pnpm check:newsletter-nojs` | Correcto. |
| Chromium dirigido | Foco, copy, privacidad, responsive, movimiento reducido y consola correctos. |
| Lighthouse 13.4.1 móvil local | Rendimiento 99 · Accesibilidad 100 · SEO 100. |

**Mensaje del presentador**

La ejecución local de Lighthouse registró FCP 0,8 s, LCP 2,2 s, TBT 10 ms y CLS 0. Es evidencia del build servido localmente, no del despliegue final.

## 9. Presupuesto JavaScript: estado honesto

**En pantalla**

- Ocho scripts iniciales únicos en la home.
- `187.914` bytes gzip en total: **183,5 KiB**.
- Objetivo interno de 100 KB: **no cumplido**.

**Mensaje del presentador**

La cifra se obtuvo desde el HTML construido, deduplicando URLs y comprimiendo una vez cada archivo local con gzip nivel 9. No representa transferencia de producción: el hosting, la compresión y la caché deben medirse en la URL publicada. El buen Lighthouse local no convierte este presupuesto en aprobado.

## 10. Fuentes, licencias y uso de IA

**En pantalla**

- Doce SVG oficiales de identidad conservados sin cambios.
- Copias de producción y transformaciones registradas en el README.
- Sora bajo SIL Open Font License 1.1.
- Sin fotografía de stock, retratos generados ni paquete externo de iconos.
- IA utilizada como apoyo, con revisión humana obligatoria.

**Mensaje del presentador**

La implementación no atribuye testimonios, personas, empresas, métricas, datos legales ni resultados inventados. Cualquier fotografía futura deberá registrar autoría, URL original, términos, fecha de acceso y transformaciones. La declaración de IA está documentada en el README.

## 11. Demostración en vivo y entrega

**Recorrido de demostración**

1. Hero y selector de audiencia.
2. Secciones de talento, empresas, torneos y networking.
3. Cuatro reservas de foto y perfil en testimonios.
4. Newsletter: validación, éxito, reinicio y privacidad.
5. Navegación móvil, teclado y movimiento reducido.
6. Metadata, sitemap, robots y aviso legal provisional.

**Pendiente externo antes de entregar**

- Subir el historial revisado y hacer público <https://github.com/DH-Multimedios/techtojob>; el repositorio permanece privado de forma intencional hasta después del push.
- Confirmar el origen de producción, configurar `SITE_URL` y registrar la URL desplegada.
- Capturar la versión desplegada en escritorio y móvil.
- Ejecutar Lighthouse móvil sobre la URL desplegada y conservar su captura.
- Completar pruebas en dispositivo físico, lector de pantalla y zoom/reflow.
- Incorporar datos legales oficiales, testimonios autorizados y contenido editorial final cuando estén disponibles.

**Mensaje del presentador**

No mostrar como evidencia de producción una captura local, una URL de ejemplo ni una puntuación anterior al despliegue. El README y las pruebas locales ya están preparados; visibilidad, URL y capturas dependen de la publicación controlada por la persona propietaria.

## 12. Cierre

**En pantalla**

- **Haz que te conozcan por lo que sabes construir.**
- **Entrar a la comunidad en Discord**
- <https://discord.gg/h9FFgKdkRd>

**Mensaje del presentador**

Cerrar con la misma acción que estructura toda la experiencia: participar, compartir trabajo y generar contexto dentro de la comunidad, sin prometer empleo ni resultados.
