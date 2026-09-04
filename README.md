# CATALOG

Aplicación web de catálogo de productos desarrollada con React y TypeScript.

El proyecto está orientado a ofrecer una experiencia de exploración visual de productos, permitiendo consultar categorías, colecciones, materiales, colores, ofertas, productos destacados y detalles individuales de cada producto.

La arquitectura está organizada por funcionalidades para mantener una base de código clara, escalable y fácil de mantener.

<p align="center">
  <img
    src="https://raw.githubusercontent.com/JJuan777/CATALOG_APP/main/public/presCATALOG.gif"
    alt="Vista previa de CATALOG"
    width="100%"
  />
</p>

---

## Descripción

CATALOG es una aplicación frontend que consume una API REST para mostrar un catálogo de productos.

Entre sus principales funcionalidades se encuentran:

* Consulta paginada de productos.
* Búsqueda por texto.
* Filtros por categoría, colección, etiqueta, material y color.
* Filtros por rango de precio.
* Productos destacados.
* Productos en oferta.
* Ordenamiento del catálogo.
* Vista detallada de producto.
* Galería de imágenes.
* Visualización ampliada mediante lightbox.
* Productos relacionados.
* Gestión local de favoritos.
* Compartir productos mediante:

  * WhatsApp.
  * Facebook.
  * X.
  * Portapapeles.
  * API nativa de compartir del dispositivo.
* Tema claro y oscuro.
* Diseño responsive.

### Repositorio del backend

La API REST utilizada por esta aplicación se encuentra en un repositorio independiente:

