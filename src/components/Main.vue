<script></script>

<template>
  <main>
      <p>{{process.env.NETLIFY_ATLAS_APIKEY}}</p>
      <p>{{process.env.NODE_VERSION}}</p>
      <RouterView />
  </main>
</template>

<style scoped lang="scss"></style>
