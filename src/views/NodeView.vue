<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      node: {}
    }
  },
  async created() {
    const id = useRoute().params.id

    const data = JSON.stringify({
      query: `query nodeByID {
      node(query: { _id: "${id}" }) {
        _id
        name
      }
    }`
    });

    const config = {
      method: 'post',
      url: '/api',
      headers: {
        'content-type': 'application/json',
        'apiKey': import.meta.env.VITE_APIKEY,
      },
      data
    };

    try {
      const response = await axios(config)
      this.node = response.data.data.node;

    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <h1 class="fw-light">{{ node.name }}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ullamcorper dolor. Quisque a odio in justo aliquet facilisis. Mauris
          malesuada ipsum nisi, vel consequat nulla ornare ac. Donec non
          interdum libero, eget interdum sem. Proin sagittis condimentum ipsum
          semper aliquam. Duis faucibus vulputate aliquam. Proin et sapien
          vestibulum, fermentum massa eu, condimentum metus. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Ut malesuada risus ut metus ultricies feugiat. Mauris nec ipsum
          ac nibh suscipit interdum. Aliquam cursus sem ligula, non condimentum
          orci pulvinar eget. Vivamus ornare in dolor at scelerisque. In nec
          condimentum ex. Suspendisse potenti. Etiam sit amet volutpat justo.
        </p>
      </div>
    </div>
  </section>
</template>
