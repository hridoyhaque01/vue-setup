<template>
  <div
    class="flex items-start justify-between gap-4 p-4 rounded-xl border border-neutral-20"
  >
    <div class="flex w-full gap-2">
      <!-- icons  -->
      <div>
        <!-- approve  -->
        <div
          class="w-14 aspect-square rounded-full bg-main-white flex items-center justify-center"
          v-if="item?.type === 'approve'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 6.25781C20 6.80781 19.55 7.25781 19 7.25781H18V8.25781C18 8.80781 17.55 9.25781 17 9.25781C16.45 9.25781 16 8.80781 16 8.25781V7.25781H15C14.45 7.25781 14 6.80781 14 6.25781C14 5.70781 14.45 5.25781 15 5.25781H16V4.25781C16 3.70781 16.45 3.25781 17 3.25781C17.55 3.25781 18 3.70781 18 4.25781V5.25781H19C19.55 5.25781 20 5.70781 20 6.25781ZM18 19.7378C18 20.4578 17.27 20.9378 16.61 20.6578L11 18.2578L5.39 20.6578C4.73 20.9478 4 20.4578 4 19.7378V5.25781C4 4.15781 4.9 3.25781 6 3.25781H13C12.37 4.09781 12 5.12781 12 6.25781C12 9.01781 14.24 11.2578 17 11.2578C17.34 11.2578 17.68 11.2278 18 11.1578V19.7378Z"
              fill="#1EC96B"
            />
          </svg>
        </div>
        <!-- cancel  -->
        <div
          class="w-14 aspect-square rounded-full bg-error-2 flex items-center justify-center"
          v-if="item?.type === 'cancel'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18.3 5.70973C17.91 5.31973 17.28 5.31973 16.89 5.70973L12 10.5897L7.10997 5.69973C6.71997 5.30973 6.08997 5.30973 5.69997 5.69973C5.30997 6.08973 5.30997 6.71973 5.69997 7.10973L10.59 11.9997L5.69997 16.8897C5.30997 17.2797 5.30997 17.9097 5.69997 18.2997C6.08997 18.6897 6.71997 18.6897 7.10997 18.2997L12 13.4097L16.89 18.2997C17.28 18.6897 17.91 18.6897 18.3 18.2997C18.69 17.9097 18.69 17.2797 18.3 16.8897L13.41 11.9997L18.3 7.10973C18.68 6.72973 18.68 6.08973 18.3 5.70973Z"
              fill="#FD5D5D"
            />
          </svg>
        </div>
        <!-- re-schedule  -->
        <div
          class="w-14 aspect-square rounded-full bg-warning flex items-center justify-center"
          v-if="item?.type === 're-schedule'"
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
              fill="#FECA57"
            />
            <path
              d="M17.42 12C17.47 12.33 17.5 12.66 17.5 13C17.5 16.9 14.4 20 10.5 20C6.6 20 3.5 16.9 3.5 13C3.5 9.1 6.6 6 10.5 6C11.2 6 11.87 6.1 12.5 6.29V4.23C11.86 4.08 11.19 4 10.5 4C5.5 4 1.5 8 1.5 13C1.5 18 5.5 22 10.5 22C15.5 22 19.5 18 19.5 13C19.5 12.66 19.48 12.33 19.44 12H17.42Z"
              fill="#FECA57"
            />
            <path
              d="M21.5 5H19.5V3C19.5 2.45 19.05 2 18.5 2C17.95 2 17.5 2.45 17.5 3V5H15.5C14.95 5 14.5 5.45 14.5 6C14.5 6.55 14.95 7 15.5 7H17.5V9C17.5 9.55 17.95 10 18.5 10C19.05 10 19.5 9.55 19.5 9V7H21.5C22.05 7 22.5 6.55 22.5 6C22.5 5.45 22.05 5 21.5 5Z"
              fill="#FECA57"
            />
          </svg>
        </div>
        <!-- payment request  -->
        <div
          class="w-14 aspect-square rounded-full bg-warning-20 flex items-center justify-center"
          v-if="item?.type === 'payment-request'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13.41 18.09V18.67C13.41 19.4 12.81 20 12.08 20H12.07C11.34 20 10.74 19.4 10.74 18.67V18.07C9.41 17.79 8.23 17.06 7.73 15.83C7.5 15.28 7.93 14.67 8.53 14.67H8.77C9.14 14.67 9.44 14.92 9.58 15.27C9.87 16.02 10.63 16.54 12.09 16.54C14.05 16.54 14.49 15.56 14.49 14.95C14.49 14.12 14.05 13.34 11.82 12.81C9.34 12.21 7.64 11.19 7.64 9.14C7.64 7.42 9.03 6.3 10.75 5.93V5.33C10.75 4.6 11.35 4 12.08 4H12.09C12.82 4 13.42 4.6 13.42 5.33V5.95C14.8 6.29 15.67 7.15 16.05 8.21C16.25 8.76 15.83 9.34 15.24 9.34H14.98C14.61 9.34 14.31 9.08 14.21 8.72C13.98 7.96 13.35 7.47 12.09 7.47C10.59 7.47 9.69 8.15 9.69 9.11C9.69 9.95 10.34 10.5 12.36 11.02C14.38 11.54 16.54 12.41 16.54 14.93C16.52 16.76 15.15 17.76 13.41 18.09Z"
              fill="#FF9F43"
            />
          </svg>
        </div>
      </div>
      <!-- content  -->
      <div>
        <p>
          <span class="text-base text-black-700">Booking approved by </span>
          <span class="text-lg text-green-main font-medium">{{
            item?.business_name
          }}</span>
        </p>
        <p class="text-sm text-black-600">{{ item?.service_name }}</p>
      </div>
    </div>
    <p class="text-sm text-grey-light min-w-max">12:54 PM</p>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    },
    methods: {
        getTime() {
        
    }
  }
};
</script>

<style scoped></style>
