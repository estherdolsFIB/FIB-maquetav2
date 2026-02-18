<template>
  <div class="hub-app">
    <h1>HUB — Vue 3</h1>
    <p>Componente raiz montado correctamente.</p>
    <p>Contador: <strong>{{ count }}</strong></p>
    <button @click="count++">Incrementar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<style scoped>
.hub-app {
  font-family: var(--font-family-primary, sans-serif);
  padding: 2rem;
}

.hub-app button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid currentColor;
  background: transparent;
  font-size: 1rem;
}
</style>
