<template>
  <div class="home">

    <!-- ── Header ─────────────────────────── -->
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <svg class="sw-logo" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg" aria-label="Star Wars">
            <text
              x="50%"
              y="78"
              text-anchor="middle"
              font-family="'Orbitron', sans-serif"
              font-size="72"
              font-weight="900"
              letter-spacing="8"
              fill="#fbbf24"
            >STAR WARS</text>
          </svg>
          <span class="logo-sub">Sistema de Monitoreo Climático — Galaxia Muy, Muy Lejana</span>
        </div>
        <div class="header-right">
          <span class="live-badge">◉ EN VIVO</span>
          <span class="unit-toggle-label">Unidad:</span>
          <button class="unit-btn" :class="{ active: unit === 'C' }" @click="unit = 'C'">°C</button>
          <button class="unit-btn" :class="{ active: unit === 'F' }" @click="unit = 'F'">°F</button>
        </div>
      </div>
    </header>

    <!-- ── Buscador ───────────────────────── -->
    <section class="search-section">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          class="search-input"
          type="text"
          placeholder="Buscar planeta..."
          @keyup.enter="handleSearch"
        />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</button>
      </div>
      <div class="filter-chips">
        <button
          v-for="clima in climaTypes"
          :key="clima.value"
          class="chip"
          :class="{ active: selectedClima === clima.value }"
          @click="toggleClima(clima.value)"
        >
          {{ clima.icon }} {{ clima.label }}
        </button>
      </div>
    </section>

    <!-- ── Resultados ─────────────────────── -->
    <main class="planets-grid">
      <p v-if="filteredPlanets.length === 0" class="no-results">
        🚫 No se encontró ningún planeta con esos criterios, joven Padawan.
      </p>

      <div
        v-for="(planet, index) in filteredPlanets"
        :key="planet.id"
        class="planet-card"
        :style="{ '--accent': planet.accentColor, '--delay': index * 0.07 + 's' }"
        @click="goToDetail(planet.id)"
      >
        <div class="card-glow"></div>

        <div class="card-image-wrap">
          <img v-if="planet.image" :src="planet.image" :alt="planet.name" class="card-image" />
          <div class="card-image-overlay"></div>
          <span class="card-image-icon">{{ planet.icon }}</span>
        </div>

        <div class="card-top">
          <div class="card-badges">
            <span class="badge-climate">{{ planet.climate }}</span>
          </div>
        </div>

        <h2 class="planet-name">{{ planet.name }}</h2>
        <p class="planet-terrain">{{ planet.terrain }}</p>

        <div class="card-temp">
          <span class="temp-main">{{ displayTemp(planet.currentTemp) }}</span>
          <div class="temp-range">
            <span class="temp-hi">↑ {{ displayTemp(planet.forecast[0].tempMax) }}</span>
            <span class="temp-lo">↓ {{ displayTemp(planet.forecast[0].tempMin) }}</span>
          </div>
        </div>

        <div class="card-stats">
          <div class="stat"><span class="stat-icon">💧</span><span>{{ planet.humidity }}%</span></div>
          <div class="stat"><span class="stat-icon">💨</span><span>{{ planet.windSpeed }} km/h</span></div>
          <div class="stat"><span class="stat-icon">🌊</span><span>{{ planet.surfaceWater }}%</span></div>
        </div>

        <div class="card-forecast">
          <div v-for="day in planet.forecast.slice(0, 4)" :key="day.day" class="forecast-mini">
            <span class="fday">{{ day.day.slice(0,3) }}</span>
            <span class="ficon">{{ day.icon }}</span>
            <span class="ftemp">{{ displayTemp(day.tempMax) }}</span>
          </div>
        </div>

        <div class="card-footer">
          <span class="detail-link">Ver detalle →</span>
        </div>
      </div>

      <!-- ── Card Resumen Galáctico ──────────── -->
      <div class="planet-card special-card summary-card">
        <div class="card-glow"></div>
        <div class="card-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80"
            alt="Galaxia"
            class="card-image"
          />
          <div class="card-image-overlay"></div>
          <span class="card-image-icon">🌌</span>
        </div>
        <div class="special-header">
          <span class="special-icon">🌌</span>
          <span class="special-title gold">Resumen Galáctico</span>
        </div>
        <div class="special-divider"></div>
        <div class="special-body">
          <div class="summary-row">
            <span class="summary-label">🔥 Más caliente</span>
            <span class="summary-val hot">{{ galacticSummary.hottest.name }} · {{ displayTemp(galacticSummary.hottest.currentTemp) }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">🧊 Más frío</span>
            <span class="summary-val cold">{{ galacticSummary.coldest.name }} · {{ displayTemp(galacticSummary.coldest.currentTemp) }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">💧 Más húmedo</span>
            <span class="summary-val green">{{ galacticSummary.humidest.name }} · {{ galacticSummary.humidest.humidity }}%</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">🌡️ Promedio galáctico</span>
            <span class="summary-val gold">{{ displayTemp(galacticSummary.avg) }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">💨 Viento máx.</span>
            <span class="summary-val muted">{{ galacticSummary.windiest.name }} · {{ galacticSummary.windiest.windSpeed }} km/h</span>
          </div>
        </div>
      </div>

      <!-- ── Card Alertas Climáticas ────────── -->
      <div class="planet-card special-card alert-card">
        <div class="card-glow"></div>
        <div class="card-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80"
            alt="Espacio"
            class="card-image"
          />
          <div class="card-image-overlay"></div>
          <span class="card-image-icon">⚠️</span>
        </div>
        <div class="special-header">
          <span class="special-icon">⚠️</span>
          <span class="special-title red">Alertas Climáticas</span>
        </div>
        <div class="special-divider"></div>
        <div class="special-body">
          <p v-if="climateAlerts.length === 0" class="no-alerts">
            ✅ Sin condiciones extremas hoy
          </p>
          <div v-for="alert in climateAlerts" :key="alert.planet.id" class="alert-row">
            <span class="alert-planet">{{ alert.planet.icon }} {{ alert.planet.name }}</span>
            <span
              class="alert-tag"
              :class="{
                'tag-danger': ['lava','erupción','tóxico','ígnea'].some(w => alert.condition.toLowerCase().includes(w)),
                'tag-ice':    ['ventisca','polar','ártico'].some(w => alert.condition.toLowerCase().includes(w)),
                'tag-warn':   !['lava','erupción','tóxico','ígnea','ventisca','polar','ártico'].some(w => alert.condition.toLowerCase().includes(w))
              }"
            >{{ alert.condition }}</span>
          </div>
        </div>
      </div>

    </main>

    <footer class="footer">
      <p>May the Force — and good weather — be with you ✦ Galactic Weather {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script>
import { planets } from '../data/planets.js'

export default {
  name: 'HomeView',
  data() {
    return {
      planets,
      searchQuery: '',
      selectedClima: '',
      unit: 'C',
      climaTypes: [
        { value: '',          icon: '🌐', label: 'Todos' },
        { value: 'arid',      icon: '☀️',  label: 'Árido' },
        { value: 'frozen',    icon: '❄️',  label: 'Helado' },
        { value: 'murky',     icon: '🌫️', label: 'Pantanoso' },
        { value: 'temperate', icon: '🌤️', label: 'Templado' },
        { value: 'hot',       icon: '🔥', label: 'Caliente' },
        { value: 'tropical',  icon: '🌴', label: 'Tropical' },
      ]
    }
  },
  computed: {
    filteredPlanets() {
      return this.planets.filter(p => {
        const matchName  = p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchClima = this.selectedClima === '' || p.climate === this.selectedClima
        return matchName && matchClima
      })
    },
    galacticSummary() {
      const hottest  = [...this.planets].sort((a, b) => b.currentTemp - a.currentTemp)[0]
      const coldest  = [...this.planets].sort((a, b) => a.currentTemp - b.currentTemp)[0]
      const humidest = [...this.planets].sort((a, b) => b.humidity - a.humidity)[0]
      const windiest = [...this.planets].sort((a, b) => b.windSpeed - a.windSpeed)[0]
      const avg = Math.round(this.planets.reduce((s, p) => s + p.currentTemp, 0) / this.planets.length)
      return { hottest, coldest, humidest, windiest, avg }
    },
    climateAlerts() {
      const dangerous = ['tormenta', 'ventisca', 'erupción', 'lluvia', 'ciclón', 'gases', 'ígnea']
      return this.planets
        .map(p => ({ planet: p, condition: p.forecast[0].condition }))
        .filter(({ condition }) =>
          dangerous.some(d => condition.toLowerCase().includes(d))
        )
        .slice(0, 5)
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'planeta', params: { id } })
    },
    toggleClima(value) {
      this.selectedClima = this.selectedClima === value ? '' : value
    },
    handleSearch() {},
    displayTemp(celsius) {
      if (this.unit === 'C') return `${celsius}°C`
      return `${Math.round(celsius * 9/5 + 32)}°F`
    }
  }
}
</script>

<style scoped>
.home {
  position: relative;
  z-index: 1;
  padding-bottom: 3rem;
}

/* ── Header ─────────────────────────────────── */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(2, 4, 10, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(251,191,36,0.2);
}
.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.logo {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.sw-logo {
  width: 260px;
  height: 44px;
  filter: drop-shadow(0 0 12px rgba(251,191,36,0.5));
}
.logo-sub {
  font-size: 0.62rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.live-badge {
  font-size: 0.65rem;
  color: #4ade80;
  letter-spacing: 0.12em;
  margin-right: 0.75rem;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.unit-toggle-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.unit-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-family: 'Orbitron', sans-serif;
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.unit-btn.active {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
}

/* ── Search ──────────────────────────────────── */
.search-section {
  max-width: 1400px;
  margin: 2rem auto 0;
  padding: 0 2rem;
}
.search-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  transition: border-color 0.3s;
}
.search-wrapper:focus-within {
  border-color: rgba(251,191,36,0.5);
  box-shadow: 0 0 20px rgba(251,191,36,0.08);
}
.search-icon { font-size: 1rem; }
.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-main);
  font-family: 'Exo 2', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
}
.search-input::placeholder { color: var(--text-muted); }
.clear-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.2s;
}
.clear-btn:hover { color: var(--text-main); }

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.chip {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-family: 'Exo 2', sans-serif;
  font-size: 0.75rem;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s;
}
.chip:hover { border-color: rgba(255,255,255,0.2); color: var(--text-main); }
.chip.active {
  background: rgba(251,191,36,0.15);
  border-color: var(--gold);
  color: var(--gold);
}

