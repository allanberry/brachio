<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
    }
  },
  computed: {
    // async node() {
    //   const id = useRoute().params.id
    //   const config = {
    //     method: 'post',
    //     url: '/api',
    //     headers: {
    //       'content-type': 'application/json',
    //       'apiKey': import.meta.env.VITE_APIKEY,
    //     },
    //     data: JSON.stringify({
    //       query: `query nodeByID {
    //   node(query: { _id: "${id}" }) {
    //     _id
    //     name
    //   }
    // }`
    //     })
    //   };

    //   try {
    //     const response = await axios(config)
    //     return response.data.data.node;

    //   } catch (error) {
    //     return error;
    //   }
    // }
  }
}
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <!-- <h1 class="fw-light">{{ node().name }}</h1> -->
        <h1 class="fw-light">Node</h1>
      </div>
    </div>
  </section>
</template>
