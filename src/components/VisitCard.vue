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
        { label: "date accessed", metric: visit.date_accessed },
        { label: "date", metric: visit.date },
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
        },
        {
          label: "screenshot tablet",
          metric: visit.pics().tablet,
          overflow: "false",
        },
        {
          label: "screenshot desktop",
          metric: visit.pics().desktop,
          overflow: "false",
        },
      ];
    },
  },
};
</script>

<template>
  <div class="card">
    <!-- <img src="//placehold.it/200" class="card-img-top" alt="..." /> -->
    <div class="card-body">
      <h5 class="card-title">Visit {{ visit.id  }}</h5>
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

      <table class="table">
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
            <td>
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
    </div>
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

<style>
/* .card-img-top {
  object-fit: cover;
  object-position: top;
} */

td {
  overflow: hidden;
  word-break: break-all
}
</style>
