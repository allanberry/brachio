<script>
import { Popover } from "bootstrap";
import slugify from "slugify";
import ToolTipIcon from "@/assets/icons/tooltip.svg?component";

export default {
  data() {
    return {
      id: (Math.random() + 1).toString(36).substring(7),
    };
  },
  props: ["title", "content"],
  components: {
    ToolTipIcon,
  },
  methods: {
    slugify,
  },
  mounted() {
    new Popover(document.getElementById(this.id), {
      trigger: "focus",
    });
  },
};
</script>

<template>
  <button
    tabindex="0"
    :id="this.id"
    type="button"
    class="popover brachio_popover"
    data-bs-toggle="popover"
    :data-bs-title="title"
    :data-bs-content="content"
  >
    <ToolTipIcon class="align-baseline"/>
  </button>
</template>

<style lang="scss">
.brachio_popover {
  svg {
    fill: var(--bs-primary);
  }

  &:hover,
  &:active {
    svg {
      fill: navy;
    }
  }

  // --bs-popover-max-width: 200px;
  // --bs-popover-border-color: var(--bs-secondary);
  // --bs-popover-header-bg: var(--bs-secondary);
  // --bs-popover-header-color: var(--bs-white);
  // --bs-popover-body-padding-x: 0;
  // --bs-popover-body-padding-y: 0;
  --bs-popover-bg: none;
  --bs-popover-border-width: 0;

  display: inline-block;
}
</style>