/* ── Grid ────────────────────────────────────── */
.planets-grid {
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--text-muted);
  padding: 3rem;
  font-size: 1rem;
}

/* ── Planet Card ─────────────────────────────── */
.planet-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  animation: cardIn 0.5s ease both;
  animation-delay: var(--delay, 0s);
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.planet-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 20px color-mix(in srgb, var(--accent) 20%, transparent);
}
.card-glow {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.3s;
}
.planet-card:hover .card-glow { opacity: 1; }

/* ── Card Image ──────────────────────────────── */
.card-image-wrap {
  position: relative;
  width: calc(100% + 3rem);
  margin: -1.5rem -1.5rem 1rem -1.5rem;
  height: 150px;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  filter: saturate(0.75) brightness(0.7);
}
.planet-card:hover .card-image {
  transform: scale(1.08);
}
.card-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(2,4,10,0.1) 0%, rgba(2,4,10,0.85) 100%);
}
.card-image-icon {
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
  font-size: 2rem;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.8));
}
.card-top {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}
.badge-climate {
  font-size: 0.65rem;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
}
.planet-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.2rem;
}
.planet-terrain {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  text-transform: capitalize;
}
.card-temp {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
}
.temp-main {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--accent);
  line-height: 1;
}
.temp-range { display: flex; flex-direction: column; gap: 0.15rem; }
.temp-hi { font-size: 0.75rem; color: #f87171; }
.temp-lo { font-size: 0.75rem; color: #7dd3fc; }
.card-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
}
.stat { display: flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; color: var(--text-muted); }
.stat-icon { font-size: 0.85rem; }
.card-forecast {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.forecast-mini {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.4rem 0;
  border-radius: 6px;
  background: rgba(255,255,255,0.03);
}
.fday  { font-size: 0.6rem; color: var(--text-muted); }
.ficon { font-size: 1rem; }
.ftemp { font-size: 0.65rem; color: var(--text-main); font-family: 'Orbitron', sans-serif; }
.card-footer { text-align: right; }
.detail-link {
  font-size: 0.75rem;
  color: var(--accent);
  opacity: 0.7;
  transition: opacity 0.2s;
}
.planet-card:hover .detail-link { opacity: 1; }

/* ── Cards Especiales ────────────────────────── */
.special-card { cursor: default; }
.special-card.summary-card { border-color: rgba(251, 191, 36, 0.35); }
.special-card.summary-card:hover {
  border-color: rgba(251, 191, 36, 0.7);
  transform: translateY(-4px);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(251,191,36,0.15);
}
.special-card.alert-card { border-color: rgba(239, 68, 68, 0.35); }
.special-card.alert-card:hover {
  border-color: rgba(239, 68, 68, 0.7);
  transform: translateY(-4px);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(239,68,68,0.15);
}
.special-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
}
.special-icon { font-size: 1.3rem; }
.special-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.special-title.gold { color: #fbbf24; }
.special-title.red  { color: #f87171; }
.special-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 0 0 0.75rem;
}
.special-body { display: flex; flex-direction: column; gap: 0.1rem; }
.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.summary-row:last-child { border-bottom: none; }
.summary-label { font-size: 0.72rem; color: var(--text-muted); }
.summary-val { font-family: 'Orbitron', sans-serif; font-size: 0.68rem; font-weight: 700; }
.summary-val.hot   { color: #f87171; }
.summary-val.cold  { color: #7dd3fc; }
.summary-val.green { color: #4ade80; }
.summary-val.gold  { color: #fbbf24; }
.summary-val.muted { color: rgba(255, 255, 255, 0.5); }
.alert-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.alert-row:last-child { border-bottom: none; }
.alert-planet { font-size: 0.72rem; color: rgba(255, 255, 255, 0.55); }
.alert-tag {
  font-size: 0.62rem;
  padding: 0.2rem 0.55rem;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.03em;
}
.tag-danger { background: rgba(239, 68, 68, 0.2);   color: #fca5a5; }
.tag-ice    { background: rgba(125, 211, 252, 0.2);  color: #7dd3fc; }
.tag-warn   { background: rgba(251, 191, 36, 0.2);   color: #fde68a; }
.no-alerts  { font-size: 0.75rem; color: #4ade80; text-align: center; padding: 1rem 0; }

/* ── Footer ──────────────────────────────────── */
.footer {
  text-align: center;
  padding: 2rem;
  font-size: 0.7rem;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}
</style>