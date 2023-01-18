<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBrachioStore } from "@/stores/brachioStore";

const store = useBrachioStore();
const id = useRoute().params.id;

const node = computed(() => store.nodes.find((node) => node._id === id));

const connections = computed(() =>
  store.connections.filter(
    (conn) => conn.subject._id === id || conn.dobject._id === id
  )
);

const parents = store.nodes.filter((node) => {
  return ["asu", "uic", "illinois"].includes(node._id);
});
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col" v-if="node">
        <!-- <h1 class="fw-light">{{ node().name }}</h1> -->
        <h1 class="fw-light">{{ node.name }}</h1>

        <div>
          <h3>Pages (URLs)</h3>
          <ul>
            <li>
              <li>
                <span class="label">Full URL</span>
                <span class="stat"></span>
              </li>
            </li>
            <li>
              <h4>http://example.com/url2</h4>
            </li>
            <li>
              <h4>http://example.com/url1</h4>
            </li>
          </ul>








          <h5>Visits</h5>
          <ul>
          <li class="visit">
            <h6>Visit 2022-01-01</h6>

            <ul class="attribute_list">
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
              </li>
              <li>
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
              </li>
            </ul>
          </li>
        </ul>
          <hr />
        </div>

        <div>
          <h4>Parents</h4>
          <p>Should be</p>
          <ul>
            <li>University of Illinois, Chicago</li>
            <ul>
              <li>University of Illinois</li>
            </ul>
          </ul>
          <p>Current</p>
          <ul v-if="parents">
            <li v-for="parent in parents" :key="parent._id">
              {{ parent.name }}
            </li>
          </ul>
          <div v-else>
            <p>No Connections</p>
            <p>{{ store.connections }}</p>
          </div>
          <hr />
        </div>

        <div>
          <h4>Categories</h4>
          <p>coming soon</p>
          <ul>
            <li>
              Library
              <ul>
                <li>Academic</li>
              </ul>
            </li>
            <li>
              Second Category
              <ul>
                <li>Subcategory</li>
              </ul>
            </li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>Tags</h4>
          <p>coming soon</p>
          <ul>
            <li>CARLI</li>
            <li>Big Ten</li>
            <li>Ivy League</li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>URLs</h4>
          <p>coming soon</p>
          <ul>
            <li>
              https://library.uic.edu<br />
              Home Page
            </li>
            <li>
              https://researchguides.uic.edu<br />
              LibGuides
            </li>
          </ul>
          <hr />
        </div>

        <div>
          <h4>Locations</h4>
          <p>coming soon</p>
          <ul>
            <li>
              Richard J. Daley Library<br />
              801 S. Morgan, Chicago IL 60607, United States<br />
              Latitude: '33.75883, Longitude: '-84.388719
            </li>
          </ul>
          <hr />
        </div>

        <div>
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
        </div>

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
        <h5>Stats</h5>
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
