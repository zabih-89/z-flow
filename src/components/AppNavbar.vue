<template>
  <header class="site-header">
    <div class="container navbar">

      <RouterLink to="/" class="logo" @click="closeMenu">
        Z<span>_</span>Flow
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="navigation" :class="{ 'navigation-open': menuOpen }">
        <RouterLink to="/" @click="closeMenu">
          Home
        </RouterLink>

        <RouterLink to="/about" @click="closeMenu">
          About
        </RouterLink>

        <RouterLink to="/api-explorer" @click="closeMenu">
          API Explorer
        </RouterLink>

        <RouterLink to="/contact" @click="closeMenu">
          Contact
        </RouterLink>
      </nav>

    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>