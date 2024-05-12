<template>
  <input type="checkbox" id="bookingPreviewModal" className="modal-toggle" />
  <div className="modal p-6" role="dialog ">
    <div
      class="modal-box w-full max-w-[370px] p-0 bg-white rounded-2xl overflow-hidden"
    >
      <div class="w-full">
        <img
          :src="item?.business?.thumbnail"
          alt=""
          v-if="isRestaurant"
          class="w-full h-40 object-cover bg-center"
        />
        <img
          :src="item?.service?.image[0]"
          alt=""
          v-else
          class="w-full h-40 object-cover bg-center"
        />
      </div>
      <div class="p-4">
        <h6 class="text-xs text-grey-300">KB{{ item?.booking_id }}</h6>
        <div class="flex justify-between mt-3">
          <div v-if="isRestaurant">
            <h4 class="text-sm font-semibold ellipsis">
              {{ item?.business?.name }}
            </h4>
          </div>
          <div v-else>
            <h4 class="text-sm font-semibold ellipsis">
              {{ item?.service?.service_name }}
            </h4>
            <h6 class="text-xs text-grey-300 ellipsis">
              {{ item?.business?.name }}
            </h6>
          </div>
          <dropdown
            classes="w-full min-w-min  drop-right z-50"
            v-if="type !== 'past' && type !== 'cancelled'"
          >
            <template v-slot:toggle>
              <button class="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.6666 6.66732C11.5833 6.66732 12.3333 5.91732 12.3333 5.00065C12.3333 4.08398 11.5833 3.33398 10.6666 3.33398C9.74994 3.33398 8.99994 4.08398 8.99994 5.00065C8.99994 5.91732 9.74994 6.66732 10.6666 6.66732ZM10.6666 8.33398C9.74994 8.33398 8.99994 9.08398 8.99994 10.0007C8.99994 10.9173 9.74994 11.6673 10.6666 11.6673C11.5833 11.6673 12.3333 10.9173 12.3333 10.0007C12.3333 9.08398 11.5833 8.33398 10.6666 8.33398ZM8.99994 15.0007C8.99994 14.084 9.74994 13.334 10.6666 13.334C11.5833 13.334 12.3333 14.084 12.3333 15.0007C12.3333 15.9173 11.5833 16.6673 10.6666 16.6673C9.74994 16.6673 8.99994 15.9173 8.99994 15.0007Z"
                    fill="#808080"
                  />
                </svg>
              </button>
            </template>
            <template v-slot:menu>
              <div class="shadow bg-white text-black900 rounded w-max">
                <label
                  for="bookingModal"
                  @click="() => setModal('re-schedule', item)"
                  class="flex items-center gap-1 cursor-pointer px-5 py-3 hover:bg-white-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.25 8C9.84 8 9.5 8.34 9.5 8.75V13.44C9.5 13.79 9.68 14.11 9.97 14.29L13.61 16.53C13.94 16.73 14.37 16.64 14.58 16.32C14.81 15.98 14.7 15.52 14.35 15.31L11 13.3V8.75C11 8.34 10.66 8 10.25 8Z"
                      fill="#212121"
                    />
                    <path
                      d="M17.42 12C17.47 12.33 17.5 12.66 17.5 13C17.5 16.9 14.4 20 10.5 20C6.6 20 3.5 16.9 3.5 13C3.5 9.1 6.6 6 10.5 6C11.2 6 11.87 6.1 12.5 6.29V4.23C11.86 4.08 11.19 4 10.5 4C5.5 4 1.5 8 1.5 13C1.5 18 5.5 22 10.5 22C15.5 22 19.5 18 19.5 13C19.5 12.66 19.48 12.33 19.44 12H17.42Z"
                      fill="#212121"
                    />
                    <path
                      d="M21.5 5H19.5V3C19.5 2.45 19.05 2 18.5 2C17.95 2 17.5 2.45 17.5 3V5H15.5C14.95 5 14.5 5.45 14.5 6C14.5 6.55 14.95 7 15.5 7H17.5V9C17.5 9.55 17.95 10 18.5 10C19.05 10 19.5 9.55 19.5 9V7H21.5C22.05 7 22.5 6.55 22.5 6C22.5 5.45 22.05 5 21.5 5Z"
                      fill="#212121"
                    />
                  </svg>
                  <span class="ellipsis">Re-Schedule Booking</span>
                </label>

                <label
                  for="bookingModal"
                  class="flex items-center gap-1 cursor-pointer px-5 py-3 hover:bg-white-50"
                  @click="() => setModal('cancel', item)"
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
                      fill="#212121"
                    /></svg
                  ><span class="ellipsis">Cancel Booking</span>
                </label>
              </div>
            </template>
          </dropdown>
        </div>
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3"
        >
          <div>
            <h4 class="text-sm sm:text-base font-bold text-black-900 ellipsis">
              <span
                >{{
                  new Date(parseInt(item?.timestamp)).toLocaleDateString("en-US")
                }}
                •
              </span>
              <span>{{ getStringTime(item?.time) }} </span>
              <span v-if="!isRestaurant">
                - {{ getDuration(item?.time, item?.service?.duration) }}</span
              >
            </h4>
            <h6
              class="text-sm text-black-600 ellipsis"
              v-if="type !== 'cancelled' && type !== 'past'"
            >
              {{ getStartsInText(item?.date) }}
            </h6>
          </div>
          <!-- type condition  -->
          <div class="flex items-center gap-3">
            <div
              class="text-black flex items-center gap-1"
              v-if="
                type?.toLowerCase() === 'past' && item?.service?.rating != 0
              "
            >
              <span class="leading-normal">{{
                item?.service?.rating || 0
              }}</span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  d="M12.0001 17.5198L16.1501 20.0298C16.9101 20.4898 17.8401 19.8098 17.6401 18.9498L16.5401 14.2298L20.2101 11.0498C20.8801 10.4698 20.5201 9.36977 19.6401 9.29977L14.8101 8.88977L12.9201 4.42977C12.5801 3.61977 11.4201 3.61977 11.0801 4.42977L9.19007 8.87977L4.36007 9.28977C3.48007 9.35977 3.12007 10.4598 3.79007 11.0398L7.46007 14.2198L6.36007 18.9398C6.16007 19.7998 7.09007 20.4798 7.85007 20.0198L12.0001 17.5198Z"
                  fill="#F2C963"
                ></path>
              </svg>
            </div>
            <label
              for="ratingModal"
              class="flex items-center gap-1 bg-secondary-100 rounded-full text-sm px-2 py-1.5 cursor-pointer"
              v-if="
                type?.toLowerCase() === 'past' && item?.service?.rating == 0
              "
              @click="hanldeItem(item)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M12.6663 17.5198L16.8163 20.0298C17.5763 20.4898 18.5063 19.8098 18.3063 18.9498L17.2063 14.2298L20.8763 11.0498C21.5463 10.4698 21.1863 9.36977 20.3063 9.29977L15.4763 8.88977L13.5863 4.42977C13.2463 3.61977 12.0863 3.61977 11.7463 4.42977L9.85633 8.87977L5.02633 9.28977C4.14633 9.35977 3.78633 10.4598 4.45633 11.0398L8.12633 14.2198L7.02633 18.9398C6.82633 19.7998 7.75633 20.4798 8.51633 20.0198L12.6663 17.5198Z"
                  fill="#F2C963"
                />
              </svg>
              <span>Rate Now</span>
            </label>
            <button
              type="button"
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-20"
              v-if="type?.toLowerCase() === 'upcoming'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M20.8333 3.6H19.6666V2.55C19.6666 1.9725 19.1416 1.5 18.5 1.5C17.8583 1.5 17.3333 1.9725 17.3333 2.55V3.6H7.99996V2.55C7.99996 1.9725 7.47496 1.5 6.83329 1.5C6.19163 1.5 5.66663 1.9725 5.66663 2.55V3.6H4.49996C3.20496 3.6 2.16663 4.545 2.16663 5.7V20.4C2.16663 21.555 3.20496 22.5 4.49996 22.5H20.8333C22.1166 22.5 23.1666 21.555 23.1666 20.4V5.7C23.1666 4.545 22.1166 3.6 20.8333 3.6ZM19.6666 20.4H5.66663C5.02496 20.4 4.49996 19.9275 4.49996 19.35V8.85H20.8333V19.35C20.8333 19.9275 20.3083 20.4 19.6666 20.4Z"
                  fill="#EEAF31"
                />
                <path
                  d="M12.6666 10.6875C10.4931 10.6875 8.72913 12.4515 8.72913 14.625C8.72913 16.7985 10.4931 18.5625 12.6666 18.5625C14.8401 18.5625 16.6041 16.7985 16.6041 14.625C16.6041 12.4515 14.8401 10.6875 12.6666 10.6875ZM14.6354 15.0188H13.0604V16.5938H12.2729V15.0188H10.6979V14.2313H12.2729V12.6562H13.0604V14.2313H14.6354V15.0188Z"
                  fill="#EEAF31"
                />
              </svg>
            </button>
            <button
              type="button"
              class="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-20"
              v-if="type?.toLowerCase() !== 'past'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M20.6666 2H4.66663C3.56663 2 2.66663 2.9 2.66663 4V22L6.66663 18H20.6666C21.7666 18 22.6666 17.1 22.6666 16V4C22.6666 2.9 21.7666 2 20.6666 2Z"
                  fill="#1EC96B"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="mt-3 pt-3 border-t border-neutral-20">
          <!-- price and staff  -->

          <div v-if="isRestaurant">
            <span class="text-base font-normal text-green-main"
              >{{ item?.staff_id }} People</span
            >
          </div>
          <div class="grid xs:grid-cols-2 gap-4" v-else>
            <div class="flex items-center gap-1">
              <div class="w-6 h-6 shrink-0">
                <img
                  :src="item?.staff?.image"
                  alt=""
                  class="w-full h-full object-cover bg-center rounded-full"
                />
              </div>
              <div>
                <h4 class="text-dark text-sm ellipsis">
                  {{ item?.staff?.staff_name }}
                </h4>
                <p class="text-black-600 text-xs capitalize">Staff</p>
              </div>
            </div>

            <div class="flex items-center gap-1 justify-between">
              <div
                class="flex items-center gap-1"
                v-if="!item?.service?.isShowCost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M19.5 6.66732V15.0007C19.5 15.9173 18.75 16.6673 17.8333 16.6673H4.49996C4.04163 16.6673 3.66663 16.2923 3.66663 15.834C3.66663 15.3757 4.04163 15.0007 4.49996 15.0007H17.8333V6.66732C17.8333 6.20898 18.2083 5.83398 18.6666 5.83398C19.125 5.83398 19.5 6.20898 19.5 6.66732ZM3.66663 13.334C2.28329 13.334 1.16663 12.2173 1.16663 10.834V5.83398C1.16663 4.45065 2.28329 3.33398 3.66663 3.33398H13.6666C15.05 3.33398 16.1666 4.45065 16.1666 5.83398V11.6673C16.1666 12.584 15.4166 13.334 14.5 13.334H3.66663ZM6.16663 8.33398C6.16663 9.71732 7.28329 10.834 8.66663 10.834C10.05 10.834 11.1666 9.71732 11.1666 8.33398C11.1666 6.95065 10.05 5.83398 8.66663 5.83398C7.28329 5.83398 6.16663 6.95065 6.16663 8.33398Z"
                    fill="#1EC96B"
                  />
                </svg>

                <div
                  class="flex items-center text-sm"
                  v-if="
                    item?.service?.payment_method?.toLowerCase() == 'deposit'
                  "
                >
                  <span>${{ item?.deposite || 0 }}</span>
                  <span>({{ item?.service?.service_cost || 0 }})</span>
                </div>
                <div class="flex items-center text-sm" v-else>
                  <span>${{ item?.service?.service_cost }}</span>
                </div>
              </div>
              <div class="text-end">
                <span class="text-sm text-black-600">{{
                  item?.service?.payment_method
                }}</span>
              </div>
            </div>
          </div>

          <!-- address  -->
          <div class="grid grid-cols-2 gap-4 mt-3">
            <div class="flex items-center gap-1">
              <a href="tel:+19867678657"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.0181 12.724L13.9015 12.4823C13.3931 12.424 12.8931 12.599 12.5348 12.9573L11.0015 14.4906C8.64314 13.2906 6.7098 11.3656 5.5098 8.99896L7.05147 7.45729C7.4098 7.09896 7.5848 6.59896 7.52647 6.09062L7.2848 3.99063C7.1848 3.14896 6.47647 2.51562 5.62647 2.51562H4.1848C3.24314 2.51562 2.4598 3.29896 2.51814 4.24062C2.9598 11.3573 8.65147 17.0406 15.7598 17.4823C16.7015 17.5406 17.4848 16.7573 17.4848 15.8156V14.374C17.4931 13.5323 16.8598 12.824 16.0181 12.724Z"
                    fill="#1EC96B"
                  /></svg
              ></a>
              <h4 class="text-dark text-sm ellipsis">
                {{ item?.business?.phone }}
              </h4>
            </div>
            <div class="flex items-center justify-end xs:justify-start gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M10.3333 1.80078C6.83329 1.80078 3.66663 4.48411 3.66663 8.63411C3.66663 11.2841 5.70829 14.4008 9.78329 17.9924C10.1 18.2674 10.575 18.2674 10.8916 17.9924C14.9583 14.4008 17 11.2841 17 8.63411C17 4.48411 13.8333 1.80078 10.3333 1.80078ZM10.3333 10.1341C9.41663 10.1341 8.66663 9.38411 8.66663 8.46745C8.66663 7.55078 9.41663 6.80078 10.3333 6.80078C11.25 6.80078 12 7.55078 12 8.46745C12 9.38411 11.25 10.1341 10.3333 10.1341Z"
                  fill="#1EC96B"
                />
              </svg>
              <h4 class="text-dark text-sm ellipsis">
                {{ item?.business?.address }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <label
      for="bookingPreviewModal"
      class="modal-backdrop cursor-pointer"
      @click="togglePreview"
    ></label>
  </div>
</template>

<script>
import {
  getDuration,
  getStartsInText,
  getStringTime,
} from "@/util/getBookings";
import dropdown from "../shared/others/dropdown.vue";

export default {
  props: {
    item: Object,
    setModal: Function,
    type: String,
    hanldeItem: Function,
  },
  components: {
    dropdown,
  },
  computed: {
    isRestaurant() {
      if (this.item?.business?.category?.toLowerCase() === "restaurant") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    getStringTime,
    getStartsInText,
    getDuration,
  },
};
</script>
