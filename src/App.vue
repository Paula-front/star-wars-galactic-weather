<template>
  <div id="app">
    <StarBackground />
    <router-view />
  </div>
</template>

<script>
import StarBackground from './components/StarBackground.vue'

export default {
  name: 'App',
  components: { StarBackground }
}
</script>