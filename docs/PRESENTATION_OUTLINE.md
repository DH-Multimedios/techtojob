# Guion de presentación — TechToJob V1

> Objetivo: presentar una decisión de producto respaldada por la implementación y por evidencia verificable de producción. Sitio en vivo: <https://techtojob-xi.vercel.app/>. Repositorio público: <https://github.com/DH-Multimedios/techtojob>.

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

La dirección visual nace de la identidad de TechToJob. La auditoría de producción no detectó desbordamiento horizontal en viewports de 390 × 844, 768 × 1024 ni 1440 × 1000 píxeles CSS. `prefers-reduced-motion` elimina el desplazamiento suave y las animaciones ambientales y de revelado.

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

## 8. Evidencia de producción verificada

**En pantalla**

| Auditoría de producción — 18 de septiembre de 2026 UTC | Resultado observado |
|---|---|
| URL desplegada | <https://techtojob-xi.vercel.app/> |
| Repositorio público | <https://github.com/DH-Multimedios/techtojob> |
| Lighthouse 13.4.1 móvil | Rendimiento 98 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100. |
| Métricas principales | FCP 1,0 s · LCP 2,0 s · Speed Index 3,8 s · TBT 42 ms (40 ms mostrado) · CLS 0 · TTI 2,0 s · respuesta del servidor 58 ms. |
| Responsive | Correcto en 1440 × 1000, 768 × 1024 y 390 × 844 píxeles CSS, sin desbordamiento horizontal. |
| Interacción y privacidad | Teclado, foco, newsletter sin JavaScript, reservas testimoniales y movimiento reducido correctos. |
| Consola y red aisladas | Sin errores, advertencias, peticiones fallidas ni respuestas HTTP ≥ 400. |

**Capturas conservadas**

- [Producción en escritorio](evidence/production-2026-09-17/desktop.png)
- [Producción en móvil](evidence/production-2026-09-17/mobile.png)
- [Resumen Lighthouse móvil](evidence/production-2026-09-17/lighthouse-mobile.png)
- [Registro completo de evidencia](evidence/production-2026-09-17/README.md)

**Mensaje del presentador**

Estos resultados corresponden a la URL desplegada, no al servidor local. La auditoría tuvo resultado **aprobado con observaciones no bloqueantes**. LinkedIn respondió con estado 999 por protección frente a automatización, lo que no demuestra un destino roto. Dos textos auxiliares calcularon aproximadamente 11,5156 píxeles CSS; Lighthouse obtuvo 100 en accesibilidad y no se demostró un bloqueo normativo, pero la legibilidad aún debe validarse en un dispositivo físico.

## 9. Presupuesto JavaScript: estado honesto

**En pantalla**

- Ocho scripts iniciales únicos en la home.
- `187.914` bytes gzip en total: **183,5 KiB**.
- Objetivo interno de 100 KB: **no cumplido**.

**Mensaje del presentador**

La cifra se obtuvo localmente desde el HTML construido, deduplicando URLs y comprimiendo una vez cada archivo con gzip nivel 9. No representa transferencia de producción: el hosting, la compresión y la caché requieren una medición específica. El resultado Lighthouse de producción no convierte este presupuesto interno en aprobado.

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

**Enlaces de entrega**

- Sitio en vivo: <https://techtojob-xi.vercel.app/>
- Repositorio público: <https://github.com/DH-Multimedios/techtojob>
- Evidencia: [escritorio](evidence/production-2026-09-17/desktop.png), [móvil](evidence/production-2026-09-17/mobile.png) y [Lighthouse](evidence/production-2026-09-17/lighthouse-mobile.png).

**Recorrido de demostración**

1. Hero y selector de audiencia.
2. Secciones de talento, empresas, torneos y networking.
3. Cuatro reservas de foto y perfil en testimonios.
4. Newsletter: validación, éxito, reinicio y privacidad.
5. Navegación móvil, teclado y movimiento reducido.
6. Metadata, sitemap, robots y aviso legal provisional.

**Estado de entrega**

- Sitio desplegado y accesible mediante HTTPS.
- Repositorio público disponible.
- Capturas de escritorio y móvil conservadas en el repositorio.
- Lighthouse móvil de producción conservado con puntuaciones 98/100/100/100.

**Acciones externas restantes**

- Completar pruebas en dispositivo físico, lector de pantalla y zoom/reflow al 200 %.
- Incorporar datos oficiales del titular legal.
- Sustituir las reservas provisionales por testimonios reales, autorizados y verificables.
- Aprobar las fechas y los destinos finales de noticias.

**Mensaje del presentador**

Abrir la URL en vivo y recorrer el producto en el orden indicado. Si la red del recinto no está disponible, utilizar las capturas conservadas como respaldo y aclarar que pertenecen a la auditoría de producción. No presentar las mediciones locales —Lighthouse 99/100/100, FCP 0,8 s, LCP 2,2 s, TBT 10 ms y CLS 0— como resultados del despliegue; se mantienen únicamente como evidencia de desarrollo.

## 12. Cierre

**En pantalla**

- **Haz que te conozcan por lo que sabes construir.**
- **Entrar a la comunidad en Discord**
- <https://discord.gg/h9FFgKdkRd>

**Mensaje del presentador**

Cerrar con la misma acción que estructura toda la experiencia: participar, compartir trabajo y generar contexto dentro de la comunidad, sin prometer empleo ni resultados.
