<template>
  <div class="star-background" aria-hidden="true">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
  </div>
</template>

<script>
export default {
  name: 'StarBackground'
}
</script>

<style scoped>
.star-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.stars,
.stars2,
.stars3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@keyframes animStar {
  from { transform: translateY(0); }
  to   { transform: translateY(-2000px); }
}

.stars {
  background-image:
    radial-gradient(1px 1px at 10% 15%, #fff, transparent),
    radial-gradient(1px 1px at 25% 40%, #fff, transparent),
    radial-gradient(1px 1px at 60% 10%, #fff, transparent),
    radial-gradient(1px 1px at 80% 60%, #fff, transparent),
    radial-gradient(1px 1px at 45% 80%, #fff, transparent),
    radial-gradient(1px 1px at 92% 25%, #fff, transparent),
    radial-gradient(1px 1px at 5%  70%, #fff, transparent),
    radial-gradient(1px 1px at 70% 90%, #fff, transparent),
    radial-gradient(1px 1px at 35% 55%, #fff, transparent),
    radial-gradient(1px 1px at 55% 35%, #fff, transparent),
    radial-gradient(1px 1px at 15% 90%, #fff, transparent),
    radial-gradient(1px 1px at 88% 45%, #fff, transparent),
    radial-gradient(1px 1px at 40% 20%, #fff, transparent),
    radial-gradient(1px 1px at 72% 75%, #fff, transparent),
    radial-gradient(1px 1px at 20% 60%, #fff, transparent),
    radial-gradient(1px 1px at 50% 50%, #fff, transparent),
    radial-gradient(1px 1px at 95% 85%, #fff, transparent),
    radial-gradient(1px 1px at 3%  30%, #fff, transparent),
    radial-gradient(1px 1px at 65% 65%, #fff, transparent),
    radial-gradient(1px 1px at 30% 5%,  #fff, transparent);
  background-size: 100% 100%;
  animation: animStar 60s linear infinite;
  opacity: 0.4;
}

.stars2 {
  background-image:
    radial-gradient(1.5px 1.5px at 18% 22%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1.5px 1.5px at 75% 12%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1.5px 1.5px at 42% 68%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1.5px 1.5px at 90% 50%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1.5px 1.5px at 8%  85%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1.5px 1.5px at 58% 92%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1.5px 1.5px at 33% 38%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1.5px 1.5px at 82% 78%, rgba(255,255,255,0.7), transparent);
  background-size: 100% 100%;
  animation: animStar 100s linear infinite;
  opacity: 0.3;
}

.stars3 {
  background-image:
    radial-gradient(2px 2px at 22% 48%, rgba(200,220,255,0.9), transparent),
    radial-gradient(2px 2px at 67% 33%, rgba(200,220,255,0.9), transparent),
    radial-gradient(2px 2px at 48% 77%, rgba(200,220,255,0.9), transparent),
    radial-gradient(2px 2px at 85% 15%, rgba(200,220,255,0.9), transparent),
    radial-gradient(2px 2px at 12% 55%, rgba(200,220,255,0.9), transparent);
  background-size: 100% 100%;
  animation: animStar 150s linear infinite;
  opacity: 0.5;
}
</style>