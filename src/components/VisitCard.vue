<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

export default {
  data() {
    return {};
  },
  props: {
    visit: Object,
  },
  computed: {
    queue_position() {},
    thumbnail() {},
  },
  methods: {
    visit_data: function (visit) {
      return [
        { label: "title", metric: visit.title },
        { label: "id", metric: visit.id },
        { label: "date accessed", metric: visit.date_accessed },
        { label: "date", metric: visit.date.format("YYYY-MM-DD") },
        // { label: "date wayback", metric: visit.date_wayback },
        { label: "url wayback", metric: visit.url_wayback, overflow: false },
        {
          label: "url wayback raw",
          metric: visit.url_wayback_raw,
          overflow: "false",
        },
        { label: "anchors length", metric: visit.anchors.length },
        { label: "html element qty", metric: visit.raw_element_qty },
        { label: "html length", metric: visit.raw_length },
        { label: "css length", metric: visit.styles_length },
        { label: "js length", metric: visit.scripts_length },
        { label: "html frames", metric: visit.metrics_frames },
        { label: "html documents", metric: visit.metrics_documents },
        { label: "html nodes", metric: visit.metrics_nodes },
        { label: "performance score", metric: visit.metrics_performance },
        { label: "accessibility score", metric: visit.metrics_accessibility },
        { label: "best practices score", metric: visit.metrics_best_practices },
        { label: "css colors", metric: visit.metrics_styles_colors },
        { label: "css comments", metric: visit.metrics_styles_comments },
        {
          label: "css commentsLength",
          metric: visit.metrics_styles_commentsLength,
        },
        { label: "css oldIEFixes", metric: visit.metrics_styles_oldIEFixes },
        { label: "css imports", metric: visit.metrics_styles_imports },
        { label: "css importants", metric: visit.metrics_styles_importants },
        {
          label: "css mediaQueries",
          metric: visit.metrics_styles_mediaQueries,
        },
        {
          label: "css parsingErrors",
          metric: visit.metrics_styles_parsingErrors,
        },
        {
          label: "css qualifiedSelectors",
          metric: visit.metrics_styles_qualifiedSelectors,
        },
        {
          label: "css specificityIdAvg",
          metric: visit.metrics_styles_specificityIdAvg,
        },
        { label: "css selectors", metric: visit.metrics_styles_selectors },
        { label: "css length 2", metric: visit.metrics_styles_length },
        { label: "css rules", metric: visit.metrics_styles_rules },
        {
          label: "css declarations",
          metric: visit.metrics_styles_declarations,
        },
        {
          label: "js maintainability",
          metric: visit.metrics_scripts_maintainability,
        },
        { label: "js lines of code", metric: visit.metrics_scripts_sloc },
        {
          label: "js halstead difficulty",
          metric: visit.metrics_scripts_halstead_difficulty,
        },
        {
          label: "js halstead bugs",
          metric: visit.metrics_scripts_halstead_bugs,
        },
        {
          label: "js halstead effort",
          metric: visit.metrics_scripts_halstead_effort,
        },
        {
          label: "js halstead length",
          metric: visit.metrics_scripts_halstead_length,
        },
        {
          label: "js halstead vocabulary",
          metric: visit.metrics_scripts_halstead_vocabulary,
        },
        {
          label: "js halstead volume",
          metric: visit.metrics_scripts_halstead_volume,
        },
        {
          label: "js halstead time",
          metric: visit.metrics_scripts_halstead_time,
        },

        {
          label: "screenshot mobile",
          metric: visit.pics().mobile,
          overflow: "false",
          link: true,
        },
        {
          label: "screenshot tablet",
          metric: visit.pics().tablet,
          overflow: "false",
          link: true,
        },
        {
          label: "screenshot desktop",
          metric: visit.pics().desktop,
          overflow: "false",
          link: true,
        },
      ];
    },
  },
};
</script>

