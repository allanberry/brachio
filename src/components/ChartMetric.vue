<script>
// import { useBrachioStore } from "@/stores/brachioStore";
// const store = useBrachioStore();
// import { number_formatter } from "@/utils";
// import * as d3 from "d3";

import * as Plot from "@observablehq/plot";

export default {
  data() {
    return {
      chart_id: (Math.random() + 1).toString(36).substring(7), // hat tip: https://stackoverflow.com/a/8084248/652626
      url_chart: Object,
    };
  },
  props: {
    metric: String,
    urls: Array,
  },
  computed: {
    chart: function () {
      return Plot.plot({
        // line: true,
        // height: 240,
        // style: {
        //   background: "transparent",
        // },
        // x: {
        //   domain: [new Date("1995"), Date.now()],
        // },
        // y: {
        //   domain: [0, 1.0],
        //   grid: true,
        // },
        // color: {
        //   domain: ["best practices", "performance", "accessibility"],
        //   range: ["red", "green", "orange"],
        //   legend: true,
        // },
        marks: [
          // Plot.ruleX(this.visits, {
          //   x: "date",
          //   stroke: "#ddd",
          //   strokeWidth: 1,
          // }),
          // Plot.line(this.visits, {
          //   x: "date",
          //   y: "metrics_best_practices",
          //   // curve: "step",
          //   stroke: "red",
          //   strokeWidth: 3,
          // }),
          // Plot.line(this.visits, {
          //   x: "date",
          //   y: "metrics_performance",
          //   // curve: "step",
          //   // stroke: "red",
          //   stroke: "green",
          //   strokeWidth: 3,
          // }),
          // Plot.line(this.visits, {
          //   x: "date",
          //   y: "metrics_accessibility",
          //   // curve: "step",
          //   stroke: "orange",
          //   strokeWidth: 3,
          // }),
        ],
        // caption: `Figure 1. This chart has a <i>fancy</i> caption.`,
      });
    },
  },
  mounted() {
    this.url_chart = document
      .querySelector(`#${this.chart_id}`)
      .append(this.chart);

    // console.log('flurg')
  },
};
</script>

<template>
  <section class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <p>Chart Node Compare</p>
    </div>
  </section>
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
