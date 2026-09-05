<template>
  <section class="api-page">
    <div class="api-container">

      <!-- Header -->
      <div class="api-header">
        <span class="eyebrow">REST API Explorer</span>

        <h1>Explore GitHub repositories.</h1>

        <p>
          Search GitHub repositories and explore live data using the
          GitHub REST API.
        </p>
      </div>

      <!-- Search -->
      <div class="search-section">
        <form
          class="search-form"
          @submit.prevent="searchRepositories"
        >
          <div class="search-input-wrapper">
            <span class="search-icon">⌕</span>

            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search repositories..."
              aria-label="Search GitHub repositories"
            />

            <!-- Clear Search Button -->
            <button
              v-if="searchQuery"
              type="button"
              class="clear-search"
              aria-label="Clear search"
              title="Clear search"
              @click="clearSearch"
            >
              ×
            </button>

            <!-- Search Button -->
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="loading"
            >
              {{ loading ? 'Searching...' : 'Search' }}
            </button>
          </div>
        </form>

        <!-- Search Information -->
        <p v-if="searched" class="search-info">
          Showing results for
          <strong>"{{ lastSearch }}"</strong>
        </p>

        <!-- Filters -->
        <div
          v-if="repositories.length"
          class="filter-controls"
        >
          <div class="filter-group">
            <label for="sortBy">Sort by</label>

            <select
              id="sortBy"
              v-model="sortBy"
              @change="searchRepositories"
            >
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
              <option value="updated">
                Recently Updated
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label for="language">Language</label>

            <select
              id="language"
              v-model="selectedLanguage"
            >
              <option value="all">
                All Languages
              </option>

              <option value="JavaScript">
                JavaScript
              </option>

              <option value="TypeScript">
                TypeScript
              </option>

              <option value="Vue">
                Vue
              </option>

              <option value="PHP">
                PHP
              </option>

              <option value="Python">
                Python
              </option>

              <option value="Java">
                Java
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="loading-state"
      >
        <div class="spinner"></div>

        <p>Searching GitHub...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="error-state"
      >
        <div class="error-icon">!</div>

        <h2>Something went wrong</h2>

        <p>{{ error }}</p>

        <button
          class="btn btn-primary"
          @click="searchRepositories"
        >
          Try Again
        </button>
      </div>

      <!-- Results -->
      <div
        v-else-if="searched"
        class="results-section"
      >

        <!-- Results Heading -->
        <div
          v-if="filteredRepositories.length"
          class="results-heading"
        >
          <div>
            <span class="section-label">
              Results
            </span>

            <h2>
              {{ totalResults.toLocaleString() }}
              repositories found
            </h2>
          </div>
        </div>

        <!-- Repository Grid -->
        <div
          v-if="filteredRepositories.length"
          class="repository-grid"
        >
          <article
            v-for="repository in filteredRepositories"
            :key="repository.id"
            class="repository-card"
          >

            <!-- Repository Owner -->
            <div class="repository-top">
              <img
                :src="repository.owner.avatar_url"
                :alt="`${repository.owner.login} avatar`"
                class="avatar"
              />

              <div class="repository-owner">
                <span>
                  {{ repository.owner.login }}
                </span>

                <small>
                  Repository
                </small>
              </div>
            </div>

            <!-- Repository Name -->
            <h3>
              {{ repository.name }}
            </h3>

            <!-- Description -->
            <p class="repository-description">
              {{
                repository.description ||
                'No description available.'
              }}
            </p>

            <!-- Repository Meta -->
            <div class="repository-meta">

              <span v-if="repository.language">
                <i class="language-dot"></i>

                {{ repository.language }}
              </span>

              <span>
                ★
                {{ formatNumber(
                  repository.stargazers_count
                ) }}
              </span>

              <span>
                Forks
                {{ formatNumber(
                  repository.forks_count
                ) }}
              </span>

            </div>

            <!-- Repository Link -->
            <a
              :href="repository.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="repository-link"
            >
              View repository →
            </a>

          </article>
        </div>

        <!-- No Results After Filter -->
        <div
          v-else
          class="empty-state"
        >
          <div class="empty-icon">⌕</div>

          <h2>No matching repositories</h2>

          <p>
            No repositories on this page match the selected
            language. Try another language or select
            "All Languages".
          </p>
        </div>

        <!-- Pagination -->
        <div
          v-if="repositories.length"
          class="pagination"
        >
          <button
            class="pagination-btn"
            :disabled="
              currentPage === 1 || loading
            "
            @click="goToPreviousPage"
          >
            ← Previous
          </button>

          <span class="page-number">
            Page {{ currentPage }}
          </span>

          <button
            class="pagination-btn"
            :disabled="
              loading ||
              repositories.length < perPage
            "
            @click="goToNextPage"
          >
            Next →
          </button>
        </div>

      </div>

      <!-- Empty / Initial State -->
      <div
        v-else
        class="empty-state"
      >
        <div class="empty-icon">⌕</div>

        <h2>Search GitHub</h2>

        <p>
          Enter a repository name, technology, or topic
          above to start exploring.
        </p>
      </div>

    </div>
  </section>
