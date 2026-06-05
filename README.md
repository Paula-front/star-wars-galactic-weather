# 🌌 Galactic Weather — Star Wars Climate Monitor

> Aplicación de clima de una sola página (SPA) construida con **Vue.js**, ambientada en la galaxia de Star Wars.  
> Módulo 6 — Bootcamp Frontend Trainee |

---

## 📖 Descripción

**Galactic Weather** es una aplicación web interactiva que muestra el clima actual y el pronóstico semanal de los 10 planetas más icónicos del universo Star Wars: Tatooine, Hoth, Dagobah, Naboo, Coruscant, Mustafar, Endor, Kamino, Bespin y Kashyyyk.

Los datos climáticos están generados de forma determinista a partir de las características reales de cada planeta obtenidas desde la API pública [SWAPI](https://swapi.info/api/planets), respetando la atmósfera y condiciones únicas de cada mundo.

La app tiene una estética 
"sci-fi oscura galáctica": fondo estelar animado, tipografía futurista (Orbitron + Exo 2), imágenes de ambientación por planeta, colores de acento únicos y animaciones de entrada suaves.

---

## 🗺️ Vistas principales

| Vista | Ruta | Descripción |
|---|---|---|
| **Home** | `/` | Listado de los 10 planetas con clima actual, imágenes, buscador, filtros y cards de resumen galáctico |
| **Detalle de Planeta** | `/planeta/:id` | Pronóstico de 7 días, estadísticas semanales y gráfico de temperaturas |

---

## 🛣️ Rutas configuradas (Vue Router)

```js
// src/router/index.js
const routes = [
  { path: '/',            name: 'home',    component: HomeView    },
  { path: '/planeta/:id', name: 'planeta', component: PlanetDetail }
]
```

- Se usa `createWebHashHistory()` para compatibilidad sin servidor.
- Navegación programática con `this.$router.push()` desde las cards.
- Enlace de retorno con `<router-link to="/">` en la vista de detalle.

---

## ✅ Requisitos del Módulo 6 cubiertos

| Requisito | Implementación |
|---|---|
| Vue como SPA | Componentes separados: `App.vue`, `HomeView.vue`, `PlanetDetail.vue`, `StarBackground.vue` |
| Directivas Vue | `{{ }}`, `v-for`, `v-if`, `v-show` en todas las vistas |
| `v-model` | Buscador de planetas con two-way binding reactivo |
| Eventos | `@click` en cards y botones, `@keyup.enter` en buscador |
| Vue Router | Ruta estática `/` y ruta dinámica `/planeta/:id` |
| Interacción extra | Toggle de unidades °C / °F y filtro por tipo de clima |
| `data()` | Estado local definido en cada componente |
| Git/GitHub | Commits descriptivos y repositorio público |

---

## 🏗️ Estructura del proyecto

```
star-wars-galactic-weather/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.js                  ← entrada, monta la app y carga estilos globales
    ├── App.vue                  ← componente raíz, limpio: solo StarBackground + router-view
    ├── styles/
    │   └── global.css           ← variables CSS, tipografía, reset y scrollbar
    ├── components/
    │   └── StarBackground.vue   ← fondo estelar animado (3 capas de estrellas)
    ├── router/
    │   └── index.js             ← configuración de Vue Router
    ├── data/
    │   └── planets.js           ← datos mock de los 10 planetas + funciones auxiliares
    └── views/
        ├── HomeView.vue         ← listado de planetas, buscador, filtros, toggle °C/°F, cards especiales
        └── PlanetDetail.vue     ← detalle, pronóstico 7 días, estadísticas, gráfico
```

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos
- Node.js 18+
- npm 9+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/star-wars-galactic-weather.git
cd star-wars-galactic-weather

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Build para producción

```bash
npm run build
npm run preview
```

---

## 🪐 Planetas incluidos

| Planeta | Clima | Temp. actual | Color de acento |
|---|---|---|---|
| ☀️ Tatooine | Árido | 58°C | Ámbar |
| 🧊 Hoth | Helado | -32°C | Azul hielo |
| 🌿 Dagobah | Pantanoso | 34°C | Verde |
| 🌸 Naboo | Templado | 22°C | Violeta |
| 🏙️ Coruscant | Templado | 18°C | Naranja |
| 🌋 Mustafar | Caliente | 155°C | Rojo |
| 🌲 Endor | Templado | 15°C | Verde claro |
| 🌊 Kamino | Oceánico | 19°C | Celeste |
| ☁️ Bespin | Gaseoso | 27°C | Dorado |
| 🌴 Kashyyyk | Tropical | 30°C | Lima |

---

## 🌌 Cards especiales

Además de los 10 planetas, la vista Home incluye dos cards especiales que completan el grid (4-4-4):

**Resumen Galáctico** — Calculado automáticamente desde los datos mock, muestra:
- Planeta más caliente y más frío
- Planeta más húmedo
- Temperatura promedio de toda la galaxia
- Planeta con mayor velocidad de viento

**Alertas Climáticas** — Lista en tiempo real los planetas con condiciones extremas del día (tormentas, ventiscas, erupciones, ciclones, etc.), con etiquetas codificadas por color según el nivel de peligro.

---

## 🔗 Repositorio

[https://github.com/TU_USUARIO/star-wars-galactic-weather](https://github.com/TU_USUARIO/star-wars-galactic-weather)

---

*May the Force — and good weather — be with you ✦*