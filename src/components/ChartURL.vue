<script>
import { useBrachioStore } from "@/stores/brachioStore";
// const store = useBrachioStore();
// import { number_formatter } from "@/utils";
import slugify from "slugify";
// import * as d3 from "d3";

import * as Plot from "@observablehq/plot";

export default {
  data() {
    return {
      chart_id: `${slugify(this.url.url, {
        replacement: "-",
        lower: true,
        remove: /[//*+~.-_()'"!:@]/g,
      })}`,
      url_chart: Object,
      // width: 200,
      // height: 200,
    };
  },
  props: {
    url: Object,
  },
  methods: {
    // getData: function () {
    //   return this.$refs;
    // },
  },
  computed: {
    visits: function () {
      return this.url.visits.map((visit) => {
        return {
          id: visit.id,
          date: new Date(visit.date),
          metrics_best_practices: visit.metrics_best_practices,
          metrics_accessibility: visit.metrics_accessibility,
          metrics_performance: visit.metrics_performance,
        };
      });
    },
    chart: function () {
      return Plot.plot({
        grid: true,
        line: true,
        // width: this.calculate_width(),
        style: {
          background: "transparent",
        },
        x: {
          domain: [new Date("1995"), Date.now()],
        },
        y: {
          domain: [0, 1.0],
        },
        marks: [
          Plot.lineY(this.visits, {
            x: "date",
            y: "metrics_best_practices",
            // curve: "step",
            stroke: "blue",
          }),

          Plot.lineY(this.visits, {
            x: "date",
            y: "metrics_performance",
            // curve: "step",
            stroke: "red",
          }),

          Plot.lineY(this.visits, {
            x: "date",
            y: "metrics_accessibility",
            // curve: "step",
            stroke: "orange",
          }),
        ],
        // caption: `Figure 1. This chart has a <i>fancy</i> caption.`,
      });
    },
  },
  mounted() {
    this.url_chart = document
      .querySelector(`#${this.chart_id}`)
      .append(this.chart);
  },
  // updated() {
  //   console.log(this.getData());
  // },
};
</script>

<template>
  <!-- <div :id="chart_id" class="card url_chart shadow-sm"></div> -->
  <div class="card chart chart-url p-4" :id="`chart-url-${chart_id}`">
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

.card.chart.chart-url {
}
</style>

<!-- chart_svg -->
