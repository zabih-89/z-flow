<template>
  <footer class="site-footer">
    <div class="container footer-content">
      <div>
        <RouterLink to="/" class="footer-logo">
          Z<span>_</span>Flow
        </RouterLink>

        <p>
          A modern Vue-powered single-page application.
        </p>
      </div>

      <div class="footer-meta">
        <p>© {{ currentYear }} Z_Flow</p>
        <p>Level 2 · Front-End Development</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>