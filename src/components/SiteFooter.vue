<script>
import PrimaryNav from "@/components/PrimaryNav.vue";
export default {
  components: {
    PrimaryNav,
  },
};
</script>

<template>
  <footer id="site_footer" class="footer pt-6 pb-6 footer mt-auto text-white">
    <PrimaryNav />
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
  background-color: MidnightBlue;
  a {
  }
}
</style>
