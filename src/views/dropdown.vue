<template>
  <div class="flex items-center justify-center h-screen">
    <div class="dropdown" ref="drop">
      <div
        tabindex="0"
        role="button"
        class="btn m-1"
        @click="() => toggleDropdown(this.$refs)"
      >
        Click
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li @click="() => toggleDropdown(this.$refs)"><a>Item 1</a></li>
        <li @click="() => toggleDropdown(this.$refs)"><a>Item 2</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { closeDropdown, toggleDropdown } from "./util/handleDropdown";
export default {
  methods: {
    toggleDropdown,
    closeDropdown,
  },
  mounted() {
    document.body.addEventListener("click", (event) =>
      this.closeDropdown(event, this.$refs)
    );
  },
  beforeUnmount() {
    document.body.addEventListener("click", (event) =>
      this.closeDropdown(event, this.$refs)
    );
  },
};
</script>

<style>
.dropdown-content {
  visibility: hidden !important;
  opacity: 0 !important;
}

.dropdown-open .dropdown-content {
  visibility: visible !important;
  opacity: 1 !important;
}
</style>
