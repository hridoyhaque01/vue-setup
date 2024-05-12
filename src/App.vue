<template>
  <div class="p-6 flex justify-end">
    <Notifications />
  </div>
</template>

<script>
import Notifications from "./components/shared/others/Notifications.vue";
export default {
  components: {
    Notifications,
  },
  data() {
    return {
      name: "hello",
    };
  },
};
</script>
