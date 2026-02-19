<template>
  <div class="hub-app">
    <header class="hub-app__header">
      <h1 class="hub-app__title">HUB Economia Circular</h1>
      <p class="hub-app__subtitle">Guia de estilo visual</p>
    </header>

    <!-- Brand colors -->
    <section class="hub-app__section">
      <h2 class="hub-app__heading">Colores de marca</h2>
      <div class="hub-app__swatches hub-app__swatches--brand">
        <div
          v-for="color in brandColors"
          :key="color.name"
          class="hub-app__swatch"
          :style="{ backgroundColor: color.value }"
        >
          <span class="hub-app__swatch-label" :style="{ color: color.labelColor }">
            {{ color.name }}
          </span>
          <span class="hub-app__swatch-hex" :style="{ color: color.labelColor }">
            {{ color.value }}
          </span>
        </div>
      </div>
    </section>

    <!-- Grey scale -->
    <section class="hub-app__section">
      <h2 class="hub-app__heading">Escala de grises</h2>
      <div class="hub-app__swatches hub-app__swatches--greys">
        <div
          v-for="grey in greyScale"
          :key="grey.name"
          class="hub-app__swatch hub-app__swatch--small"
          :style="{ backgroundColor: grey.value }"
        >
          <span class="hub-app__swatch-label" :style="{ color: grey.labelColor }">
            {{ grey.name }}
          </span>
          <span class="hub-app__swatch-hex" :style="{ color: grey.labelColor }">
            {{ grey.value }}
          </span>
        </div>
      </div>
    </section>

    <!-- Gradients -->
    <section class="hub-app__section">
      <h2 class="hub-app__heading">Degradados</h2>
      <div class="hub-app__gradients">
        <div class="hub-app__gradient hub-app__gradient--green">
          <span>--gradient-green</span>
          <span class="hub-app__gradient-desc">Accent → Support</span>
        </div>
        <div class="hub-app__gradient hub-app__gradient--blue">
          <span>--gradient-blue</span>
          <span class="hub-app__gradient-desc">Cyan → Primary</span>
        </div>
      </div>
    </section>

    <!-- Text contrast -->
    <section class="hub-app__section">
      <h2 class="hub-app__heading">Color de texto</h2>
      <div class="hub-app__text-sample">
        <p class="hub-app__text-main">
          Este parrafo usa <code>--color-text: #333333</code> sobre fondo blanco.
          El ratio de contraste WCAG AA es superior a 7:1, garantizando buena legibilidad
          tanto en pantallas de escritorio como en dispositivos moviles.
        </p>
        <p class="hub-app__text-meta">
          Texto secundario con <code>--color-grey: #6f6f6f</code> para informacion
          complementaria y metadatos.
        </p>
      </div>
    </section>

    <!-- Typography -->
    <section class="hub-app__section">
      <h2 class="hub-app__heading">Tipografia</h2>
      <h3 class="hub-app__font-montserrat">Montserrat — Display / Highlight</h3>
      <p class="hub-app__font-montserrat hub-app__font-sample">
        AaBbCcDdEeFfGg 0123456789
      </p>
      <h3 class="hub-app__font-lato">Lato — Body / Text</h3>
      <p class="hub-app__font-lato hub-app__font-sample">
        AaBbCcDdEeFfGg 0123456789
      </p>
    </section>
  </div>
</template>

<script setup>
const brandColors = [
  { name: 'Primary',  value: '#041E42', labelColor: '#FFFFFF' },
  { name: 'Accent',   value: '#C4D600', labelColor: '#041E42' },
  { name: 'Support',  value: '#00A94F', labelColor: '#FFFFFF' },
];

const greyScale = [
  { name: 'Text',       value: '#333333', labelColor: '#FFFFFF' },
  { name: 'Dark Grey',  value: '#464646', labelColor: '#FFFFFF' },
  { name: 'Grey',       value: '#6f6f6f', labelColor: '#FFFFFF' },
  { name: 'Soft Grey',  value: '#9b9b9a', labelColor: '#FFFFFF' },
  { name: 'Light Grey', value: '#c1c1c1', labelColor: '#041E42' },
];
</script>

<style scoped>
.hub-app {
  font-family: var(--font-body, 'Lato', Arial, sans-serif);
  padding: 2rem;
  max-width: 860px;
  color: var(--color-text, #444);
}

.hub-app__header {
  margin-bottom: 2.5rem;
}

.hub-app__title {
  font-family: var(--font-highlight, 'Montserrat', sans-serif);
  font-size: 2.5rem;
  color: var(--color-primary, #041E42);
  margin: 0 0 0.25rem;
}

.hub-app__subtitle {
  font-size: 1rem;
  color: var(--color-soft-grey, #9b9b9a);
  margin: 0;
}

.hub-app__section {
  margin-bottom: 2.5rem;
}

.hub-app__heading {
  font-family: var(--font-body, 'Lato', Arial, sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary, #041E42);
  border-bottom: 1px solid var(--color-light-grey, #c1c1c1);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

/* Color swatches */
.hub-app__swatches {
  display: grid;
  gap: 1rem;
}

.hub-app__swatches--brand {
  grid-template-columns: repeat(3, 1fr);
}

.hub-app__swatches--greys {
  grid-template-columns: repeat(5, 1fr);
}

.hub-app__swatch {
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.hub-app__swatch--small {
  aspect-ratio: 4 / 3;
}

.hub-app__swatch-label {
  font-weight: 600;
  font-size: 0.875rem;
}

.hub-app__swatch-hex {
  font-size: 0.75rem;
  opacity: 0.85;
  font-family: monospace;
}

/* Gradients */
.hub-app__gradients {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.hub-app__gradient {
  border-radius: 8px;
  padding: 2rem;
  color: #FFFFFF;
  font-family: monospace;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.hub-app__gradient--green {
  background: var(--gradient-green, linear-gradient(135deg, #C4D600 0%, #00A94F 100%));
}

.hub-app__gradient--blue {
  background: var(--gradient-blue, linear-gradient(135deg, #00ADEF 0%, #041E42 100%));
}

.hub-app__gradient-desc {
  font-size: 0.75rem;
  opacity: 0.8;
  font-family: var(--font-body, 'Lato', Arial, sans-serif);
}

/* Text contrast sample */
.hub-app__text-sample {
  background: #FFFFFF;
  border: 1px solid var(--color-light-grey, #c1c1c1);
  border-radius: 8px;
  padding: 1.5rem;
}

.hub-app__text-main {
  color: var(--color-text, #444);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.hub-app__text-meta {
  color: var(--color-grey, #6f6f6f);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.hub-app__text-sample code {
  background: var(--color-light-grey, #c1c1c1);
  padding: 0.15em 0.4em;
  border-radius: 3px;
  font-size: 0.85em;
}

/* Typography samples */
.hub-app__font-montserrat {
  font-family: var(--font-highlight, 'Montserrat', sans-serif);
}

.hub-app__font-lato {
  font-family: var(--font-body, 'Lato', Arial, sans-serif);
}

.hub-app__font-sample {
  font-size: 1.5rem;
  margin: 0.5rem 0 1.5rem;
  color: var(--color-primary, #041E42);
}
</style>
