<script>
import brachiosaurus_url from "@/assets/brachiosaurus.svg?url";
import PrimaryNav from "@/components/PrimaryNav.vue";

export default {
  components: {
    PrimaryNav
  },
  data() {
    return {};
  },
  computed: {
    brachiosaurus_url() {
      return brachiosaurus_url;
    },
  },
};
</script>

<template>
  <header id="site_header" class="header p-3 border-bottom">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <RouterLink
          class="text-white nav-link px-2 link-secondary d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
          to="/"
        >
          <!-- <img src="@/assets/images/home.png"/> -->
          <img
            :src="brachiosaurus_url"
            class="me-2"
            width="40"
            alt="brachiosaurus"
          />

          <span class="fs-4">Brachio</span>
        </RouterLink>
        <PrimaryNav />

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

<style scoped lang="scss">
header#site_header {
  background-color: MidnightBlue;
}
</style>
