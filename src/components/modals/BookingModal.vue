<template>
  <input type="checkbox" id="bookingModal" className="modal-toggle" />
  <div className="modal p-6" role="dialog ">
    <div
      className="modal-box w-full max-w-[720px] px-4 py-6 md:px-8 md:pb-8 lg:pb-12 lg:px-12 bg-white font-roboto relative"
    >
      <div class="flex flex-col gap-4 sm:gap-6 items-center text-center">
        <div class="w-full max-w-[100px] sm:max-w-[160px] mx-auto mt-6 sm:mt-10">
          <img :src="warning" alt="" class="w-full" />
        </div>
        <div>
          <h4 class="text-2xl sm:text-3xl md:text-4xl text-black-900 font-bold">{{ title }}</h4>
          <p class="text-sm sm:text-base text-black-100 mt-2">
            {{ description }}
          </p>
          <p class="mt-2" v-if="cancelation_fee">Cancelation Fee : ${{ cancelation_fee }}</p>
        </div>
        <div class="w-full grid grid-cols-2 gap-6 mt-2">
          <label
            for="bookingModal"
            class="btn-primary text-base px-10 py-3 sm:py-4 cursor-pointer"
            @click="handler"
          >
            Procced
          </label>
          <label for="bookingModal" class="btn-cancel text-base px-10 py-3 sm:py-4"> Cancel </label>
        </div>
      </div>
      <label
        for="bookingModal"
        class="flex items-center justify-center bg-grey-500 w-7 h-7 rounded-full absolute top-4 sm:top-6 right-4 sm:right-8 md:right-12 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M18.3 5.7107C17.91 5.3207 17.28 5.3207 16.89 5.7107L12 10.5907L7.10997 5.7007C6.71997 5.3107 6.08997 5.3107 5.69997 5.7007C5.30997 6.0907 5.30997 6.7207 5.69997 7.1107L10.59 12.0007L5.69997 16.8907C5.30997 17.2807 5.30997 17.9107 5.69997 18.3007C6.08997 18.6907 6.71997 18.6907 7.10997 18.3007L12 13.4107L16.89 18.3007C17.28 18.6907 17.91 18.6907 18.3 18.3007C18.69 17.9107 18.69 17.2807 18.3 16.8907L13.41 12.0007L18.3 7.1107C18.68 6.7307 18.68 6.0907 18.3 5.7107Z"
            fill="#2E2E2E"
          />
        </svg>
      </label>
    </div>
    <label for="bookingModal" class="modal-backdrop"></label>
  </div>
</template>

<script>
import { success, warning } from '@/assets/getAssets'
export default {
  props: {
    title: String,
    description: String,
    handler: Function,
    cancelation_fee: [String || Number]
  },
  data() {
    return {
      success: success,
      warning
    }
  },
  methods: {}
}
</script>