</template>


<script setup>
import {
  ref,
  watch,
  computed,
  onBeforeUnmount
} from 'vue'


/* =================================
   Search State
================================= */

const searchQuery = ref('')
const lastSearch = ref('')

const repositories = ref([])
const totalResults = ref(0)

const loading = ref(false)
const error = ref('')
const searched = ref(false)


/* =================================
   Sorting & Filtering
================================= */

const sortBy = ref('stars')
const selectedLanguage = ref('all')


/* =================================
   Pagination
================================= */

const currentPage = ref(1)
const perPage = 12


/* =================================
   Filtered Repositories
================================= */

const filteredRepositories = computed(() => {
  if (selectedLanguage.value === 'all') {
    return repositories.value
  }

  return repositories.value.filter(
    (repository) =>
      repository.language === selectedLanguage.value
  )
})


/* =================================
   Debounce Timer
================================= */

let debounceTimer = null


/* =================================
   Search GitHub
================================= */

const searchRepositories = async () => {
  const query = searchQuery.value.trim()

  if (!query) {
    repositories.value = []
    totalResults.value = 0
    lastSearch.value = ''
    searched.value = false
    error.value = ''

    return
  }

  loading.value = true
  error.value = ''
  searched.value = true

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        query
      )}&sort=${sortBy.value}&order=desc&per_page=${perPage}&page=${currentPage.value}`
    )

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          'GitHub API rate limit reached. Please wait a little and try again.'
        )
      }

      throw new Error(
        'Unable to fetch data from GitHub.'
      )
    }

    const data = await response.json()

    repositories.value = data.items
    totalResults.value = data.total_count
    lastSearch.value = query

  } catch (err) {
    repositories.value = []
    totalResults.value = 0

    error.value =
      err.message ||
      'An unexpected error occurred.'

  } finally {
    loading.value = false
  }
}


/* =================================
   Clear Search
================================= */

const clearSearch = () => {
  clearTimeout(debounceTimer)

  searchQuery.value = ''

  repositories.value = []
  totalResults.value = 0
  lastSearch.value = ''

  searched.value = false
  error.value = ''

  selectedLanguage.value = 'all'
  currentPage.value = 1
}


/* =================================
   Next Page
================================= */

const goToNextPage = () => {
  if (repositories.value.length < perPage) {
    return
  }

  currentPage.value++

  searchRepositories()
}


/* =================================
   Previous Page
================================= */

const goToPreviousPage = () => {
  if (currentPage.value <= 1) {
    return
  }

  currentPage.value--

  searchRepositories()
}


/* =================================
   Debounced Search
================================= */

watch(searchQuery, () => {
  clearTimeout(debounceTimer)

  currentPage.value = 1

  debounceTimer = setTimeout(() => {
    searchRepositories()
  }, 500)
})


/* =================================
   Cleanup
================================= */

onBeforeUnmount(() => {
  clearTimeout(debounceTimer)
})


/* =================================
   Number Formatter
================================= */

const formatNumber = (number) => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`
  }

  return number
}
</script>


<style scoped>

/* =================================
   API Page
================================= */

.api-page {
  min-height: calc(100vh - 80px);

  padding: 80px var(--container-padding);

  background: var(--color-background);
}

