<script>
import { number_formatter } from "@/utils";

export default {
  data() {
    return {};
  },
  props: {
    visit: Object,
  },
  methods: {
    number_format: (number) => number_formatter.format(number),
    visit_data: function (visit) {
      return [
        { label: "title", value: visit.title },
        { label: "id", value: visit.id },
        { label: "date accessed", value: visit.date_accessed },
        { label: "date", value: visit.date.format("YYYY-MM-DD") },
        { label: "url wayback", value: visit.url_wayback, overflow: false },
        {
          label: "url wayback raw",
          value: visit.url_wayback_raw,
          overflow: "false",
        },
        { label: "anchors length", value: visit.anchors.length },
        { label: "html element qty", value: visit.raw_element_qty },
        { label: "html length", value: visit.raw_length },
        { label: "css length", value: visit.styles_length },
        { label: "js length", value: visit.scripts_length },
        { label: "html frames", value: visit.metrics_frames },
        { label: "html documents", value: visit.metrics_documents },
        { label: "html nodes", value: visit.metrics_nodes },
        { label: "performance score", value: visit.metrics_performance },
        { label: "accessibility score", value: visit.metrics_accessibility },
        { label: "best practices score", value: visit.metrics_best_practices },
        { label: "css colors", value: visit.metrics_styles_colors },
        { label: "css comments", value: visit.metrics_styles_comments },
        {
          label: "css commentsLength",
          value: visit.metrics_styles_commentsLength,
        },
        { label: "css oldIEFixes", value: visit.metrics_styles_oldIEFixes },
        { label: "css imports", value: visit.metrics_styles_imports },
        { label: "css importants", value: visit.metrics_styles_importants },
        {
          label: "css mediaQueries",
          value: visit.metrics_styles_mediaQueries,
        },
        {
          label: "css parsingErrors",
          value: visit.metrics_styles_parsingErrors,
        },
        {
          label: "css qualifiedSelectors",
          value: visit.metrics_styles_qualifiedSelectors,
        },
        {
          label: "css specificityIdAvg",
          value: visit.metrics_styles_specificityIdAvg,
        },
        { label: "css selectors", value: visit.metrics_styles_selectors },
        { label: "css length 2", value: visit.metrics_styles_length },
        { label: "css rules", value: visit.metrics_styles_rules },
        {
          label: "css declarations",
          value: visit.metrics_styles_declarations,
        },
        {
          label: "js maintainability",
          value: visit.metrics_scripts_maintainability,
        },
        { label: "js lines of code", value: visit.metrics_scripts_sloc },
        {
          label: "js halstead difficulty",
          value: visit.metrics_scripts_halstead_difficulty,
        },
        {
          label: "js halstead bugs",
          value: visit.metrics_scripts_halstead_bugs,
        },
        {
          label: "js halstead effort",
          value: visit.metrics_scripts_halstead_effort,
        },
        {
          label: "js halstead length",
          value: visit.metrics_scripts_halstead_length,
        },
        {
          label: "js halstead vocabulary",
          value: visit.metrics_scripts_halstead_vocabulary,
        },
        {
          label: "js halstead volume",
          value: visit.metrics_scripts_halstead_volume,
        },
        {
          label: "js halstead time",
          value: visit.metrics_scripts_halstead_time,
        },

        {
          label: "screenshot mobile",
          value: visit.pics().mobile,
          overflow: "false",
          link: true,
        },
        {
          label: "screenshot tablet",
          value: visit.pics().tablet,
          overflow: "false",
          link: true,
        },
        {
          label: "screenshot desktop",
          value: visit.pics().desktop,
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
      <div
        class="col-md-4 bg-light"
        style="max-height: 360px; overflow: hidden"
      >
        <a :href="visit.pics().tablet" target="_new"
          ><img :src="visit.pics().tablet" class="img-fluid rounded-start"
        /></a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ visit.date.format("YYYY-MM-DD") }}</h5>
          <p class="card-text">
            <small class="text-muted">{{ visit.url }}</small>
          </p>

          <ul class="mb-3">
            <li>
              <span>title: </span><span>{{ visit.title }}</span>
            </li>

            <li v-if="visit.metrics_performance">
              <span>performance: </span>
              <span>{{ visit.metrics_performance }}</span>
            </li>
            <li v-if="visit.metrics_accessibility">
              <span>accessibility: </span>
              <span>{{ visit.metrics_accessibility }}</span>
            </li>
            <li v-if="visit.metrics_best_practices">
              <span>best practices: </span>
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

    <table class="card-body table collapse" :id="`${visit.id}-data-table`">
      <thead>
        <tr>
          <!-- <th scope="col">#</th> -->
          <th scope="col">Label</th>
          <th scope="col">Metric</th>
        </tr>
      </thead>
      <tbody>

        <template v-for="metric in visit_data(visit)" :key="metric._id">
          <tr v-if="metric.value">
            <!-- <th scope="row">1</th> -->
            <th>{{ metric.label }}</th>
            <td v-if="metric.link">
              <a :href="metric.value" target="_new">{{ metric.value }}</a>
            </td>
            <td v-else-if="typeof metric.value === 'number'">
              {{ number_format(metric.value) }}
            </td>
            <td v-else>
              {{ metric.value }}
            </td>
          </tr>
        </template>

      </tbody>
    </table>

  </div>

  
</template>

<style lang="scss">
.card.visit_card {

  td {
    overflow: hidden;
    word-break: break-all;
  }

  .card-header {
    padding: unset;
    border-bottom: unset;
    background-color: white;


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

    width: 100%;


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
  }
}
</style>
