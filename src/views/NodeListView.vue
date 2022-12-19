<script>
import NodeCard from "../components/NodeCard.vue";
import NodeSidebar from "../components/NodeSidebar.vue";
import NodeControls from "../components/NodeControls.vue";
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  components: {
    NodeCard,
    NodeSidebar,
    NodeControls
  },
  data() {
    return {
      nodes: []
    }
  },
  async created() {
    const data = JSON.stringify({
      query: `query nodes {
        nodes(limit:3,sortBy:NAME_ASC) {
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
      this.nodes = response.data.data.nodes;

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
        <h1 class="fw-light">Libraries</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ullamcorper dolor.
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

  <div class="album py-5 bg-light">
    <div class="container">


      <div class="row">
        <div class="col-12">
          <NodeSidebar />
        </div>




        <div class="col-12">
          <div class="container">

            <div class="row">
              <NodeControls />
            </div>

            <div class="row">
              <div class="col-12 mb-4">
                <NodeCard v-for="node in nodes" :key="node._id" :id="node._id" :name="node.name" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
