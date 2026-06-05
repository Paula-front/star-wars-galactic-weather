<template>
  <div class="detail" v-if="planet" :style="{ '--accent': planet.accentColor }">

    <!-- ── Back nav ─────────────────────────── -->
    <nav class="back-nav">
      <router-link to="/" class="back-btn">
        ← Volver al mapa galáctico
      </router-link>
      <div class="nav-right">
        <span class="unit-toggle-label">Unidad:</span>
        <button class="unit-btn" :class="{ active: unit === 'C' }" @click="unit = 'C'">°C</button>
        <button class="unit-btn" :class="{ active: unit === 'F' }" @click="unit = 'F'">°F</button>
      </div>
    </nav>

    <!-- ── Hero ──────────────────────────────── -->
    <section class="hero">
      <div class="hero-bg" :style="{ background: `radial-gradient(ellipse at 70% 50%, color-mix(in srgb, ${planet.accentColor} 12%, transparent), transparent 70%)` }"></div>
      <div class="hero-content">
        <div class="hero-left">
          <span class="hero-climate-badge">{{ planet.climate }}</span>
          <h1 class="hero-name">{{ planet.name }}</h1>
          <p class="hero-terrain">{{ planet.terrain }}</p>
          <p class="hero-description">{{ planet.description }}</p>

          <div class="hero-meta-grid">
            <div class="meta-item">
              <span class="meta-label">Diámetro</span>
              <span class="meta-value">{{ planet.diameter.toLocaleString() }} km</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Gravedad</span>
              <span class="meta-value">{{ planet.gravity }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Agua superficial</span>
              <span class="meta-value">{{ planet.surfaceWater }}%</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Población</span>
              <span class="meta-value">{{ planet.population }}</span>
            </div>
          </div>
        </div>

        <div class="hero-right">
          <div class="current-weather">
            <div class="cw-icon">{{ planet.icon }}</div>
            <div class="cw-temp">{{ displayTemp(planet.currentTemp) }}</div>
            <div class="cw-label">Temperatura actual</div>
            <div class="cw-stats">
              <div class="cw-stat">
                <span>💧</span>
                <span>Humedad</span>
                <strong>{{ planet.humidity }}%</strong>
              </div>
              <div class="cw-stat">
                <span>💨</span>
                <span>Viento</span>
                <strong>{{ planet.windSpeed }} km/h {{ planet.windDirection }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Pronóstico 7 días ──────────────────── -->
    <section class="section">
      <h2 class="section-title">
        <span class="section-icon">📅</span>
        Pronóstico — 7 días galácticos
      </h2>
      <div class="forecast-grid">
        <div
          v-for="(day, i) in planet.forecast"
          :key="day.day"
          class="forecast-card"
          :class="{ today: i === 0 }"
          :style="{ '--delay': i * 0.08 + 's' }"
        >
          <div class="fc-day">{{ i === 0 ? 'HOY' : day.day }}</div>
          <div class="fc-icon">{{ day.icon }}</div>
          <div class="fc-condition">{{ day.condition }}</div>
          <div class="fc-temps">
            <span class="fc-max">{{ displayTemp(day.tempMax) }}</span>
            <span class="fc-sep">/</span>
            <span class="fc-min">{{ displayTemp(day.tempMin) }}</span>
          </div>
          <div class="fc-bar-wrap">
            <div class="fc-bar" :style="{ width: tempBarWidth(day.tempMax) + '%' }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Estadísticas semanales ─────────────── -->
    <section class="section">
      <h2 class="section-title">
        <span class="section-icon">📊</span>
        Estadísticas de la semana
      </h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Temperatura máxima</div>
          <div class="stat-value max">{{ displayTemp(stats.max) }}</div>
          <div class="stat-desc">Pico absoluto de la semana</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Temperatura mínima</div>
          <div class="stat-value min">{{ displayTemp(stats.min) }}</div>
          <div class="stat-desc">Mínima absoluta de la semana</div>
        </div>
        <div class="stat-card highlight">
          <div class="stat-label">Promedio general</div>
          <div class="stat-value avg">{{ displayTemp(stats.avg) }}</div>
          <div class="stat-desc">Media de todas las temperaturas</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Promedio de máximas</div>
          <div class="stat-value">{{ displayTemp(stats.avgMax) }}</div>
          <div class="stat-desc">Media de temperaturas máximas</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Promedio de mínimas</div>
          <div class="stat-value">{{ displayTemp(stats.avgMin) }}</div>
          <div class="stat-desc">Media de temperaturas mínimas</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Amplitud térmica</div>
          <div class="stat-value">{{ displayTemp(stats.max - stats.min).replace('°C','°').replace('°F','°') }} </div>
          <div class="stat-desc">Diferencia max − min</div>
        </div>
      </div>
    </section>

    <!-- ── Mini gráfico visual ─────────────────── -->
    <section class="section">
      <h2 class="section-title">
        <span class="section-icon">📈</span>
        Variación de temperatura diaria
      </h2>
      <div class="chart-wrapper">
        <div class="chart">
          <div
            v-for="(day, i) in planet.forecast"
            :key="'bar-' + i"
            class="chart-col"
          >
            <span class="chart-top-label">{{ displayTemp(day.tempMax) }}</span>
            <div class="chart-bar-wrap">
              <div
                class="chart-bar"
                :style="{
                  height: normalizeTemp(day.tempMax) + '%',
                  background: `linear-gradient(to top, var(--accent), color-mix(in srgb, var(--accent) 40%, white))`
                }"
              ></div>
              <div
                class="chart-bar-min"
                :style="{ height: normalizeTemp(day.tempMin, true) + '%' }"
              ></div>
            </div>
            <span class="chart-label">{{ day.day.slice(0,3) }}</span>
            <span class="chart-bot-label">{{ displayTemp(day.tempMin) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Not found ──────────────────────────── -->
    <div v-if="!planet" class="not-found">
      <p>🚫 Planeta no encontrado en la base de datos galáctica.</p>
      <router-link to="/" class="back-btn">← Volver al inicio</router-link>
    </div>

  </div>
</template>

<script>
import { getPlanetById, getWeekStats } from '../data/planets.js'

export default {
  name: 'PlanetDetail',
  data() {
    return {
      planet: null,
      unit: 'C'
    }
  },
  computed: {
    stats() {
      if (!this.planet) return {}
      return getWeekStats(this.planet.forecast)
    },
    allTemps() {
      if (!this.planet) return []
      return this.planet.forecast.flatMap(d => [d.tempMax, d.tempMin])
    },
    tempExtreme() {
      return {
        max: Math.max(...this.allTemps),
        min: Math.min(...this.allTemps)
      }
    }
  },
  methods: {
    displayTemp(celsius) {
      if (this.unit === 'C') return `${celsius}°C`
      return `${Math.round(celsius * 9/5 + 32)}°F`
    },
    tempBarWidth(tempMax) {
      const { max, min } = this.tempExtreme
      if (max === min) return 50
      return Math.round(((tempMax - min) / (max - min)) * 100)
    },
    normalizeTemp(temp, isMin = false) {
      const { max, min } = this.tempExtreme
      const range = max - min || 1
      const normalized = ((temp - min) / range) * 70 + 10
      return Math.max(5, Math.min(95, normalized))
    }
  },
  created() {
    const id = this.$route.params.id
    this.planet = getPlanetById(id)
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 1;
  padding-bottom: 4rem;
}

/* ── Nav ─────────────────────────────────────── */
.back-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background: rgba(2, 4, 10, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.back-btn {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: 0.1em;
  transition: opacity 0.2s;
}
.back-btn:hover { opacity: 0.7; }
.nav-right { display: flex; align-items: center; gap: 0.5rem; }
.unit-toggle-label { font-size: 0.75rem; color: var(--text-muted); }
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
.unit-btn.active { background: var(--gold, var(--accent)); color: #000; border-color: var(--gold, var(--accent)); }

/* ── Hero ────────────────────────────────────── */
.hero {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hero-content {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: start;
}
@media (max-width: 768px) {
  .hero-content { grid-template-columns: 1fr; }
}

.hero-climate-badge {
  display: inline-block;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 1rem;
}
.hero-name {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--text-main);
  line-height: 1;
  margin-bottom: 0.5rem;
}
.hero-terrain {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-transform: capitalize;
  margin-bottom: 1rem;
}
.hero-description {
  font-size: 0.9rem;
  color: var(--text-main);
  opacity: 0.7;
  max-width: 500px;
  line-height: 1.7;
  margin-bottom: 2rem;
}
.hero-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 420px;
}
.meta-item {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
}
.meta-label { display: block; font-size: 0.65rem; color: var(--text-muted); margin-bottom: 0.25rem; letter-spacing: 0.08em; }
.meta-value { font-family: 'Orbitron', sans-serif; font-size: 0.85rem; color: var(--accent); }

/* ── Current Weather widget ──────────────────── */
.current-weather {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 2px solid var(--accent);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  min-width: 220px;
  box-shadow: 0 0 40px rgba(0,0,0,0.5);
}
.cw-icon { font-size: 4rem; margin-bottom: 0.5rem; }
.cw-temp {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.8rem;
  font-weight: 900;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 0.4rem;
}
.cw-label { font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 1.5rem; }
.cw-stats { display: flex; flex-direction: column; gap: 0.75rem; }
.cw-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  padding: 0.5rem 0.75rem;
  background: rgba(255,255,255,0.03);
  border-radius: 6px;
}
.cw-stat strong { color: var(--text-main); font-weight: 400; }

/* ── Sections ────────────────────────────────── */
.section {
  max-width: 1400px;
  margin: 0 auto 3rem;
  padding: 0 2rem;
}
.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.section-icon { font-size: 1rem; }

/* ── Forecast ────────────────────────────────── */
.forecast-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.75rem;
}
@media (max-width: 900px) {
  .forecast-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 560px) {
  .forecast-grid { grid-template-columns: repeat(2, 1fr); }
}

.forecast-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 0.75rem;
  text-align: center;
  transition: transform 0.2s, border-color 0.2s;
  animation: cardIn 0.4s ease both;
  animation-delay: var(--delay, 0s);
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.forecast-card:hover { transform: translateY(-4px); border-color: var(--accent); }
.forecast-card.today {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
}
.fc-day { font-family: 'Orbitron', sans-serif; font-size: 0.6rem; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 0.5rem; }
.forecast-card.today .fc-day { color: var(--accent); }
.fc-icon { font-size: 1.75rem; margin-bottom: 0.5rem; }
.fc-condition { font-size: 0.65rem; color: var(--text-muted); margin-bottom: 0.75rem; min-height: 2.4em; line-height: 1.3; }
.fc-temps { display: flex; justify-content: center; align-items: center; gap: 0.25rem; margin-bottom: 0.5rem; }
.fc-max { font-family: 'Orbitron', sans-serif; font-size: 0.8rem; color: #f87171; }
.fc-sep { color: var(--text-dim); font-size: 0.7rem; }
.fc-min { font-family: 'Orbitron', sans-serif; font-size: 0.8rem; color: #7dd3fc; }
.fc-bar-wrap { height: 3px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; }
.fc-bar { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.6s ease; }

/* ── Stats ───────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}
.stat-card.highlight {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 6%, var(--bg-card));
}
.stat-label { font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.08em; margin-bottom: 0.5rem; }
.stat-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 0.4rem;
}
.stat-value.max { color: #f87171; }
.stat-value.min { color: #7dd3fc; }
.stat-value.avg { color: var(--accent); }
.stat-desc { font-size: 0.65rem; color: var(--text-dim); }

/* ── Chart ───────────────────────────────────── */
.chart-wrapper {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  overflow-x: auto;
}
.chart {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  min-width: 500px;
  height: 200px;
}
.chart-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3rem;
  height: 100%;
}
.chart-top-label { font-size: 0.6rem; color: var(--text-muted); font-family: 'Orbitron', sans-serif; }
.chart-bar-wrap {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2px;
  padding: 0 4px;
}
.chart-bar {
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  transition: height 0.8s ease;
}
.chart-bar-min {
  background: rgba(125, 211, 252, 0.3);
  border-radius: 0 0 4px 4px;
  min-height: 4px;
}
.chart-label { font-size: 0.65rem; color: var(--text-muted); font-family: 'Orbitron', sans-serif; letter-spacing: 0.05em; }
.chart-bot-label { font-size: 0.55rem; color: #7dd3fc; font-family: 'Orbitron', sans-serif; }

/* ── Not found ───────────────────────────────── */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1.5rem;
  color: var(--text-muted);
}
</style>
