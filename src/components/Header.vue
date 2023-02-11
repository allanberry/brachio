<script></script>

<template>
  <header class="p-3 mb-3 border-bottom bg-secondary">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <RouterLink
          class=" text-white nav-link px-2 link-secondary d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
          to="/"
        >
          <img
            :src="`/src/assets/brachiosaurus.svg`"
            class="me-2"
            width="40"
            alt="brachiosaurus"
          />

          <span class="fs-4">Brachio</span>
        </RouterLink>
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <RouterLink class="nav-link px-2 link-light" to="/"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink class="nav-link px-2 link-light" to="/about"
              >About</RouterLink
            >
          </li>
          <li>
            <RouterLink class="nav-link px-2 link-light" to="/libraries"
              >Libraries</RouterLink
            >
          </li>
          <li>
            <RouterLink class="nav-link px-2 link-light" to="/nodes/uic_library"
              >UIC Library</RouterLink
            >
          </li>

          

          <!-- <li>
            <RouterLink
              class="nav-link px-2 link-dark"
              to="/nodes/library_name"
              >Library</RouterLink
            >
          </li> -->
        </ul>

        <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
          <input
            type="search"
            class="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form> -->
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