<template>
  <div class="card visit_card flex-row flex-wrap mb-4 shadow-sm">
    <div class="row g-0">
      <div class="col-md-4 bg-light" style="max-height: 360px; overflow: hidden;">
        <img :src="visit.pics().tablet" class="img-fluid rounded-start" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"> {{ visit.date.format("YYYY-MM-DD") }}
          </h5>
          <p class="card-text">
            <small class="text-muted">{{ visit.id }}</small>
          </p>

          <ul>
            <li>
              <span>title:</span> <span>{{ visit.title }}</span>
            </li>

            <li>
              <span>performance:</span>
              <span>{{ visit.metrics_performance }}</span>
            </li>
            <li>
              <span>accessibility:</span>
              <span>{{ visit.metrics_accessibility }}</span>
            </li>
            <li>
              <span>best practices:</span>
              <span>{{ visit.metrics_best_practices }}</span>
            </li>
          </ul>

          <button
            class="btn btn-sm btn-outline-secondary"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#${visit.id}-data-table`"
            aria-expanded="false"
            :aria-controls="`${visit.id}-data-table`"
          >
            Toggle Data
          </button>
        </div>
      </div>
    </div>

    <!-- <img src="//placehold.it/200" class="card-img-top" alt="..." /> -->

    <!-- <ul>
        <li class="row" v-for="item in visit_data(visit)" :key="item._id">
          <span class="col-5 col-lg-3" style="font-weight: 700">{{
            item.label
          }}</span>
          <span class="col-7 col-lg-9">
            {{ item.metric }}
          </span>
        </li>
      </ul> -->

    <table class="card-body table collapse" :id="`${visit.id}-data-table`">
      <thead>
        <tr>
          <!-- <th scope="col">#</th> -->
          <th scope="col">Label</th>
          <th scope="col">Metric</th>
        </tr>
      </thead>
      <tbody>
        <!-- <li class="row" v-for="item in visit_data(visit)" :key="item._id">
          <span class="col-5 col-lg-3" style="font-weight: 700">{{
            item.label
          }}</span>
          <span class="col-7 col-lg-9">
            {{ item.metric }}
          </span>
        </li> -->

        <tr v-for="item in visit_data(visit)" :key="item._id">
          <!-- <th scope="row">1</th> -->
          <th>{{ item.label }}</th>
          <td v-if="item.link">
            <a :href="item.metric" target="_new">{{ item.metric }}</a>
          </td>
          <td v-else>
            {{ item.metric }}
          </td>
        </tr>

        <!-- <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr> -->
      </tbody>
    </table>
    <!-- <ul class="list-group list-group-flush">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div> -->
  </div>

  <!-- <div class="row no-gutters">
      <div class="col-3">
        <img src="//placehold.it/200" class="img-fluid" alt="" />
      </div>
      <div class="col-9">
        <div class="card-block px-2">
          <h4 class="card-title">Visit</h4>

          <ul>
            <li class="row" v-for="item in visit_data(visit)" :key="item._id">
              <span class="col-5 col-lg-3" style="font-weight: 700">{{
                item.label
              }}</span>
              <span class="col-7 col-lg-9">
                {{ item.metric }}
              </span>
            </li> -->

  <!-- <li class="row">
                      <span class="col-5 col-lg-3">screenshots</span>
                      <span class="col-7 col-lg-9">
                        <ul>
                          <li
                            v-for="screenshot in visit.screenshots_iiif"
                            :key="screenshot"
                          >
                            {{ screenshot }}
                          </li>
                        </ul>
                      </span>
                    </li>-->

  <!-- <div class="card-footer w-100 text-muted">
      Footer stating cats are CUTE little animals
    </div> -->
</template>

<style lang="scss">
.card.visit_card {
  /* .card-img-top {
  object-fit: cover;
  object-position: top;
} */

  td {
    overflow: hidden;
    word-break: break-all;
  }

  .card-header {
    padding: unset;
    border-bottom: unset;
    background-color: white;

    // background: transparent;

    background-size: 100%;
    background-position: top;
    background-repeat: no-repeat;

    width: 320px;
    min-height: 320px;

    &:first-child {
      border-top-right-radius: unset;
    }
    mask-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 80%,
      rgba(0, 0, 0, 0) 100%
    );

    // max-height: 400px;
    width: 100%;

    // height: 100%;
    // .card-img.img-thumbnail {
    //   padding: 0;
    //   border-radius: unset;
    //   // object-fit: cover;
    //   // object-position: left;
    //   margin-bottom: unset;
    //   border: none;

    //   flex: 1;

    //   mask-image: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%);

    // }
  }

  .card-body {
    flex: 2;
    min-height: 320px;

    .main_col {
      column-count: 2;
      column-width: 360;
      & > * {
        break-inside: avoid;
      }
    }

    .card-link {
      text-decoration: none;
      &:hover,
      &:active {
        text-decoration: underline;
      }
    }
  }
  .card-footer {
    border-top: none;
    // line-height: 24px
  }
}
</style>
