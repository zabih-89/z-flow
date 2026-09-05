<template>
  <div class="app">

    <!-- Header -->
    <header class="site-header">
      <div class="container navbar">

        <!-- Logo -->
        <RouterLink
          to="/"
          class="logo"
          @click="closeMenu"
        >
          <span class="logo-mark">Z</span>
          <span>Z_Flow</span>
        </RouterLink>

        <!-- Navigation -->
        <nav
          class="navigation"
          :class="{ 'navigation-open': menuOpen }"
          aria-label="Main navigation"
        >
          <RouterLink
            to="/"
            class="nav-link"
            exact-active-class="router-link-active"
            @click="closeMenu"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/about"
            class="nav-link"
            @click="closeMenu"
          >
            About
          </RouterLink>

          <RouterLink
            to="/api-explorer"
            class="nav-link"
            @click="closeMenu"
          >
            API Explorer
          </RouterLink>
        </nav>

        <!-- Mobile Menu Button -->
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

      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition
          name="page"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="route.path"
          />
        </Transition>
      </RouterView>
    </main>

      <!-- Footer -->
      <footer class="site-footer">
        <div class="container footer-content">

          <div class="footer-logo">
            <span class="logo-mark">Z</span>
            <span>Z_Flow</span>
          </div>

          <div class="footer-meta">
            <span>Built with Vue.js</span>
            <span class="footer-divider">•</span>
            <span>Codveda Technology Internship</span>
          </div>

          <div class="footer-copyright">
            © 2026 Zabihullah Ahmadi. All rights reserved.
          </div>

        </div>
      </footer>

  </div>
</template>


<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>


<style scoped>
.navigation {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  position: relative;

  padding: 9px 14px;

  color: var(--color-text-muted);

  font-size: 0.95rem;
  font-weight: 600;

  text-decoration: none;

  border-radius: 8px;

  transition:
    color var(--transition-fast),
    background var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary-dark);

  background: var(--color-primary-light);
}

.nav-link.router-link-active {
  color: var(--color-primary-dark);

  background: var(--color-primary-light);
}

.menu-toggle {
  border: none;
  background: transparent;
}

@media (max-width: 700px) {
  .menu-toggle {
    position: relative;
    z-index: 20;

    width: 42px;
    height: 42px;

    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 5px;

    padding: 0;

    border: 1px solid var(--color-border);

    border-radius: 10px;

    background: var(--color-surface);

    cursor: pointer;
  }

  .menu-toggle span {
    width: 20px;
    height: 2px;

    border-radius: 2px;

    background: var(--color-text);
  }

  .navigation {
    position: absolute;

    top: 72px;
    left: 20px;
    right: 20px;

    display: none;

    flex-direction: column;
    align-items: stretch;

    gap: 6px;

    padding: 12px;

    border: 1px solid var(--color-border);

    border-radius: 14px;

    background: var(--color-surface);

    box-shadow: var(--shadow-md);
  }

  .navigation.navigation-open {
    display: flex;
  }

  .nav-link {
    width: 100%;

    padding: 13px 15px;
  }
}


.footer-copyright {
  margin-top: 8px;
  color: var(--color-text-light);
  font-size: 0.82rem;
  text-align: center;
}

@media (max-width: 700px) {
  .footer-developer {
    flex-wrap: wrap;
    text-align: center;
  }

  .footer-copyright {
    line-height: 1.5;
  }
}



@media (min-width: 701px) {
  .menu-toggle {
    display: none;
  }
}


/* =================================
   Page Transition
================================= */

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;

  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;

  transform: translateY(-8px);
}
</style>