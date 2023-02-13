<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  data() {
    return {};
  },
  props: {
    title: String,
    placement: String,
  },
  computed: {
    store: () => store,
    // paged_libraries() {
    //   return store.libraries.slice(
    //     store.pager.cursor,
    //     store.pager.cursor + store.pager.qty
    //   );
    // },
    highest_on_page() {
      const temp = store.pager.cursor + store.pager.qty;
      if (temp < store.libraries.length) {
        return temp;
      } else {
        return store.libraries.length;
      }
    },
    total_pages() {
      return Math.ceil(store.libraries.length / store.pager.qty);
    },
    page_current() {
      return store.pager.cursor / store.pager.qty + 1;
    },
  },
  methods: {
    page_prev() {
      if (store.pager.cursor - store.pager.qty > 0) {
        store.pager.cursor = store.pager.cursor - store.pager.qty;
      } else {
        store.pager.cursor = 0;
      }
    },
    page_next() {
      if (store.pager.cursor + store.pager.qty < store.libraries.length) {
        store.pager.cursor = store.pager.cursor + store.pager.qty;
      }
    },

    page_first() {
      store.pager.cursor = 0;
    },

    page_last() {
      store.pager.cursor =
        store.libraries.length - (store.libraries.length % store.pager.qty);
    },
  },
};
</script>

<template>
  <h4 class="visually-hidden">{{ title }}</h4>

  <!-- <div class="row mb-4" v-if="placement === 'precontent'">
    <div class="col">
      Filters applied<br />
      
      
      <ul>
        <li class="badge bg-secondary">Test</li>
      </ul>


    </div>
  </div> -->

  <div class="row" v-if="placement === 'precontent'">
    <div class="col">
      <h5 class="visually-hidden">Datafiers</h5>
      <div class="row">
        <div class="col col-8">
          <span
            >Showing records {{ store.pager.cursor + 1 }} –
            {{ highest_on_page }} of {{ store.libraries.length }}.</span
          >
        </div>



        <div class="col col-4 d-flex justify-content-end">
          <div class="input-group mb-3">
            <label class="input-group-text" for="sort_select">Sort By</label>
            <!-- <select class="form-select" id="sort_select">
              <option value="name" selected>Name</option>


            </select> -->

            <select
              v-model="store.pager.sort"
              class="form-select"
              id="sort_select"
            >
              <option disabled value="">Select one</option>
              <option value="node_name">Name</option>
              <option value="random">Random</option>
              <option disabled>──────────</option>

              <option value="node_parent_age">Age</option>
              <option value="node_parent_endowment">Endowment</option>
              <option value="node_parent_enrollment">No. of students</option>
              <option value="node_qty_books">No. of books</option>
              <option value="node_gate_count">Gate Count</option>

              <option disabled>──────────</option>
              <option value="node_visit_accessibility">
                Website Accessibility
              </option>
              <option value="node_visit_performance">
                Website Performance
              </option>
              <option value="node_visit_best_practices">
                Website Best Practices
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row pager" v-if="total_pages != 1">
    <h5 class="col col-12">Pager</h5>
    <p class="col col-12 form-text mb-3">
      Records are divided into "pages", or sets of results.
    </p>

    <!-- <div>
      <p>{{ store.pager }}</p>
      <p>
        {{
          {
            page_current,
            total_pages,
          }
        }}
      </p>
    </div> -->

    <nav class="col col-9 mb-3">
      <label for="pager_select form-text">Select Page</label>
      <!-- <p class="form-text">Select which page to view.</p> -->
      <ul class="pagination" id="pager_select">
        <li
          class="page-item"
          :class="{
            disabled: page_current === 1,
          }"
        >
          <button
            class="page-link"
            @click="page_prev()"
            :disabled="page_current === 1"
          >
            Previous
          </button>
        </li>

        <li class="page-item" v-if="page_current > 1">
          <button class="page-link" @click="page_first()">1</button>
        </li>

        <li class="page-item" v-if="page_current > 2">
          <span class="page-link disabled" disabled>...</span>
        </li>

        <!-- <li class="page-item"><span class="page-link">3</span></li>-->

        <li class="page-item active">
          <span class="page-link">{{ page_current }}</span>
        </li>

        <!--<li class="page-item"><span class="page-link">5</span></li> -->

        <li class="page-item" v-if="page_current < total_pages - 1">
          <span class="page-link disabled" disabled>...</span>
        </li>

        <li class="page-item" v-if="page_current < total_pages">
          <button class="page-link" @click="page_last()">
            {{ total_pages }}
          </button>
        </li>

        <li
          class="page-item"
          :class="{
            disabled: page_current === total_pages,
          }"
        >
          <button
            class="page-link"
            @click="page_next()"
            :disabled="page_current === total_pages"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>

    <div class="col col-3 mb-3" v-if="placement === 'precontent'">
      <label for="qty_select">Max per page</label>
      <!-- <p class="form-text">Results / Page</p> -->

      <select
        v-model.number="store.pager.qty"
        class="form-select"
        id="qty_select"
      >
        <option disabled value="">Select one</option>
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>
    </div>

    <!-- <div class="col col-4 mb-3"  v-if="placement === 'precontent'">
      <label for="pref_select">Preferences</label>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="prefs_show_card_images"
          checked
        />
        <label class="form-check-label" for="prefs_show_card_images">
          Show images
        </label>
      </div>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="prefs_show_card_parent"
          checked
        />
        <label class="form-check-label" for="prefs_show_card_parent">
          Show info about parent
        </label>
      </div>
    </div> -->
  </div>
</template>
