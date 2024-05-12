<template>
  <div>
    <div class="dropdown dropdown-end outline-none" ref="dropdown">
      <div
        tabindex="0"
        role="button"
        class="gap-1 max-w-max w-auto h-auto min-h-max p-0 bg-transparent hover:bg-transparent border-none shadow-none relative"
        @click="toggleDropdown(this.$refs)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 27 28"
          fill="none"
          class="w-5 h-5 sm:w-7 sm:h-7"
        >
          <path
            d="M23.9894 16.8781V10.2765C23.9894 4.58539 19.404 0 13.7129 0C8.0218 0 3.46893 4.58539 3.46893 10.2765V16.8781L0.802246 22.1465H26.7211L23.9894 16.8781Z"
            fill="#D1D1D1"
          />
          <path
            d="M13.7129 28C16.0869 28 18.0382 26.0488 18.0382 23.6748H9.3877C9.3877 26.0488 11.3389 28 13.7129 28Z"
            fill="#D1D1D1"
          />
        </svg>
        <div
          class="min-w-[22px] aspect-square text-xs text-white bg-green-main flex items-center justify-center rounded-full border-2 border-white absolute -top-2 -right-1"
        >
          2
        </div>
      </div>
      <div
        tabindex="0"
        class="dropdown-content z-[999] p-4 xs:px-6 shadow-card bg-white w-[310px] left-[-178px] xs:left-[-254px] sm:left-auto xs:right-0 xs:w-[382px] md:w-[606px] rounded-lg mt-4"
      >
        <!-- new content  -->
        <div>
          <!-- mark read button  -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <h4 class="text-base sm:text-lg text-black-100 font-medium">
                New
              </h4>
              <div
                class="inline-flex items-center justify-center min-w-[20px] aspect-square bg-green-100 text-green-main rounded-full shrink-0 text-xs p-0.5"
              >
                2
              </div>
            </div>
            <button type="button" class="text-xs font-semibold text-black-700">
              Mark all as read
            </button>
          </div>
          <!-- new notifications  -->

          <div class="flex flex-col gap-2">
            <NotificationCard :item="item" v-for="item in notifications" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading && !isError">Loading...</div>
    <div v-if="!isLoading && isError">Error...</div>
  </div>
</template>

<script>
import { businessProfile } from "@/assets/getAssets";
import NotificationCard from "@/components/cards/NotificationCard.vue";
import { getNotifications } from "@/util/getNotifications";
import { closeDropdown, toggleDropdown } from "@/util/handleDropdown";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    NotificationCard,
  },
  data() {
    return {
      profile: businessProfile,
      notifications: [],
      pusherNotifications: [],
    };
  },
  computed: {
    ...mapState({
      allNotifications: (state) => state.notifications.notifications,
      notificationLoading: (state) => state.notifications.isLoading,
      notificationError: (state) => state.notifications.isError,

      readableNotifications: (state) =>
        state.notifications.readableNotifications,
      isReadbleLoading: (state) => state.notifications.isReadbleLoading,
      isReadbleError: (state) => state.notifications.isReadbleError,
    }),
    isLoading() {
      return this.notificationLoading || this.isReadbleLoading;
    },
    isError() {
      return this.notificationError || this.isReadbleError;
    },
  },

  mounted() {
    this.getNotifications(this.pusherNotifications);
    document.body.addEventListener("click", (event) =>
      this.closeDropdown(event, this.$refs)
    );
    this.getAllNotifications();
    this.getAllReadableNotifications();
  },
  watch: {
    allNotifications(newValue) {
      if (newValue?.length) {
        this.getShowableNotifications();
      }
    },
    readableNotifications(newValue) {
      if (newValue?.length) {
        this.getShowableNotifications();
      }
    },
  },
  beforeUnmount() {
    document.body.addEventListener("click", (event) =>
      this.closeDropdown(event, this.$refs)
    );
  },
  methods: {
    ...mapActions(["getAllNotifications", "getAllReadableNotifications"]),
    closeDropdown,
    toggleDropdown,
    getNotifications,
    getShowableNotifications() {
      if (!this.allNotifications?.length) {
        this.notifications = [];
      }

      if (!this.readableNotifications?.length) {
        this.notifications = [...this.allNotifications];
      }
      const unreadNotifications = this.allNotifications.filter((item) => {
        const test = !this.readableNotifications.some(
          (readableItem) =>
            readableItem?.notification_id === item?.notification_id
        );
        return test;
      });
      this.notifications = unreadNotifications;
    },
  },
};
</script>

<style scoped></style>
