<template>
  <span ref="typed"></span>
</template>

<script>
import Typed from "typed.js";

export default {
  mounted() {
    this.initTyped();
  },
  methods: {
    initTyped() {
      const options = {
        strings: [
          "Your HOME ABROAD FOR KOrean IMMGRIANTS",
          "Your HOME ABROAD FOR KOrean IMMGRIANTS",
        ],
        typeSpeed: 20,
        backSpeed: 20,
        smartBackspace: true, // this is a default
        loop: true,
      };
      this.typed = new Typed(this.$refs.typed, options);
    },
  },
  beforeDestroy() {
    if (this.typed) {
      this.typed.destroy();
    }
  },
};
</script>

<style></style>
