<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useBrachioStore } from "@/stores/brachioStore";

// const parents = computed(() => {
//   const parent_connections = node.value.connections.filter(
//     (conn) => conn.subject === node.value._id && conn.predicate === "has_parent"
//   );

//   return store.nodes.filter((store_node) => {
//     // console.log({store_node: store_node._id, pc: parent_connections[0].subject});

//     return parent_connections.find((conn) => {
//       return conn.dobject === store_node._id;
//     });
//   });
// });

// const visits = await store.getVisitsByUrl("https://library.uic.edu/");
// console.log(await this.getVisitsByUrl("https://library.uic.edu/"));

const store = useBrachioStore();
// const route = useRoute();

export default {
  data() {
    return {
      id: this.$route.params.id,
      node: store.nodes.find((node) => node._id === this.$route.params.id),
      visits: [],
    };
  },
  computed: {
    urls: function () {
      return this.node.urls;
    },
  },
  async mounted() {
    await this.fetchVisits();
  },
  methods: {
    async fetchVisits() {
      for (const url of this.urls) {
        await url.fetchVisits();
      }
    },
  },
};
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col" v-if="node">
        <h1 class="fw-light">{{ node.name }}</h1>

        <div v-if="node.parents && node.parents.length">
          <h4>Parents</h4>
          <ul>
            <li v-for="p in node.parents" :key="p.name">
              <RouterLink :to="{ name: 'node', params: { id: p._id } }">{{
                p.name
              }}</RouterLink>
            </li>
          </ul>
          <hr />
        </div>

        <div v-if="node.children && node.children.length">
          <h4>Children</h4>
          <ul>
            <li v-for="c in node.children" :key="c.name">
              <RouterLink :to="{ name: 'node', params: { id: c._id } }">{{
                c.name
              }}</RouterLink>
            </li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>Pages (URLs)</h4>

          <ul v-if="urls">
            <li v-for="url in urls" :key="url.url">
              {{ url.url }}
              <ul v-if="url.visits">
                <li v-for="visit in url.visits" :key="visit._id">
                  {{ visit.id }}
                </li>
              </ul>
            </li>
          </ul>

          <!-- <ul v-if="node.urls"> -->
          <!-- <li v-for="url in node.urls" :key="url.node_id"> -->
          <!-- <a :href="url.url">{{ url.url }}</a><br /> -->
          <!-- {{ url.label }} -->

          <!-- <h5>Visits</h5> -->
          <!-- <ul> -->
          <!-- <li class="visit" v-for="v in visits" :key="v.id"> -->
          <!-- <h6>{{ v.id }}</h6> -->

          <!-- <ul class="attribute_list">
                    <li>
                      <span class="label">Date and Time</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">Full URL</span>
                      <span class="stat"></span>
                    </li>

                    <li>
                      <span class="label">Wayback URL</span>
                      <span class="stat"></span>
                    </li> -->
          <!-- <li>
                      <span class="label">Complexity</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">Years since previous redesign</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">Technologies Used</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">CSS style quantity</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">HTML element quantity</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">Accessibility score</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">Performance score</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">Best Practices Score</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">Bugs (Qty. per ???)</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">Lines of Code</span>
                      <span class="stat"></span>
                    </li>
                    <li>
                      <span class="label">Primary colors used</span>
                      <span class="stat"></span>
                    </li> -->
          <!-- </ul> -->
          <!-- </li> -->
          <!-- </ul> -->
          <!-- </li> -->
          <!-- </ul> -->
          <hr />
        </div>

        <div v-if="node.categories && node.categories.length">
          <h4>Categories</h4>
          <ul>
            <li v-for="cat in node.categories">
              {{ cat }}
              <!-- <ul>
                <li>Academic</li>
              </ul> -->
            </li>
          </ul>
          <hr />
        </div>

        <div v-if="node.tags && node.tags.length">
          <h4>Tags</h4>
          <ul>
            <li v-for="tag in node.tags">
              {{ tag }}
            </li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>Locations</h4>
          <ul>
            <li>
              Richard J. Daley Library<br />
              801 S. Morgan, Chicago IL 60607, United States<br />
              Latitude: '33.75883, Longitude: '-84.388719
            </li>
          </ul>
          <hr />
        </div>

        <!-- <div>
          <h4>Connections</h4>

          <ul v-if="connections">
            <li v-for="connection in connections" :key="connection._id">
              {{ connection.subject._id }} {{ connection.predicate }}
              {{ connection.dobject._id }}
            </li>
          </ul>
          <div v-else>
            <p>No Connections</p>
            <p>Store connections: {{ store.connections }}</p>
          </div>
          <hr />
        </div> -->

        <div>
          <h4>IPEDS</h4>
          <p>coming soon</p>
          <hr />
        </div>

        <div>
          <h4>ARLs</h4>
          <p>coming soon</p>
          <hr />
        </div>
      </div>
      <p v-else>loading...</p>
    </div>
    <div class="row mb-4">
      <div class="col">
        <h4>Stats</h4>
        <ul>
          <li>
            Library Stats
            <ul>
              <li>
                <span class="label">Location</span>
                <span class="stat"></span>
              </li>
              <li>
                <span class="label">Librarians FTE</span>
                <span class="stat"></span>
              </li>
              <li>
                <span class="label">2021 Volume Count</span>
                <span class="stat"></span>
              </li>
              <li>
                <span class="label">2021 Budget</span>
                <span class="stat"></span>
              </li>
              <li>
                <span class="label">2021 Expenditures</span>
                <span class="stat"></span>
              </li>
              <li>
                <span class="label">2021 Avg. Librarian Salary</span>
                <span class="stat"></span>
              </li>
            </ul>
          </li>
          <li>
            Parent Institution Stats
            <ul>
              <li>
                <span class="label">2021 Enrollment</span>
                <span class="stat"></span>
              </li>
              <li>
                <span class="label">Rural or Urban</span>
                <span class="stat"></span>
              </li>
              <li>
                <span class="label">2021 Gross Revenue</span>
                <span class="stat"></span>
              </li>
              <li>
                <span class="label">2021 Endowment</span>
                <span class="stat"></span>
              </li>
              <li>
                <span class="label">2021 pct. Minority</span>
                <span class="stat"></span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
