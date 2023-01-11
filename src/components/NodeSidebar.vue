<template>
  <div class="sticky-top">
    <h4 class="">Filters</h4>

    <div class="mb-3">
      <label for="filter_keyword" class="form-label fs-5 mb-3 fw-semibold"
        >Keywords</label
      >
      <input
        type="email"
        class="form-control"
        id="filter_keyword"
        placeholder="e.g. library, museum, ivy, hbcu..."
        aria-describedby="filter_keyword_help"
      />
      <div id="filter_keyword_help" class="form-text">
        Enter keywords to limit choices.
      </div>
    </div>
    <a
      href="/"
      class="d-flex align-items-center mb-3 link-dark text-decoration-none"
    >
      <span class="fs-5 fw-semibold">Facets</span>
    </a>

    <ul class="list-unstyled">
      <li class="mb-1" id="filter_list">
        <button
          class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#home-collapse"
          aria-expanded="true"
        >
          Category
        </button>
        <div class="collapse show" id="home-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <a
                href="#"
                class="link-dark d-inline-flex text-decoration-none rounded"
                >Libraries</a
              >
            </li>
            <li>
              <a
                href="#"
                class="link-dark d-inline-flex text-decoration-none rounded"
                >Museums</a
              >
            </li>
            <li>
              <a
                href="#"
                class="link-dark d-inline-flex text-decoration-none rounded"
                >Colleges</a
              >
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button
          class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#dashboard-collapse"
          aria-expanded="false"
        >
          Tags
        </button>
        <div class="collapse" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <a
                href="#"
                class="link-dark d-inline-flex text-decoration-none rounded"
                >Overview</a
              >
            </li>
            <li>
              <a
                href="#"
                class="link-dark d-inline-flex text-decoration-none rounded"
                >Weekly</a
              >
            </li>
            <li>
              <a
                href="#"
                class="link-dark d-inline-flex text-decoration-none rounded"
                >Monthly</a
              >
            </li>
            <li>
              <a
                href="#"
                class="link-dark d-inline-flex text-decoration-none rounded"
                >Annually</a
              >
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.dropdown-toggle {
  outline: 0;
}

.btn-toggle {
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  background-color: transparent;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, 0.85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, 0.85);
}
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.scrollarea {
  overflow-y: auto;
}
</style>
