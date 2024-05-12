<template>
  <div class="relative max-w-max">
    <div class="" ref="dropdownBtn" @click="() => toggleDropdown('show')">
      <slot name="toggle"></slot>
    </div>
    <div
      class="w-full mt-1 invisible opacity-0 duration-200 translate-y-6"
      :class="classes ? 'absolute ' + classes : ''"
      :style="
        menuFromStart && {
          'margin-top': `-${buttonHeight + 126}px`,
        }
      "
      ref="dropdownMenu"
    >
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classes: String,
  },
  data() {
    return {
      buttonHeight: 0,
    };
  },
  computed: {
    menuFromStart() {
      if (this.classes) {
        const classesArray = this.classes?.split(" ");
        if (classesArray?.length > 0 && classesArray?.includes("drop-start")) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  methods: {
    toggleDropdown(value) {
      const menu = this.$refs.dropdownMenu.classList;
      if (value === "hide") {
        menu.remove("show-menu");
      } else {
        if (menu.contains("show-menu")) {
          menu.remove("show-menu");
        } else {
          menu.add("show-menu");
        }
      }
    },
    handleItemClick(event) {
      if (event.target.classList.contains("item")) {
        this.toggleDropdown("hide");
      }
    },
  },
  mounted() {
    if (this.$refs.dropdownBtn) {
      this.buttonHeight = this.$refs.dropdownBtn.clientHeight;
      document.addEventListener("click", (event) => {
        if (this.$refs?.dropdownBtn) {
          if (!this.$refs.dropdownBtn.contains(event.target)) {
            this.toggleDropdown("hide");
          }
        }
      });
      document.addEventListener("click", this.handleItemClick);
    }
  },
  beforeUnmount() {
    document.removeEventListener("click", () => {
      this.toggleDropdown("hide");
    });
    document.removeEventListener("click", this.handleItemClick);
  },
};
</script>

<style scoped>
.show-menu {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.drop-left {
  left: 0;
}
.drop-right {
  right: 0;
}

.drop-top {
  left: 0;
}
</style>
