<template>
  <footer class="footer pt-6 pb-6 footer mt-auto bg-secondary text-white">
    <ul class="nav justify-content-center pb-3 mb-3">
      <li>
        <RouterLink class="nav-link px-2 link-light" to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink class="nav-link px-2 link-light" to="/about"
          >About</RouterLink
        >
      </li>
      <li>
        <RouterLink class="nav-link px-2 link-light" to="/nodes"
          >Nodes</RouterLink
        >
      </li>
    </ul>
    <p class="text-center">
      Copyright © 2023
      <a class="link-light" href="https://allanberry.com">Allan Berry</a>:
      <a
        class="link-light"
        href="https://github.com/allanberry/brachio/blob/main/LICENSE.txt"
        >CC-BY-NC</a
      >
    </p>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  a {
  }
}
</style>
