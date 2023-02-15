<script>
import { useBrachioStore } from "@/stores/brachioStore";
// const store = useBrachioStore();
// import { number_formatter } from "@/utils";
import * as d3 from "d3";

export default {
  data() {
    return {
      padding: 60,
    };
  },
  props: {
    url: Object,
    data: {
      required: true,
      type: Array,
    },
    width: {
      default: 500,
      type: Number,
    },
    height: {
      default: 270,
      type: Number,
    },
  },
  created() {
    try {
      d3.select("#d3_graph").append("span").text("asdf");
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    rangeX() {
      const width = this.width - this.padding;
      return [0, width];
    },
    rangeY() {
      const height = this.height - this.padding;
      return [0, height];
    },
    path() {
      const x = d3.scaleLinear().range(this.rangeX);
      const y = d3.scaleLinear().range(this.rangeY);
      d3.axisLeft().scale(x);
      d3.axisTop().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, (d) => d)]);
      return d3
        .line()
        .x((d, i) => x(i))
        .y((d) => y(d));
    },
    line() {
      return this.path(this.data);
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    },
  },
};
</script>

<template>
  <div class="card url_chart shadow-sm">
    <div id="d3_graph">
      <svg class="line-chart" :viewBox="viewBox">
        <g transform="translate(0, 10)">
          <path class="line-chart__line" :d="line" />
        </g>
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  #d3_graph {
  }
}
</style>
