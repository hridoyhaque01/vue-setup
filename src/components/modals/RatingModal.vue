<template>
  <input type="checkbox" id="ratingModal" className="modal-toggle" />
  <div className="modal p-6" role="dialog ">
    <div
      className="modal-box w-full max-w-[720px] py-12 px-4 sm:px-8 md:px-12 bg-white font-roboto relative"
    >
      <div class="flex flex-col gap-6">
        <h4 class="text-lg font-medium text-black-900">Rate Your Experience</h4>
        <div class="flex justify-center gap-4 sm:gap-6 md:gap-10">
          <button
            v-for="(item, index) in 5"
            type="button"
            :key="index"
            @click="setRating(index)"
            :class="{ filled: index < rating }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="75"
              viewBox="0 0 72 75"
              fill="none"
              class="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M38.1806 1.96059L47.4197 22.1316C47.7593 22.8935 48.446 23.4311 49.2506 23.5649L69.9097 26.7995C70.8437 26.9857 71.6023 27.685 71.8841 28.6194C72.1659 29.5538 71.9251 30.5719 71.2574 31.2688L56.3084 46.9697C55.7311 47.5852 55.4717 48.4455 55.609 49.2889L59.138 71.4589C59.3305 72.412 58.9736 73.394 58.2205 73.9836C57.4673 74.5732 56.4518 74.6656 55.6096 74.2211L37.1316 63.7538C36.4276 63.3525 35.5723 63.3525 34.8684 63.7538L16.3903 74.2211C15.5482 74.6656 14.5327 74.5732 13.7795 73.9836C13.0263 73.394 12.6694 72.412 12.862 71.4589L16.3909 49.2889C16.5283 48.4455 16.2688 47.5852 15.6916 46.9697L0.742509 31.2688C0.0749112 30.5719 -0.165866 29.5539 0.115899 28.6195C0.397663 27.6851 1.15631 26.9858 2.09023 26.7995L22.7493 23.5649C23.554 23.4311 24.2407 22.8935 24.5803 22.1316L33.8193 1.96059C34.2009 1.07273 35.056 0.5 36 0.5C36.9439 0.5 37.799 1.07273 38.1806 1.96059Z"
                fill="#F2F2F2"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <label for="message" class="text-grey-300 text-lg">Write Something</label>
          <textarea
            id="message"
            class="h-48 sm:h-64 border border-grey-400 rounded-lg outline-none p-4"
            v-model="review"
          ></textarea>
        </div>

        <label
          for="ratingModal"
          @click="handleSubmit"
          class="btn-primary w-full cursor-pointer px-10 py-4 text-center"
          >Save</label
        >
      </div>
      <label
        for="ratingModal"
        class="flex items-center justify-center bg-grey-500 w-7 h-7 rounded-full absolute top-4 right-4 cursor-pointer"
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
    <label for="ratingModal" class="modal-backdrop"></label>
  </div>
</template>

<script>
import { errorNotify } from '@/util/toastify'
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    item: Object
  },
  data() {
    return {
      rating: 0,
      currentRating: [],
      review: ''
    }
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth.auth
    })
  },
  methods: {
    ...mapActions(['addReview']),
    setRating(index) {
      this.rating = index + 1
      this.currentRating = Array(this.rating).fill(true)
    },
    handleSubmit() {
      if (this.review && this.rating) {
        const data = {
          booking_id: this.item?.booking_id,
          service_id: this.item?.service_id,
          business_id: this.item?.business?.business_id,
          user_id: this.auth?.user_id,
          rating: this.rating,
          review: this.review
        }
        this.addReview(data)
        this.review = ''
        this.rating = 0
        this.currentRating = []
      } else {
        errorNotify('Incomplete Input')
      }
    }
  }
}
</script>

<style>
.filled svg {
  fill: #f2c86b;
}

.filled svg path {
  stroke: #f2c86b;
  fill: #f2c86b;
}
</style>