.api-container {
  width: min(
    var(--container-width),
    100%
  );

  margin: 0 auto;
}


/* =================================
   Header
================================= */

.api-header {
  max-width: 720px;

  margin-bottom: 45px;
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

.api-header h1 {
  margin: 0 0 18px;

  color: var(--color-text);

  font-size: clamp(
    2.2rem,
    5vw,
    3.8rem
  );

  line-height: 1.1;
}

.api-header p {
  margin: 0;

  color: var(--color-text-muted);

  font-size: 1.05rem;

  line-height: 1.8;
}


/* =================================
   Search
================================= */

.search-section {
  margin-bottom: 50px;
}

.search-input-wrapper {
  display: flex;

  align-items: center;

  gap: 12px;

  padding: 8px;

  border: 1px solid var(--color-border);

  border-radius: 14px;

  background: var(--color-surface);

  box-shadow: var(--shadow-sm);
}

.search-icon {
  padding-left: 12px;

  color: var(--color-text-light);

  font-size: 1.5rem;

  flex-shrink: 0;
}

.search-input-wrapper input {
  flex: 1;

  min-width: 0;

  padding: 13px 8px;

  border: none;

  outline: none;

  background: transparent;

  color: var(--color-text);

  font: inherit;
}

.search-input-wrapper input::placeholder {
  color: var(--color-text-light);
}


/* =================================
   Clear Search Button
================================= */

.clear-search {
  width: 32px;

  height: 32px;

  display: grid;

  place-items: center;

  flex-shrink: 0;

  padding: 0;

  border: none;

  border-radius: 50%;

  background: var(--color-surface-muted);

  color: var(--color-text-muted);

  font-size: 1.3rem;

  line-height: 1;

  cursor: pointer;

  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.clear-search:hover {
  background: var(--color-primary-light);

  color: var(--color-primary-dark);
}

.clear-search:focus-visible {
  outline: 2px solid
    var(--color-border-focus);

  outline-offset: 2px;
}


/* =================================
   Search Information
================================= */

.search-info {
  margin: 14px 4px 0;

  color: var(--color-text-muted);
}

.search-info strong {
  color: var(--color-text);
}


/* =================================
   Filters
================================= */

.filter-controls {
  display: flex;

  flex-wrap: wrap;

  gap: 16px;

  margin-top: 20px;
}

.filter-group {
  display: flex;

  flex-direction: column;

  gap: 7px;
}

.filter-group label {
  color: var(--color-text-muted);

  font-size: 0.85rem;

  font-weight: 600;
}

.filter-group select {
  min-width: 180px;

  padding: 10px 35px 10px 12px;

  border: 1px solid var(--color-border);

  border-radius: 9px;

  background: var(--color-surface);

  color: var(--color-text);

  font: inherit;

  cursor: pointer;

  outline: none;

  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.filter-group select:focus {
  border-color: var(--color-border-focus);

  box-shadow:
    0 0 0 3px
    var(--color-primary-light);
}


/* =================================
   Results
================================= */

.results-section {
  margin-top: 10px;
}

.results-heading {
  margin-bottom: 25px;
}

.section-label {
  display: block;

  margin-bottom: 6px;

  color: var(--color-primary);

  font-size: 0.8rem;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 1.5px;
}

.results-heading h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 1.5rem;
}


/* =================================
   Repository Grid
================================= */

.repository-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 24px;
}

.repository-card {
  display: flex;

  flex-direction: column;

  padding: 25px;

  border: 1px solid var(--color-border);

  border-radius: 18px;

  background: var(--color-surface);

  box-shadow: var(--shadow-sm);

  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}

.repository-card:hover {
  transform: translateY(-5px);

  border-color: var(--color-border-focus);

  box-shadow: var(--shadow-md);
}


/* =================================
   Repository Top
================================= */

.repository-top {
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 20px;
}

.avatar {
  width: 42px;

  height: 42px;

  border-radius: 50%;

  object-fit: cover;
}

.repository-owner {
  display: flex;

  flex-direction: column;
}

.repository-owner span {
  color: var(--color-text);

  font-weight: 700;
}

.repository-owner small {
  color: var(--color-text-light);
}


/* =================================
   Repository Content
================================= */

.repository-card h3 {
  margin: 0 0 12px;

  color: var(--color-primary-dark);

  font-size: 1.25rem;

  word-break: break-word;
}

.repository-description {
  min-height: 70px;

  margin: 0 0 20px;

  color: var(--color-text-muted);

  line-height: 1.6;
}


/* =================================
   Repository Meta
================================= */

.repository-meta {
  display: flex;

  flex-wrap: wrap;

  gap: 14px;

  margin-bottom: 20px;

  color: var(--color-text-light);

  font-size: 0.85rem;
}

.repository-meta span {
  display: inline-flex;

  align-items: center;

  gap: 5px;
}

.language-dot {
  width: 8px;

  height: 8px;

  border-radius: 50%;

  background: var(--color-primary);
}


/* =================================
   Repository Link
================================= */

.repository-link {
  margin-top: auto;

  color: var(--color-primary);

  font-weight: 700;

  text-decoration: none;
}

.repository-link:hover {
  color: var(--color-primary-hover);
}


/* =================================
   Pagination
================================= */

.pagination {
  display: flex;

  justify-content: center;

  align-items: center;

  gap: 16px;

  margin-top: 35px;
}

.pagination-btn {
  padding: 10px 18px;

  border: 1px solid var(--color-border);

  border-radius: 9px;

  background: var(--color-surface);

  color: var(--color-text);

  font: inherit;

  font-weight: 600;

  cursor: pointer;

  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--color-primary);

  background: var(--color-primary-light);

  color: var(--color-primary-dark);
}

