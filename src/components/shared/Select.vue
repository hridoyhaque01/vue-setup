<template>
    <div
      class="w-full border px-4 py-3 md:p-4 rounded-lg outline-none text-sm md:text-base flex items-center justify-between cursor-pointer bg-white-100"
      :class="selectedValue ? '' : 'text-disable'"
      v-if="disabled"
    >
      <span class="ellipsis">{{
        selectedValue ? selectedValue : placeholderValue ? placeholderValue : 'Select item'
      }}</span>
      <img
        :src="icon"
        alt=""
        v-if="icon"
        class="w-5 h-5 md:w-6 md:h-6 duration-300"
        :class="isShowMenu ? '-rotate-180' : 'rotate-0'"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        class="duration-300"
        :class="isShowMenu ? '-rotate-180' : 'rotate-0'"
        v-else
      >
        <path
          d="M15.9204 8.99953L12.0621 12.8795L8.20373 8.99953C7.81591 8.60953 7.18943 8.60953 6.80161 8.99953C6.41379 9.38953 6.41379 10.0195 6.80161 10.4095L11.366 14.9995C11.7538 15.3895 12.3803 15.3895 12.7681 14.9995L17.3324 10.4095C17.7203 10.0195 17.7203 9.38953 17.3324 8.99953C16.9446 8.61953 16.3082 8.60953 15.9204 8.99953Z"
          fill="#212121"
        />
      </svg>
    </div>
    <div class="relative select-none" ref="customSelect" v-else>
      <!-- default select  -->
      <div
        class="w-full border px-4 py-3 md:p-4 rounded-lg outline-none text-sm md:text-base flex items-center justify-between cursor-pointer"
        @click="toggleMenu"
        :class="selectedValue ? '' : 'text-disable'"
      >
        <span class="ellipsis">{{
          selectedValue ? selectedValue : placeholderValue ? placeholderValue : 'Select item'
        }}</span>
        <img
          :src="icon"
          alt=""
          v-if="icon"
          class="w-5 h-5 md:w-6 md:h-6 duration-300"
          :class="isShowMenu ? '-rotate-180' : 'rotate-0'"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          class="duration-300"
          :class="isShowMenu ? '-rotate-180' : 'rotate-0'"
          v-else
        >
          <path
            d="M15.9204 8.99953L12.0621 12.8795L8.20373 8.99953C7.81591 8.60953 7.18943 8.60953 6.80161 8.99953C6.41379 9.38953 6.41379 10.0195 6.80161 10.4095L11.366 14.9995C11.7538 15.3895 12.3803 15.3895 12.7681 14.9995L17.3324 10.4095C17.7203 10.0195 17.7203 9.38953 17.3324 8.99953C16.9446 8.61953 16.3082 8.60953 15.9204 8.99953Z"
            fill="#212121"
          />
        </svg>
      </div>
      <div
        class="overflow-hidden absolute w-full duration-200 z-50"
        ref="menuRef"
        :style="{
          maxHeight: isShowMenu ? '256px' : '0'
        }"
      >
        <div
          class="bg-white w-full border border-t-0 left-0 rounded-lg max-h-64 overflow-auto"
          v-if="isLoading"
        >
          <div class="py-2 px-4 text-gray-300">Loading...</div>
        </div>
        <div
          class="bg-white w-full border border-t-0 left-0 rounded-lg max-h-64 overflow-auto"
          v-else
        >
          <div class="py-2 px-4 text-gray-300">
            {{ placeholderValue }}
          </div>
          <div
            v-for="(item, index) in data"
            :key="index"
            class="py-2 px-4 hover:bg-gray-100 cursor-pointer duration-200 text-black-600"
            :class="checkActiveSelect(item[selectKey]) ? 'bg-gray-100' : 'bg-transparent'"
            @click="() => handleSelect(item)"
            v-if="!disabled"
          >
            {{ item[selectKey] }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: Array,
      selectKey: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      default: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: 'Select Item'
      },
      icon: String,
      setSelectItem: Function,
      disabled: Boolean,
      isLoading: Boolean
    },
    data() {
      return {
        placeholderValue: '',
        isShowMenu: false,
        selectedValue: ''
      }
    },
    watch: {
      default(newValue) {
        this.setValues()
      },
      data(newValue) {
        this.setValues()
      }
    },
    mounted() {
      this.menuRef = this.$refs.menuRef
      this.menuRef = this.$refs.customSelect
      this.setValues()
      document.addEventListener('click', this.toggleDropdown)
    },
    methods: {
      toggleMenu() {
        this.isShowMenu = !this.isShowMenu
      },
      checkActiveSelect(checkValue) {
        if (this.selectedValue && checkValue && this.selectedValue === checkValue) {
          return true
        } else {
          return false
        }
      },
      handleSelect(selectValue) {
        const check = this.value ? this.value : this.selectKey
        this.selectedValue = selectValue[this.selectKey]
        this.isShowMenu = false
        this.setSelectItem(selectValue[check])
      },
      toggleDropdown() {
        const dropdown = this.$el
        if (!dropdown?.contains(event?.target)) {
          this.isShowMenu = false
        }
      },
      setValues() {
        this.placeholderValue = this.placeholder || 'Select item'
        if (this.default) {
          const check = this.value ? this.value : this.selectKey
          const findObj = this.data?.find((item) => item[check] == this.default)
          if (findObj) {
            this.selectedValue = findObj[this.selectKey]
            this.setSelectItem(findObj[check])
          }
        }
      },
      resetValue() {
        this.placeholderValue = ''
        this.isShowMenu = false
        this.selectedValue = ''
      }
    },
    destroyed() {
      document.removeEventListener('click', this.toggleDropdown)
    }
  }
  </script>
  
  <style></style>
  