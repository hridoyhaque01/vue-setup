<template>
  <div class="sm:p-6 h-screen bg-white-400">
    <button type="button" class="btn btn-primary" @click="setSetUser">
      Add User
    </button>
    <Message />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Notifications from "./components/shared/others/Notifications.vue";
import Message from "./pages/message/Message.vue";
export default {
  components: {
    Notifications,
    Message,
  },
  data() {
    return {
      name: "hello",
    };
  },
  methods: {
    ...mapMutations(["setNewMessageUser"]),
    setSetUser() {
      const timestamp = Date.now();
      const user = {
        id: 4,
        business_id: "bui1715489450027",
        user_id: "1713872894166",
        last_msg: "Hey",
        last_msg_timestamp: `${timestamp}`,
        activeTime: `${timestamp}`,
        businessName: "Hello world",
        businessImage:
          "https://server.kangabooking.com/../storage/business_profile_images/thumbnail_1715489632.png",
        userName: "Hridoy Haque",
        userImage:
          "https://server.kangabooking.com/../storage/user_images/user_1713940694.jpg",
      };

      this.setNewMessageUser(user);
    },
  },
};
</script>
