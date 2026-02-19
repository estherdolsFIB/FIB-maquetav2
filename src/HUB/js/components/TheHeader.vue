<template>
  <header class="c-header">
    <div class="o-wrapper o-wrapper--xl c-header__inner">
      <a href="/" class="c-header__logo">
        <img :src="logoSrc" alt="HUB Economia Circular" class="c-header__logo-img" />
      </a>

      <button
        class="c-header__toggle"
        :aria-expanded="String(menuOpen)"
        aria-controls="header-nav"
        aria-label="Abrir menú"
        @click="menuOpen = !menuOpen"
      >
        <span class="c-header__toggle-bar"></span>
        <span class="c-header__toggle-bar"></span>
        <span class="c-header__toggle-bar"></span>
      </button>

      <nav id="header-nav" class="c-header__nav" :class="{ 'is-open': menuOpen }">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="c-header__link c-header__link--has-sub"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="c-header__actions">
        <button class="c-header__lang" aria-label="Cambiar idioma">ES</button>
        <button class="c-header__search" aria-label="Buscar">
          <svg class="c-header__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import logoSrc from '../../assets/img/logo_pos.svg';

const menuOpen = ref(false);

const navLinks = [
  { label: 'Sobre nosotros', href: '#' },
  { label: 'Enfoque', href: '#enfoque' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Red', href: '#red' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Media', href: '#media' },
];
</script>

<style scoped>
.c-header {
  background-color: #FFFFFF;
  border-bottom: 1px solid var(--color-light-grey, #c1c1c1);
  position: relative;
  z-index: 100;
}

.c-header__inner {
  display: flex;
  align-items: center;
  height: 64px;
}

.c-header__logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  margin-right: auto;
}

.c-header__logo-img {
  height: 100px;
  width: auto;
}

/* Navigation */
.c-header__nav {
  display: flex;
  align-items: center;
  gap: 0;
}

.c-header__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-highlight, 'Montserrat', sans-serif);
  font-weight: 600;
  font-size: 11px;
  color: var(--color-primary, #041E42);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 8px 14px;
  transition: color 0.2s ease;
}

.c-header__link:hover,
.c-header__link:focus-visible {
  color: var(--color-accent, #C4D600);
}

.c-header__link--has-sub::after {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-top: 4px solid currentColor;
  margin-left: 2px;
}

/* Right-side actions */
.c-header__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  padding-left: 12px;
  border-left: 1px solid var(--color-light-grey, #c1c1c1);
}

.c-header__lang {
  font-family: var(--font-highlight, 'Montserrat', sans-serif);
  font-weight: 600;
  font-size: 11px;
  color: var(--color-primary, #041E42);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-decoration: none;
  padding: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.c-header__lang::after {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-top: 4px solid currentColor;
}

.c-header__search {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary, #041E42);
  transition: color 0.2s ease;
}

.c-header__search:hover {
  color: var(--color-accent, #C4D600);
}

.c-header__search-icon {
  width: 18px;
  height: 18px;
}

/* Hamburger toggle — hidden on desktop */
.c-header__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.c-header__toggle-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--color-primary, #041E42);
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

/* Mobile */
@media (max-width: 899px) {
  .c-header__toggle {
    display: flex;
  }

  .c-header__nav {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    background-color: #FFFFFF;
    border-bottom: 1px solid var(--color-light-grey, #c1c1c1);
    padding: 16px 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .c-header__nav.is-open {
    display: flex;
  }

  .c-header__link {
    padding: 10px 0;
    font-size: 12px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  .c-header__link:last-child {
    border-bottom: none;
  }

  .c-header__actions {
    border-left: none;
    padding-left: 0;
    margin-left: auto;
  }

  .c-header__toggle[aria-expanded="true"] .c-header__toggle-bar:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .c-header__toggle[aria-expanded="true"] .c-header__toggle-bar:nth-child(2) {
    opacity: 0;
  }

  .c-header__toggle[aria-expanded="true"] .c-header__toggle-bar:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}
</style>
