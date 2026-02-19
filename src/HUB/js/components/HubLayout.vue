<template>
  <div class="c-layout">
    <TheHeader />

    <main class="c-layout__main">
      <div class="o-wrapper o-wrapper--xl">
        <slot />
      </div>
    </main>

    <footer class="c-layout__footer">
      <div class="o-wrapper o-wrapper--xl c-layout__footer-inner">
        <span>&copy; {{ currentYear }} HUB Economia Circular &mdash; Fundació Impulsa Balears</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import TheHeader from './TheHeader.vue';

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.c-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.c-layout__main {
  flex: 1;
  padding-top: var(--space-xl, 40px);
  padding-bottom: var(--space-xl, 40px);
}

.c-layout__footer {
  background-color: var(--color-primary, #041E42);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8125rem;
}

.c-layout__footer-inner {
  padding-top: var(--space-m, 24px);
  padding-bottom: var(--space-m, 24px);
}
</style>
