<template>
  <section class="not-found">

    <div class="not-found-content">

      <span class="error-code">
        404
      </span>

      <span class="eyebrow">
        Page Not Found
      </span>

      <h1>
        Oops! This page doesn't exist.
      </h1>

      <p>
        The page you're looking for may have been moved,
        removed, or the URL might be incorrect.
      </p>

      <div class="not-found-actions">

        <RouterLink
          to="/"
          class="btn btn-primary"
        >
          Back to Home
        </RouterLink>

        <RouterLink
          to="/api-explorer"
          class="btn btn-secondary"
        >
          Explore API
        </RouterLink>

      </div>

    </div>

  </section>
</template>


<style scoped>
.not-found {
  min-height: calc(100vh - 160px);

  display: grid;

  place-items: center;

  padding: 80px var(--container-padding);

  background: var(--color-background);
}

.not-found-content {
  width: min(600px, 100%);

  text-align: center;
}

.error-code {
  display: block;

  margin-bottom: 8px;

  color: var(--color-primary);

  font-size: clamp(
    5rem,
    15vw,
    9rem
  );

  font-weight: 800;

  line-height: 1;

  letter-spacing: -5px;
}

.eyebrow {
  display: inline-block;

  margin-bottom: 15px;

  color: var(--color-primary-dark);

  font-size: 0.85rem;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 2px;
}

.not-found h1 {
  margin: 0 0 16px;

  color: var(--color-text);

  font-size: clamp(
    2rem,
    5vw,
    3rem
  );

  line-height: 1.15;
}

.not-found p {
  max-width: 500px;

  margin: 0 auto 30px;

  color: var(--color-text-muted);

  line-height: 1.8;
}

.not-found-actions {
  display: flex;

  justify-content: center;
  align-items: center;

  gap: 12px;

  flex-wrap: wrap;
}

@media (max-width: 700px) {
  .not-found {
    padding: 60px 20px;
  }

  .not-found-actions {
    flex-direction: column;

    width: 100%;
  }

  .not-found-actions .btn {
    width: 100%;

    max-width: 280px;
  }
}
</style>