<script>
import ToolTip from "@/components/ToolTip.vue";
import { round } from "@/utils.js";

export default {
  components: {
    ToolTip,
  },
  props: {
    name: String,
    stats: Object,
    aggregate: Boolean,
  },
  methods: {
    round,
  },
};
</script>

<template>
  <div>
    <h6>
      {{ name }}

      <ToolTip
        v-if="aggregate"
        content="Only includes visits with usable data.  Some visits encoutered errors, and are not included."
      />
    </h6>

    <ul>
      <li v-if="stats.date">
        <span>Date: </span>
        <span>{{ stats.date.format("YYYY-MM-DD") }}</span>
      </li>

      <li v-if="stats.dates && stats.visit_ok_qty > 1">
        <span>{{ stats.visit_ok_qty }} visits between </span>
        <span
          >{{ stats.dates.earliest.format("YYYY-MM-DD") }} -
          {{ stats.dates.latest.format("YYYY-MM-DD") }}</span
        >
      </li>
      <li v-if="stats.dates && stats.visit_ok_qty == 1">
        <span>1 visit: </span>
        <span> {{ stats.dates.latest.format("YYYY-MM-DD") }}</span>
      </li>

      <li v-if="stats.accessibility">
        <span>Accessibility: </span>
        <span>{{ round(stats.accessibility) }}</span>
      </li>

      <li v-if="stats.performance">
        <span>Performance: </span>
        <span>{{ round(stats.performance) }}</span>
      </li>

      <li v-if="stats.best_practices">
        <span>Best Practices: </span>
        <span>{{ round(stats.best_practices) }}</span>
      </li>

      <li v-if="stats.maintainability">
        <span>Maintainability: </span>
        <!-- <span>{{stats.maintainability.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}}</span> -->
        <span>{{ round(stats.maintainability) }}</span>
      </li>
    </ul>
  </div>
</template>
