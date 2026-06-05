# 🌌 Galactic Weather – Star Wars Climate Monitor

## Descripción

Galactic Weather es una aplicación SPA (Single Page Application) desarrollada con Vue.js e inspirada en el universo Star Wars. La aplicación permite explorar distintos planetas de la galaxia, consultar sus condiciones climáticas y visualizar información detallada mediante una interfaz temática con diseño espacial.

El proyecto fue desarrollado como parte del Módulo 6 de Desarrollo de Interfaces Interactivas con Vue.js.

---

## Características principales

- Aplicación SPA desarrollada con Vue.js.
- Navegación mediante Vue Router.
- Listado de planetas con información climática.
- Búsqueda dinámica de planetas.
- Vista de detalle por planeta.
- Pronóstico semanal.
- Resumen galáctico.
- Alertas climáticas.
- Fondo espacial animado.
- Interfaz inspirada en la estética de Star Wars.

---

## Vistas principales

### Home (`/`)

La vista principal muestra:

- Listado de planetas.
- Información climática actual.
- Buscador de planetas.
- Filtros de visualización.
- Resumen galáctico.
- Alertas climáticas.

### Detalle de Planeta (`/planeta/:id`)

La vista de detalle permite visualizar:

- Información general del planeta.
- Temperatura actual.
- Pronóstico semanal.
- Estadísticas climáticas.
- Navegación de regreso a la página principal.

---

## Rutas configuradas

| Ruta | Descripción |
|--------|-------------|
| `/` | Página principal con el listado de planetas |
| `/planeta/:id` | Vista de detalle para un planeta específico |

La navegación se realiza mediante Vue Router sin recargar la página.

---

## Tecnologías utilizadas

- Vue.js 3
- Vue Router
- Vite
- JavaScript
- CSS

---

## Estructura del proyecto

```text
src/
├── components/
│   └── StarBackground.vue
├── data/
│   └── planets.js
├── router/
│   └── index.js
├── styles/
│   └── global.css
├── views/
│   ├── HomeView.vue
│   └── PlanetDetail.vue
├── App.vue
└── main.js
```

### Componentes principales

- **App.vue:** componente raíz de la aplicación.
- **StarBackground.vue:** fondo espacial animado.
- **HomeView.vue:** vista principal con listado de planetas y filtros.
- **PlanetDetail.vue:** vista de detalle y pronóstico.
- **router/index.js:** configuración de rutas.
- **planets.js:** datos utilizados por la aplicación.


## Funcionalidades de Vue utilizadas

- Interpolación de datos con `{{ }}`.
- Renderizado de listas mediante `v-for`.
- Renderizado condicional con `v-if` y `v-show`.
- Enlace bidireccional con `v-model`.
- Manejo de eventos con `@click`.
- Eventos de teclado con `@keyup.enter`.
- Componentes reutilizables.
- Rutas dinámicas mediante parámetros (`/planeta/:id`).

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos

- Node.js 18+
- npm 9+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Paula-front/star-wars-galactic-weather.git

# 2. Ingresar a la carpeta del proyecto
cd star-wars-galactic-weather

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev
```

Abrir en el navegador:

```text
http://localhost:5173
```

### Build para producción

```bash
npm run build
npm run preview
```

---

## Repositorio GitHub

El código fuente del proyecto se encuentra disponible en:

https://github.com/Paula-front/star-wars-galactic-weather

---

## Autor

Paula Front

Proyecto desarrollado para el **Módulo 6 – Desarrollo de Interfaces Interactivas con Vue.js**.

May the Force — and good weather — be with you ✦
