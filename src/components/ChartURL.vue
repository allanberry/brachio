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
      // width: 200,
      // height: 200,
      chart_data: [
        {
          id: "Visit 2020",
          score: 50,
        },
        {
          id: "Visit 2021",
          score: 75,
        },
        {
          id: "Visit 1999",
          score: 25,
        },
        {
          id: "Visit 1995",
          score: 100,
        },
        {
          id: "Visit 2010",
          score: 65,
        },
      ],
    };
  },
  props: {
    url: Object,
  },
  methods: {},
  computed: {
    chart: function () {
      return Plot.plot({
        style: {
          background: "transparent",
        },
        y: {
          grid: true,
        },
        color: {
          type: "diverging",
          scheme: "burd",
        },
        marks: [
          Plot.ruleY([0]),

          Plot.barY(this.chart_data, { x: "id", y: "score", stroke: "steelblue", fill: "aqua" }),
          // Plot.barY(this.chart_data, {
          //   x: "id",
          //   y: "score",
          //   stroke: "steelblue",
          // }),
        ],
        caption: `Figure 1. This chart has a <i>fancy</i> caption.`,
      });
    },
  },
  mounted() {
    document.querySelector(`#${this.chart_id}`).append(this.chart);
  },
};
</script>

<template>
  <!-- <div :id="chart_id" class="card url_chart shadow-sm"></div> -->
  <div class="card chart chart-url p-4" :id="`chart-url-${chart_id}`">
    <!-- <div>{{ chart }}</div>
    <div v-html="chart"></div> -->
    <div :id="chart_id"></div>
  </div>
</template>

<style lang="scss">
// .card.chart.chart-url {
//   svg {
//     border: 1px solid red;
//   }
// }

.card.chart.chart-url {
  border: 2px solid orange;
}
</style>

<!-- chart_svg -->
