<script>
import { useBrachioStore } from "@/stores/brachioStore";
const store = useBrachioStore();

import * as Plot from "@observablehq/plot";

export default {
  data() {
    return {
      node_chart: Object,
      node: store.select_node(this.node_name),
      selected: {
        best_practices: true,
        performance: true,
        accessibility: true,
        difficulty: false,
        effort: false,
        maintainability: false,
      },
    };
  },
  props: {
    node_name: String,
  },

  computed: {
    chart_id() {
      return this.node_name;
    },
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
          difficulty: visit.stats.difficulty / store.stat_maximums.difficulty,
          effort: visit.stats.effort / store.stat_maximums.effort,
          maintainability:
            visit.stats.maintainability / store.stat_maximums.maintainability,
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
          domain: [
            "best practices",
            "performance",
            "accessibility",
            // "maintainability",
            // "effort",
            // "difficulty",
          ],
          range: [
            "red",
            "green",
            "orange",
            // "purple", "skyblue", "pink"
          ],
          legend: true,
        },
        marks: [
          Plot.ruleX(this.node.snapshot.visits_ok, {
            x: "date",
            stroke: "#ddd",
            strokeWidth: 1,
          }),

          this.selected.best_practices
            ? Plot.line(visits_ok_flat, {
                x: "date",
                y: "best_practices",
                // curve: "step",
                stroke: "red",
                strokeWidth: 3,
              })
            : undefined,

          this.selected.performance
            ? Plot.line(visits_ok_flat, {
                x: "date",
                y: "performance",
                // curve: "step",
                // stroke: "red",
                stroke: "green",
                strokeWidth: 3,
              })
            : undefined,

          this.selected.accessibility
            ? Plot.line(visits_ok_flat, {
                x: "date",
                y: "accessibility",
                // curve: "step",
                stroke: "orange",
                strokeWidth: 3,
              })
            : undefined,

          // this.selected.maintainability
          //   ? Plot.line(visits_ok_flat, {
          //       x: "date",
          //       y: "maintainability",
          //       // curve: "step",
          //       stroke: "purple",
          //       strokeWidth: 3,
          //     })
          //   : undefined,

          // this.selected.effort
          //   ? Plot.line(visits_ok_flat, {
          //       x: "date",
          //       y: "effort",
          //       // curve: "step",
          //       stroke: "skyblue",
          //       strokeWidth: 3,
          //     })
          //   : undefined,

          // this.selected.difficulty
          //   ? Plot.line(visits_ok_flat, {
          //       x: "date",
          //       y: "difficulty",
          //       // curve: "step",
          //       stroke: "pink",
          //       strokeWidth: 3,
          //     })
          //   : undefined,
        ],
      });
    },
  },
};
</script>

<template>
  <div class="card chart chart-url px-3 pt-2">
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
