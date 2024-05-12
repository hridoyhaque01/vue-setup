<template>
  <div v-if="notifications.length > 0">
    <ul>
      <li v-for="notification in notifications" :key="notification.id">
        {{ notification?.notificationMessage }}
      </li>
    </ul>
  </div>
</template>

<script>
import Echo from "laravel-echo";

export default {
  data() {
    return {
      notifications: [],
    };
  },
  mounted() {
    const echo = new Echo({
      broadcaster: "pusher",
      key: "cb4c556076e700034c7c",
      cluster: "ap2",
      encrypted: true,
    });

    echo
      .channel("user-booking-notifications")
      .listen("UserBookingNotification", (notification) => {
        console.log("tag", "");
        this.notifications.push(notification);
      });
  },
};
</script>
