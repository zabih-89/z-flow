<template>
  <section class="home-page">

    <!-- Hero -->
    <div class="container hero-section">
      <div class="hero-grid">

        <!-- Hero Content -->
        <div class="hero-content">

          <span class="section-label">
            Codveda Technology · Level 2
          </span>

          <h1>
            Build. Explore.
            <span>Learn.</span>
          </h1>

          <p class="hero-description">
            Z_Flow is a modern single-page application built with
            Vue.js, Vue Router, Pinia, and the GitHub REST API.
            Explore repositories, filter results, and experience
            a responsive frontend application.
          </p>

          <div class="hero-actions">

            <RouterLink
              to="/api-explorer"
              class="btn btn-primary"
            >
              Explore API
            </RouterLink>

            <RouterLink
              to="/about"
              class="btn btn-secondary"
            >
              About Project
            </RouterLink>

          </div>

          <div class="hero-note">
            <span class="status-dot"></span>
            Live GitHub API integration
          </div>

        </div>


        <!-- Hero Code Card -->
        <div class="hero-card">

          <div class="window-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="code-preview">

            <div>
              <span class="code-keyword">const</span>
              <span> app = </span>
              <span class="code-function">createApp</span>
              <span>(Vue)</span>
            </div>

            <div>
              <span class="code-keyword">app</span>
              <span>.use(</span>
              <span class="code-function">router</span>
              <span>)</span>
            </div>

            <div>
              <span class="code-keyword">app</span>
              <span>.use(</span>
              <span class="code-function">pinia</span>
              <span>)</span>
            </div>

            <div>
              <span class="code-keyword">app</span>
              <span>.mount(</span>
              <span class="code-string">'#app'</span>
              <span>)</span>
            </div>

            <div class="code-divider"></div>

            <div>
              <span class="code-comment">
                // Explore live repositories
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>


    <!-- Features -->
    <section class="section">

      <div class="container">

        <div class="section-heading">
          <span class="section-label">
            What is included
          </span>

          <h2>
            A complete frontend experience.
          </h2>

          <p>
            The project combines modern frontend technologies
            with real API data and responsive design.
          </p>
        </div>


        <div class="feature-grid">

          <!-- Feature 1 -->
          <article class="feature-card">

            <div class="feature-icon">
              ⚡
            </div>

            <h3>
              Vue.js SPA
            </h3>

            <p>
              A component-based single-page application with
              Vue Router navigation and smooth page transitions.
            </p>

          </article>


          <!-- Feature 2 -->
          <article class="feature-card">

            <div class="feature-icon">
              🔗
            </div>

            <h3>
              REST API
            </h3>

            <p>
              Search live GitHub repository data using the
              GitHub REST API with loading and error handling.
            </p>

          </article>


          <!-- Feature 3 -->
          <article class="feature-card">

            <div class="feature-icon">
              📦
            </div>

            <h3>
              State Management
            </h3>

            <p>
              Pinia provides a clean and scalable approach to
              managing shared application state.
            </p>

          </article>

        </div>

      </div>

    </section>


    <!-- CTA -->
    <section class="cta-section">

      <div class="container">

        <div class="cta-card">

          <div>
            <span class="section-label">
              Start exploring
            </span>

            <h2>
              Discover repositories from GitHub.
            </h2>

            <p>
              Search for technologies, frameworks, projects,
              and topics using live GitHub data.
            </p>
          </div>

          <RouterLink
            to="/api-explorer"
            class="btn btn-primary"
          >
            Open API Explorer →
          </RouterLink>

        </div>

      </div>

    </section>

  </section>
</template>