.pagination-btn:disabled {
  opacity: 0.5;

  cursor: not-allowed;
}

.page-number {
  min-width: 80px;

  text-align: center;

  color: var(--color-text-muted);

  font-weight: 600;
}


/* =================================
   Loading
================================= */

.loading-state {
  padding: 70px 20px;

  text-align: center;
}

.loading-state p {
  color: var(--color-text-muted);
}

.spinner {
  width: 40px;

  height: 40px;

  margin: 0 auto 20px;

  border: 4px solid
    var(--color-primary-light);

  border-top-color:
    var(--color-primary);

  border-radius: 50%;

  animation:
    spin 0.8s linear infinite;
}


/* =================================
   Error
================================= */

.error-state {
  padding: 70px 20px;

  text-align: center;
}

.error-icon {
  width: 55px;

  height: 55px;

  display: grid;

  place-items: center;

  margin: 0 auto 20px;

  border-radius: 50%;

  background: var(--color-primary-light);

  color: var(--color-primary-dark);

  font-size: 1.5rem;

  font-weight: 700;
}

.error-state h2 {
  margin-bottom: 10px;

  color: var(--color-text);
}

.error-state p {
  margin-bottom: 20px;

  color: var(--color-text-muted);
}


/* =================================
   Empty State
================================= */

.empty-state {
  padding: 70px 20px;

  text-align: center;
}

.empty-icon {
  width: 55px;

  height: 55px;

  display: grid;

  place-items: center;

  margin: 0 auto 20px;

  border-radius: 50%;

  background: var(--color-primary-light);

  color: var(--color-primary-dark);

  font-size: 1.5rem;

  font-weight: 700;
}

.empty-state h2 {
  margin-bottom: 10px;

  color: var(--color-text);
}

.empty-state p {
  max-width: 550px;

  margin: 0 auto;

  color: var(--color-text-muted);

  line-height: 1.7;
}


/* =================================
   Animation
================================= */

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


/* =================================
   Responsive
================================= */

@media (max-width: 900px) {
  .repository-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .api-page {
    padding: 50px 20px;
  }

  .search-input-wrapper {
    flex-wrap: wrap;
  }

  .search-input-wrapper input {
    width: auto;
  }

  .search-input-wrapper .btn {
    width: 100%;
  }

  .clear-search {
    width: 34px;

    height: 34px;
  }

  .filter-controls {
    flex-direction: column;
  }

  .filter-group select {
    width: 100%;
  }

  .repository-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    gap: 10px;
  }

  .pagination-btn {
    padding: 9px 13px;

    font-size: 0.85rem;
  }
}

</style>