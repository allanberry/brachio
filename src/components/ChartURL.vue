<script>
import slugify from "slugify";
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
    };
  },
  props: {
    url: Object,
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
          Plot.ruleX(this.visits, {
            x: "date",
            stroke: "#ddd",
            strokeWidth: 1,
          }),

          Plot.line(this.visits, {
            x: "date",
            y: "metrics_best_practices",
            // curve: "step",
            stroke: "red",
            strokeWidth: 3,
          }),

          Plot.line(this.visits, {
            x: "date",
            y: "metrics_performance",
            // curve: "step",
            // stroke: "red",
            stroke: "green",
            strokeWidth: 3,
          }),

          Plot.line(this.visits, {
            x: "date",
            y: "metrics_accessibility",
            // curve: "step",
            stroke: "orange",
            strokeWidth: 3,
          }),
        ],
      });
    },
  },
  mounted() {
    this.url_chart = document
      .querySelector(`#${this.chart_id}`)
      .append(this.chart);
  },
};
</script>

<template>
  <div class="card chart chart-url px-3 pt-2" :id="`chart-url-${chart_id}`">
    <div :id="chart_id"></div>
  </div>
</template>

<style lang="scss">
.card {
  figure > svg {
    width: 100%;
  }
}
</style>
