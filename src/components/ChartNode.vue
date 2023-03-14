<script>
// import { useBrachioStore } from "@/stores/brachioStore";
// const store = useBrachioStore();
// import { number_formatter } from "@/utils";
// import slugify from "slugify";
// import * as d3 from "d3";

import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

import * as Plot from "@observablehq/plot";

export default {
  data() {
    return {
      node_chart: Object,
      node: store.select_node(this.node_name),
    };
  },
  props: {
    node_name: String,
  },
  // methods: {
  //   // getData: function () {
  //   //   return this.$refs;
  //   // },
  // },
  computed: {
    chart_id() {
      return this.node_name;
    },
    // node: ,
    // visits: function () {
    //   return this.url.visits.map((visit) => {
    //     return {
    //       id: visit.id,
    //       date: new Date(visit.date),
    //       metrics_best_practices: visit.metrics_best_practices,
    //       metrics_accessibility: visit.metrics_accessibility,
    //       metrics_performance: visit.metrics_performance,
    //     };
    //   });
    // },
  },
  async mounted() {
    const c = await this.chart();
    this.node_chart = document.querySelector(`#${this.chart_id}`).append(c);
  },
  methods: {
    chart: async function () {
      await store.fetch_snapshots([this.node]);

      // return {};
      const visits_ok_flat = this.node.snapshot.visits_ok.map((visit) => {
        return {
          date: visit.date,
          best_practices: visit.stats.best_practices,
          performance: visit.stats.performance,
          accessibility: visit.stats.accessibility,
        };
      });

      return Plot.plot({
        // grid: true,
        line: true,
        // width: this.calculate_width(),
        height: 240,
        style: {
          background: "transparent",
        },
        x: {
          domain: [new Date("1995"), Date.now()],
        },
        y: {
          domain: [0, 1.0],
          grid: true,
        },
        color: {
          domain: ["best practices", "performance", "accessibility"],
          range: ["red", "green", "orange"],
          legend: true,
        },
        marks: [
          Plot.ruleX(this.node.snapshot.visits_ok, {
            x: "date",
            stroke: "#ddd",
            strokeWidth: 1,
          }),
          Plot.line(visits_ok_flat, {
            x: "date",
            y: "best_practices",
            // curve: "step",
            stroke: "red",
            strokeWidth: 3,
          }),
          Plot.line(visits_ok_flat, {
            x: "date",
            y: "performance",
            // curve: "step",
            // stroke: "red",
            stroke: "green",
            strokeWidth: 3,
          }),
          Plot.line(visits_ok_flat, {
            x: "date",
            y: "accessibility",
            // curve: "step",
            stroke: "orange",
            strokeWidth: 3,
          }),
        ],
        // caption: `Figure 1. This chart has a <i>fancy</i> caption.`,
      });
    },
  },

  // updated() {
  //   console.log(this.getData());
  // },
};
</script>

<template>
  <!-- <div :id="chart_id" class="card url_chart shadow-sm"></div> -->
  <div class="card chart chart-url px-3 pt-2">
    <!-- <div>{{ chart }}</div>
    <div v-html="chart"></div> -->
    <!-- <p>{{ getData() }}</p> -->
    <div :id="chart_id"></div>

    <!-- <p>{{ url.visits }}</p> -->
  </div>
</template>

<style lang="scss">
// .card.chart.chart-url {
//   svg {
//     border: 1px solid red;
//   }
// }

.card {
  figure > svg {
    width: 100%;
  }
}
</style>

<!-- chart_svg -->
