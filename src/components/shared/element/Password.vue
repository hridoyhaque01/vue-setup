<template>
  <div class="flex items-center border border-neutral-300  gap-2 p-4" :class="roundness">
    <input
      :type="isTypeText ? 'text' : 'password'"
      class="placeholder:text-disable outline-none bg-transparent w-full"
      v-model="value"
      v-bind="$attrs"
    />
    <button type="button" v-if="isShowIcon" @click="toggleType">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        v-if="!isTypeText"
      >
        <path
          d="M12 6.46844C14.76 6.46844 17 8.70844 17 11.4684C17 11.9784 16.9 12.4684 16.76 12.9284L19.82 15.9884C21.21 14.7584 22.31 13.2184 23 11.4584C21.27 7.07844 17 3.96844 12 3.96844C10.73 3.96844 9.51 4.16844 8.36 4.53844L10.53 6.70844C11 6.56844 11.49 6.46844 12 6.46844ZM2.71 3.12844C2.32 3.51844 2.32 4.14844 2.71 4.53844L4.68 6.50844C3.06 7.79844 1.77 9.49844 1 11.4684C2.73 15.8584 7 18.9684 12 18.9684C13.52 18.9684 14.97 18.6684 16.31 18.1484L19.03 20.8684C19.42 21.2584 20.05 21.2584 20.44 20.8684C20.83 20.4784 20.83 19.8484 20.44 19.4584L4.13 3.12844C3.74 2.73844 3.1 2.73844 2.71 3.12844ZM12 16.4684C9.24 16.4684 7 14.2284 7 11.4684C7 10.6984 7.18 9.96844 7.49 9.32844L9.06 10.8984C9.03 11.0784 9 11.2684 9 11.4684C9 13.1284 10.34 14.4684 12 14.4684C12.2 14.4684 12.38 14.4384 12.57 14.3984L14.14 15.9684C13.49 16.2884 12.77 16.4684 12 16.4684ZM14.97 11.1384C14.82 9.73844 13.72 8.64844 12.33 8.49844L14.97 11.1384Z"
          fill="#808080"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        v-else
      >
        <path
          d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
          fill="#808080"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    setInputValue: Function,
    roundness: {
      type: String,
      default: 'rounded-lg'
    }
  },
  data() {
    return {
      value: '',
      isTypeText: false,
      isShowIcon: false
    }
  },

  watch: {
    value(newVal) {
      this.setInputValue(newVal)
      if (newVal?.trim()?.length > 0) {
        this.isShowIcon = true
      } else {
        this.isShowIcon = false
      }
    }
  },

  methods: {
    toggleType() {
      this.isTypeText = !this.isTypeText
    },
    resetValue() {
      this.value = ''
    }
  }
}
</script>
