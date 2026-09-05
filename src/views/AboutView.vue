<template>
  <section class="about-page">

    <div class="about-container">

      <!-- Header -->
      <div class="about-header">

        <span class="eyebrow">
          About the Project
        </span>

        <h1>
          Built with Vue.
          Designed for learning.
        </h1>

        <p>
          {{ appStore.description }}
        </p>

      </div>


      <!-- Feature Cards -->
      <div class="about-grid">

        <div class="about-card">

          <div class="card-icon">
            ⚡
          </div>

          <h2>
            Modern Frontend
          </h2>

          <p>
            This project uses Vue.js to create a fast,
            responsive and component-based single-page
            application.
          </p>

        </div>


        <div class="about-card">

          <div class="card-icon">
            🔗
          </div>

          <h2>
            REST API
          </h2>

          <p>
            The application connects to the GitHub REST API
            and displays dynamic repository information based
            on user searches.
          </p>

        </div>


        <div class="about-card">

          <div class="card-icon">
            📦
          </div>

          <h2>
            State Management
          </h2>

          <p>
            Pinia is used to manage application state and
            share information between different parts of
            the application.
          </p>

        </div>

      </div>


      <!-- Project Information -->
      <div class="project-info">

        <div>
          <span>
            Project
          </span>

          <strong>
            {{ appStore.appName }}
          </strong>
        </div>


        <div>
          <span>
            Developer
          </span>

          <strong>
            {{ appStore.developer }}
          </strong>
        </div>


        <div>
          <span>
            Theme
          </span>

          <strong>
            {{ appStore.theme }}
          </strong>
        </div>

      </div>

    </div>

  </section>
</template>


<script setup>
import { useAppStore } from '../stores/appStore'

const appStore = useAppStore()
</script>


<style scoped>
.about-page {
  min-height: calc(100vh - 160px);

  padding: 80px var(--container-padding);

  background: var(--color-background);
}

.about-container {
  width: min(
    var(--container-width),
    100%
  );

  margin: 0 auto;
}

.about-header {
  max-width: 760px;

  margin-bottom: 50px;
}

.eyebrow {
  display: inline-block;

  margin-bottom: 12px;

  color: var(--color-primary);

  font-size: 0.85rem;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 2px;
}

.about-header h1 {
  margin: 0 0 18px;

  color: var(--color-text);

  font-size: clamp(
    2.2rem,
    5vw,
    3.8rem
  );

  line-height: 1.1;
}

.about-header p {
  margin: 0;

  color: var(--color-text-muted);

  font-size: 1.05rem;

  line-height: 1.8;
}

.about-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 24px;

  margin-bottom: 35px;
}

.about-card {
  padding: 28px;

  border: 1px solid var(--color-border);

  border-radius: 18px;

  background: var(--color-surface);

  box-shadow: var(--shadow-sm);

  transition:
    transform var(--transition-normal),
    box-shadow var(--transition-normal),
    border-color var(--transition-normal);
}

.about-card:hover {
  transform: translateY(-4px);

  border-color: var(--color-border-focus);

  box-shadow: var(--shadow-md);
}

.card-icon {
  width: 48px;
  height: 48px;

  display: grid;

  place-items: center;

  margin-bottom: 20px;

  border-radius: 12px;

  background: var(--color-primary-light);

  font-size: 1.3rem;
}

.about-card h2 {
  margin: 0 0 12px;

  color: var(--color-text);

  font-size: 1.3rem;
}

.about-card p {
  margin: 0;

  color: var(--color-text-muted);

  line-height: 1.7;
}

.project-info {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 1px;

  overflow: hidden;

  border: 1px solid var(--color-border);

  border-radius: 16px;

  background: var(--color-border);
}

.project-info div {
  padding: 24px;

  background: var(--color-surface);
}

.project-info span {
  display: block;

  margin-bottom: 7px;

  color: var(--color-text-light);

  font-size: 0.8rem;

  font-weight: 600;

  text-transform: uppercase;

  letter-spacing: 1px;
}

.project-info strong {
  color: var(--color-text);

  font-size: 1rem;
}

@media (max-width: 850px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .about-page {
    padding: 50px 20px;
  }

  .project-info {
    grid-template-columns: 1fr;
  }
}
</style>