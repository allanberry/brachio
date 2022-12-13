<template>
  <div class="mb-3 d-flex justify-content-end">
    <div
      class="btn-group"
      role="group"
      aria-label="Button group with nested dropdown"
    >
      <button type="button" class="btn btn-outline-dark">1</button>
      <button type="button" class="btn btn-outline-dark">2</button>

      <div class="btn-group" role="group">
        <button
          type="button"
          class="btn btn-outline-dark dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Dropdown link</a></li>
          <li><a class="dropdown-item" href="#">Dropdown link</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
