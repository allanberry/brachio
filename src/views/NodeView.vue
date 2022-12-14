<script setup>

import axios from 'axios';

var data = JSON.stringify({
    query: `{
      node {
        _id
        name
      }
    }`
  });

var config = {
  method: 'post',
  url: '/api',
  headers: {
    'content-type': 'application/json',
    'apiKey': import.meta.env.VITE_APIKEY,
  },
  data
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.error({ request: error.request, response: error.response });
  });
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <h1 class="fw-light">Library</h1>
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
        <!-- <p class="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don’t simply skip over it entirely.
        </p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p> -->
      </div>
    </div>
  </section>
</template>