[CATALOG_API](https://github.com/JJuan777/CATALOG_API)

Este repositorio contiene la lógica del backend, endpoints y servicios utilizados por el frontend de CATALOG.

---

## Tecnologías principales

El proyecto utiliza principalmente:

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Lucide React
* React Icons
* Yet Another React Lightbox
* Fontsource

La comunicación con el backend se realiza mediante `fetch`, utilizando una capa HTTP propia para centralizar el manejo de solicitudes y errores.

---

## Requisitos

Para ejecutar el proyecto localmente se recomienda contar con:

* Node.js
* npm

También es necesario disponer de una instancia funcional del backend correspondiente al catálogo.

---

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

Crear o configurar el archivo `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

La variable `VITE_API_URL` define la URL base de la API consumida por la aplicación.

---

## Ejecución en desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en consola la URL local disponible para acceder a la aplicación.

---

## Compilación

Generar la versión de producción:

```bash
npm run build
```

Los archivos generados estarán disponibles en:

```text
dist/
```

Para validar localmente el resultado de producción:

```bash
npm run preview
```

---

## Estructura del proyecto

La aplicación está organizada principalmente por funcionalidades.

```text
src/
├── app/
│   ├── providers/
│   │   └── AppProviders.tsx
│   ├── router/
│   │   ├── AppRouter.tsx
│   │   └── routes.ts
│   └── App.tsx
│
├── assets/
│
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx
│   │   └── Topbar.tsx
│   └── ui/
│
├── config/
│   └── env.ts
│
├── features/
│   ├── catalogo/
│   │   ├── api/
│   │   │   └── catalogo.api.ts
│   │   ├── components/
│   │   │   ├── detalle/
│   │   │   ├── filters/
│   │   │   ├── CatalogoCard.tsx
│   │   │   ├── CatalogoEmpty.tsx
│   │   │   ├── CatalogoError.tsx
│   │   │   ├── CatalogoGrid.tsx
│   │   │   ├── CatalogoSkeleton.tsx
│   │   │   └── CatalogoToolbar.tsx
│   │   ├── constants/
│   │   │   └── catalogo.constants.ts
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│   │
│   └── favoritos/
│       ├── constants/
│       ├── context/
│       ├── hooks/
│       ├── services/
│       └── types/
│
├── hooks/
│   └── useTheme.ts
│
├── lib/
│   └── http/
│       ├── httpClient.ts
│       └── httpError.ts
│
├── styles/
│   └── index.css
│
├── utils/
│   └── formatters.ts
│
├── main.tsx
└── vite-env.d.ts
```

---

## Arquitectura

### `app`

Contiene la configuración general de la aplicación.

Aquí se encuentran:

* Router principal.
* Definición centralizada de rutas.
* Providers globales.
* Componente raíz.

Las rutas no deben escribirse directamente en distintos componentes cuando exista una definición dentro de:

```text
src/app/router/routes.ts
```

Esto permite evitar duplicación y facilita futuros cambios de navegación.

---

### `features`

Contiene las funcionalidades principales de la aplicación.

Cada funcionalidad mantiene sus propios:

* Componentes.
* Hooks.
* Tipos.
* Servicios.
* Utilidades.
* Constantes.
* Acceso a API.

Actualmente existen las funcionalidades principales:

```text
catalogo
favoritos
```

Esta organización permite mantener las responsabilidades aisladas y reducir dependencias innecesarias entre módulos.

---

## Catálogo

La funcionalidad de catálogo se encuentra en:

```text
src/features/catalogo/
```

Incluye la lógica relacionada con:

* Consulta de productos.
* Opciones de filtros.
* Paginación.
* Búsqueda.
* Ordenamiento.
* Detalle de producto.
* Galería.
* Ofertas.
* Productos relacionados.
* Compartir productos.

---

## Favoritos

La gestión de favoritos se encuentra en:

```text
src/features/favoritos/
```

Los favoritos se mantienen localmente en el navegador.

La funcionalidad utiliza:

* Context API.
* Provider.
* Hook personalizado.
* Persistencia mediante almacenamiento local.

Actualmente no requiere una librería adicional de administración de estado global.

---

## Capa HTTP

La comunicación HTTP se centraliza en:

```text
src/lib/http/
```

### `httpClient.ts`

Responsable de:

* Construcción de URLs.
* Ejecución de solicitudes.
* Manejo de JSON.
* Manejo de distintos tipos de body.
* Procesamiento de respuestas.
* Manejo de errores HTTP.
* Soporte para `AbortSignal`.

### `httpError.ts`

Define el error HTTP utilizado por la aplicación.

Esto permite separar la infraestructura HTTP de la lógica específica de cada funcionalidad.

Por ejemplo:

```text
httpClient
    ↓
catalogo.api.ts
    ↓
hooks
    ↓
components / pages
```

---

## Configuración de entorno

La configuración se centraliza en:

```text
src/config/env.ts
```

La aplicación obtiene la URL de la API mediante:

```env
VITE_API_URL
```

Ejemplo:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

No se recomienda acceder directamente a `import.meta.env` desde componentes o funcionalidades.

La configuración debe consumirse mediante el módulo central de entorno.

---

## Rutas

Las rutas se encuentran centralizadas en:

```text
src/app/router/routes.ts
```

Rutas principales:

```text
/
 /catalogo
 /catalogo/productos/:slug
```

El detalle de producto utiliza el `slug` como identificador público dentro de la URL.

Ejemplo:

```text
/catalogo/productos/silla-moderna
```

---

## Flujo de datos

El flujo principal sigue esta estructura:

```text
API REST
   ↓
httpClient
   ↓
API de la funcionalidad
   ↓
Hook
   ↓
Página / Componente
   ↓
Interfaz de usuario
```

Ejemplo para productos:

```text
Backend
   ↓
obtenerProductosCatalogo()
   ↓
useCatalogo()
   ↓
CatalogoPage
   ↓
CatalogoGrid
   ↓
CatalogoCard
```

Este enfoque evita que los componentes visuales realicen directamente solicitudes HTTP.

---

## Filtros

Los filtros disponibles actualmente incluyen:

* Búsqueda.
* Categorías.
* Colecciones.
* Etiquetas.
* Materiales.
* Colores.
* Producto destacado.
* Producto en oferta.
* Precio mínimo.
* Precio máximo.
* Ordenamiento.

Los filtros principales se gestionan desde `CatalogoPage`, mientras que el panel mantiene un estado temporal antes de aplicar los cambios.

Esto permite modificar varios filtros sin ejecutar una nueva solicitud hasta que el usuario confirme la selección.

---

## Paginación

El catálogo utiliza paginación proporcionada por el backend.

La respuesta esperada incluye información similar a:

```ts
{
  total_registros: number;
  total_paginas: number;
  pagina_actual: number;
  registros_por_pagina: number;
  siguiente: string | null;
  anterior: string | null;
}
```

Las páginas adicionales se agregan al listado actual evitando productos duplicados mediante su identificador.

---

## Detalle de producto

La vista de detalle incluye:

* Información general.
* Código.
* Categoría.
* Colección.
* Etiquetas.
* Material.
* Color.
* Dimensiones.
* Peso.
* Precio.
* Oferta vigente.
* Descripción.
* Galería de imágenes.
* Lightbox.
* Favoritos.
* Compartir.
* Productos relacionados.

Ruta:

```text
/catalogo/productos/:slug
```

---

## Precios y ofertas

Los valores monetarios enviados por el backend se reciben como cadenas para conservar precisión.

La lógica de presentación se centraliza mediante utilidades compartidas.

Por ejemplo:

```text
src/utils/formatters.ts
src/features/catalogo/utils/producto.utils.ts
```

Los componentes no deben duplicar lógica para:

* Convertir precios.
* Determinar precio actual.
* Determinar precio anterior.
* Identificar ofertas vigentes.
* Formatear moneda.
* Formatear porcentajes.

---

## Compartir productos

El detalle de producto permite compartir mediante:

* WhatsApp.
* Facebook.
* X.
* Portapapeles.
* API `navigator.share` cuando está disponible.

La construcción de mensajes y enlaces está centralizada en:

```text
src/features/catalogo/utils/productoCompartir.utils.ts
```

La interacción se administra mediante:

```text
src/features/catalogo/hooks/useProductoCompartir.ts
```

---

## Tema claro y oscuro

La aplicación soporta tema:

```text
light
dark
```

La preferencia se almacena localmente en el navegador.

Cuando no existe una preferencia guardada se utiliza inicialmente la configuración del sistema operativo.

La lógica se encuentra en:

```text
src/hooks/useTheme.ts
```

---

## Manejo de estados

Las solicitudes de datos contemplan los siguientes estados:

* Cargando.
* Datos disponibles.
* Sin resultados.
* Error.
* Reintento.

Las solicitudes utilizan `AbortController` para cancelar operaciones anteriores cuando un componente se desmonta o cambian los parámetros de consulta.

Esto evita actualizaciones innecesarias sobre componentes que ya no están activos.

---

## Convenciones de desarrollo

### Componentes

Los componentes deben enfocarse principalmente en presentación e interacción.

La lógica relacionada con solicitudes, transformación de datos o persistencia debe mantenerse fuera de los componentes cuando tenga una responsabilidad propia.

---

### Hooks

Los hooks encapsulan lógica de estado y comportamiento reutilizable.

Ejemplos:

```text
useCatalogo
useCatalogoOptions
useProductoDetalle
useProductosRelacionados
useProductoCompartir
useFavoritos
useTheme
```

No se recomienda crear hooks genéricos únicamente para reducir unas pocas líneas de código si esto dificulta entender el flujo de cada funcionalidad.

---

### Tipos

Los tipos relacionados con el catálogo se encuentran centralizados en:

```text
src/features/catalogo/types/catalogo.types.ts
```

Se recomienda evitar:

```ts
any
```

cuando sea posible definir correctamente la estructura esperada.

---

### Utilidades

Las funciones de transformación que no requieren estado deben permanecer como funciones puras dentro de módulos de utilidades.

Ejemplos:

```text
formatters.ts
catalogo.utils.ts
producto.utils.ts
productoCompartir.utils.ts
```

---

### Imports

El proyecto utiliza el alias:

```text
@/
```

para referencias desde `src`.

Ejemplo:

```ts
import {
  appRoutes,
} from "@/app/router/routes";
```

Se recomienda utilizar el alias para dependencias externas a la funcionalidad actual y rutas relativas para archivos estrechamente relacionados dentro del mismo módulo.

---

## Manejo de errores

Los errores HTTP se representan mediante:

```text
HttpError
```

La capa HTTP proporciona manejo general de errores, mientras que cada funcionalidad puede transformar determinados códigos cuando necesita mostrar un mensaje específico.

Ejemplo:

```text
HTTP 404
    ↓
catalogo.api.ts
    ↓
mensaje específico del producto
    ↓
hook
    ↓
interfaz
```

---

## Diseño responsive

La interfaz está diseñada para funcionar en:

* Dispositivos móviles.
* Tabletas.
* Escritorio.

En dispositivos móviles se utilizan patrones como:

* Carruseles horizontales.
* Paneles inferiores.
* Controles adaptados a interacción táctil.
* Unidades dinámicas de viewport.

En pantallas mayores se utilizan:

* Grillas.
* Paneles más amplios.
* Navegación persistente.
* Distribuciones en múltiples columnas.

---

## Accesibilidad

La interfaz contempla diferentes prácticas de accesibilidad:

* Etiquetas `aria-label`.
* Estados `aria-current`.
* Estados `aria-pressed`.
* `aria-live` para mensajes dinámicos.
* Soporte para navegación mediante teclado.
* Indicadores visibles de foco.
* Cierre de modales mediante `Escape`.
* Control de foco dentro de diálogos.
* Recuperación del foco al cerrar modales.
* Texto alternativo para imágenes.

---

## Estado actual

Esta versión corresponde a la primera etapa funcional del proyecto.

Actualmente están implementados los principales flujos de navegación, consulta y visualización del catálogo.

La arquitectura busca mantener una base sencilla y extensible, evitando agregar dependencias o abstracciones que todavía no sean necesarias.

---

## Próximos pasos

Algunas mejoras que pueden incorporarse en futuras versiones son:

* Sincronización de favoritos con usuarios autenticados.
* Mejora de metadatos SEO por producto.
* Open Graph para compartir productos.
* Historial de navegación.
* Filtros reflejados en la URL.
* Optimización adicional de imágenes.
* Pruebas unitarias.
* Pruebas de integración.
* Pruebas end-to-end.
* Monitoreo de errores en producción.
* Analítica de navegación y productos.

---

## Principios del proyecto

La evolución del proyecto debe priorizar:

1. Código legible.
2. Responsabilidades claras.
3. Tipado consistente.
4. Reutilización cuando exista una necesidad real.
5. Separación entre infraestructura y funcionalidades.
6. Componentes visuales simples.
7. Accesibilidad.
8. Diseño responsive.
9. Manejo explícito de errores.
10. Evitar abstracciones prematuras.

---

## Licencia

Este proyecto es de uso privado.

La distribución, modificación o publicación deberá realizarse de acuerdo con las políticas definidas por el propietario del proyecto.
