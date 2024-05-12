<template>
  <div class="dropdown dropdown-end outline-none">
    <div
      tabindex="0"
      role="button"
      class="gap-1 max-w-max w-auto h-auto min-h-max p-0 bg-transparent hover:bg-transparent border-none shadow-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 26"
        fill="none"
        class="w-5 h-5 sm:w-7 sm:h-7"
      >
        <path
          d="M25.1991 0.166748H2.79768C1.25054 0.166748 0.010989 1.40523 0.010989 2.93405L-0.000488281 24.4124C-0.000488281 25.6759 1.54435 26.3087 2.44877 25.415L5.59813 22.3029H25.1991C26.7462 22.3029 27.9995 21.0644 27.9995 19.5356V2.93405C27.9995 1.40523 26.7462 0.166748 25.1991 0.166748ZM6.99836 9.85232H21.0007C21.7742 9.85232 22.4009 10.4716 22.4009 11.236C22.4009 12.0004 21.7742 12.6196 21.0007 12.6196H6.99836C6.22479 12.6196 5.59813 12.0004 5.59813 11.236C5.59813 10.4716 6.22479 9.85232 6.99836 9.85232ZM15.3997 16.7706H6.99836C6.22479 16.7706 5.59813 16.1513 5.59813 15.3869C5.59813 14.6225 6.22479 14.0033 6.99836 14.0033H15.3997C16.1733 14.0033 16.8 14.6225 16.8 15.3869C16.8 16.1491 16.1733 16.7706 15.3997 16.7706ZM21.0007 8.46867H6.99836C6.22479 8.46867 5.59813 7.84943 5.59813 7.08501C5.59813 6.3206 6.22479 5.70136 6.99836 5.70136H21.0007C21.7742 5.70136 22.4009 6.3206 22.4009 7.08501C22.4009 7.84943 21.7719 8.46867 21.0007 8.46867Z"
          fill="#D1D1D1"
        />
      </svg>
    </div>
    <div
      tabindex="0"
      class="dropdown-content z-[999] p-4 xs:px-6 pr-0 shadow-card bg-white w-[310px] left-[-214px] xs:left-[-290px] sm:left-auto xs:right-0 xs:w-[382px] md:w-[606px] rounded-lg mt-4"
    >
      <div class="flex flex-col gap-4 xs:gap-6 max-h-[640px] overflow-auto pr-6">
        <!-- new  -->
        <div>
          <div class="flex items-center gap-4">
            <h4 class="text-base sm:text-lg text-black-100 font-medium">New</h4>
            <span
              class="inline-flex items-center justify-center min-w-[20px] h-[20px] bg-green-100 text-green-main rounded-full shrink-0 text-xs p-0.5"
              >2</span
            >
          </div>

          <!-- cards  -->

          <div class="flex flex-col gap-4 mt-4 xs:mt-6">
            <!-- single card  -->
            <div class="py-3 px-3 xs:px-4 bg-white-60 rounded-lg">
              <div class="flex items-start justify-between gap-2 xs:gap-4 whitespace-normal">
                <div class="w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden">
                  <img :src="profile" alt="" class="w-full bg-cover object-cover bg-center" />
                </div>
                <div class="inline-flex flex-col gap-2 xs:gap-4">
                  <h4 class="text-grey-100 text-sm sm:text-base lg:text-lg w-full">
                    <router-link to="/" class="text-green-main">Netro Repairing Corp. </router-link>
                    requested for the payment.
                  </h4>
                  <router-link
                    to="/"
                    class="py-2 px-5 rounded-full bg-green-main font-medium text-white text-sm sm:text-base w-max"
                    >Pay Now</router-link
                  >
                </div>

                <span class="text-xs sm:text-sm text-grey-light font-medium shrink-0"
                  >12:54 PM</span
                >
              </div>
            </div>
            <!-- single card  -->
            <div class="py-3 px-3 xs:px-4 bg-white-60 rounded-lg">
              <div class="flex items-start justify-between gap-2 xs:gap-4 whitespace-normal">
                <div class="w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden">
                  <img :src="profile" alt="" class="w-full bg-cover object-cover bg-center" />
                </div>
                <div class="inline-flex flex-col gap-2 xs:gap-4">
                  <h4 class="text-grey-100 text-sm sm:text-base lg:text-lg w-full text-left">
                    You have a booked an appointment with
                    <router-link to="/" class="text-green-main"
                      >Linse Works Corporation.</router-link
                    >
                  </h4>
                </div>

                <span class="text-xs sm:text-sm text-grey-light font-medium shrink-0"
                  >12:54 PM</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- date  -->
        <div>
          <div class="flex items-center gap-4">
            <h4 class="text-base sm:text-lg text-black-100 font-medium">6/11/2022</h4>
            <span
              class="inline-flex items-center justify-center min-w-[20px] h-[20px] bg-green-100 text-green-main rounded-full shrink-0 text-xs p-0.5"
              >2</span
            >
          </div>

          <!-- cards  -->

          <div class="flex flex-col gap-4 mt-4 xs:mt-6">
            <!-- single card  -->
            <div class="py-3 px-3 xs:px-4 bg-white-60 rounded-lg">
              <div class="flex items-start justify-between gap-4 whitespace-normal">
                <div class="w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden">
                  <img :src="profile" alt="" class="w-full bg-cover object-cover bg-center" />
                </div>
                <div class="inline-flex flex-col gap-2 xs:gap-4">
                  <h4 class="text-grey-100 text-sm sm:text-base lg:text-lg w-full">
                    <router-link to="/" class="text-green-main"
                      >The Constructions Ride
                    </router-link>
                    messaged you. Goto
                  </h4>
                  <router-link
                    to="/"
                    class="py-2 px-5 rounded-full bg-green-main font-medium text-white text-sm sm:text-base w-max"
                    >Chat to View.</router-link
                  >
                </div>

                <span class="text-xs sm:text-sm text-grey-light font-medium shrink-0"
                  >12:54 PM</span
                >
              </div>
            </div>
            <!-- single card  -->
            <div class="py-3 px-3 xs:px-4 bg-white-60 rounded-lg">
              <div class="flex items-start justify-between gap-4 whitespace-normal">
                <div class="w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden">
                  <img :src="profile" alt="" class="w-full bg-cover object-cover bg-center" />
                </div>
                <div class="inline-flex flex-col gap-2 xs:gap-4">
                  <h4 class="text-grey-100 text-sm sm:text-base lg:text-lg w-full text-left">
                    Your reservation with
                    <router-link to="/" class="text-green-main">The Sample Business</router-link>
                    Hub was cancelled by business. Reason: Too many orders at a time.
                  </h4>
                </div>

                <span class="text-xs sm:text-sm text-grey-light font-medium shrink-0"
                  >12:54 PM</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { businessProfile } from '../../../assets/getAssets'
export default {
  data() {
    return {
      profile: businessProfile
    }
  }
}
</script>

<style scoped></style>
