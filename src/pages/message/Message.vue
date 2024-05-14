<template>
  <div class="w-full h-full border flex relative overflow-hidden">
    <!-- user content  -->
    <div class="w-full md:max-w-xs bg-white h-full relative">
      <!-- search  -->
      <div class="px-5 pt-5 pb-4" ref="searchRef">
        <div
          class="flex items-center bg-white-100 pl-3 rounded-lg border border-neutral300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.7549 14.2539H14.9649L14.6849 13.9839C15.6649 12.8439 16.2549 11.3639 16.2549 9.75391C16.2549 6.16391 13.3449 3.25391 9.75488 3.25391C6.16488 3.25391 3.25488 6.16391 3.25488 9.75391C3.25488 13.3439 6.16488 16.2539 9.75488 16.2539C11.3649 16.2539 12.8449 15.6639 13.9849 14.6839L14.2549 14.9639V15.7539L19.2549 20.7439L20.7449 19.2539L15.7549 14.2539ZM9.75488 14.2539C7.26488 14.2539 5.25488 12.2439 5.25488 9.75391C5.25488 7.26391 7.26488 5.25391 9.75488 5.25391C12.2449 5.25391 14.2549 7.26391 14.2549 9.75391C14.2549 12.2439 12.2449 14.2539 9.75488 14.2539Z"
              fill="#9E9E9E"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            class="pl-2 pr-3 py-2 text-sm sm:text-base w-full outline-none bg-transparent border-none placeholder:text-disable"
            v-model="searchValue"
          />
        </div>
      </div>
      <!-- user list  -->
      <div
        class="py-5 overflow-auto sidebar"
        :class="`h-[calc(100%-${usersListHeight})]`"
      >
        <div class="flex flex-col">
          <UserSkeleton v-if="isUsersLoading && !isUsersError" />
          <div class="p-4" v-else-if="!isUsersLoading && isUsersError">
            Something wrong
          </div>
          <div
            class="p-4"
            v-else-if="!isUsersLoading && !isUsersError && !users?.length"
          >
            No business user found
          </div>
          <div
            v-else-if="!isUsersLoading && !isUsersError && users?.length"
            v-for="user in users"
            @click="() => handleSelectUser(user)"
            class="flex items-center gap-3 w-full py-3 px-4 cursor-pointer"
            :class="
              user?.business_id == selectedUser?.business_id
                ? 'bg-main-white'
                : ''
            "
          >
            <div>
              <img
                :src="user?.businessImage"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-medium text-black-900">
                {{ user?.businessName }}
              </h4>
              <p class="text-xs text-black-600">
                {{ user?.last_msg }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- message content  -->
    <div
      class="w-full h-full absolute md:relative duration-200"
      :class="
        showMessage ? '-translate-x-0' : '-translate-x-full md:-translate-x-0'
      "
      ref="parentContentRef"
    >
      <!-- message content  -->

      <div
        v-if="!selectedUser?.business_id"
        class="bg-gray-25 h-full flex items-center justify-center"
      >
        <div class="relative">
          <img :src="chatmsgicon" alt="brand" class="mb-3 mx-auto" />
          <span class="font-inter font-semibold text-black-600 text-lg">
            Select an user first for chat.
          </span>
        </div>
      </div>

      <div
        class="h-full"
        :class="
          selectedUser?.business_id
            ? ''
            : 'opacity-0 invisible pointer-events-none'
        "
      >
        <div
          class="bg-white flex justify-between p-3 sm:p-4 md:p-5 gap-3"
          ref="userHeader"
        >
          <button
            type="button"
            class="flex items-center text-base font-medium text-black-900 gap-1 md:hidden"
            @click="showMessage = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13.3334 7.33464H5.22002L8.94669 3.60797L8.00002 2.66797L2.66669 8.0013L8.00002 13.3346L8.94002 12.3946L5.22002 8.66797H13.3334V7.33464Z"
                fill="#212121"
              /></svg
            ><span>Back</span>
          </button>
          <div class="flex gap-3">
            <div class="order-2 md:order-1">
              <img
                :src="selectedUser?.businessImage"
                alt=""
                class="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div class="flex-1 order-1 md:order-2">
              <h4
                class="text-sm font-medium text-black-900 text-right md:text-left"
              >
                {{ selectedUser?.businessName }}
              </h4>
              <p class="text-xs text-black-600 text-right md:text-left">
                {{ lastActive(selectedUser) }}
              </p>
            </div>
          </div>
        </div>
        <!-- message box  -->
        <div class="" :style="{ height: messageBoxHeight }">
          <div class="h-full flex items-end overflow-auto p-4">
            <div class="flex flex-col gap-4 w-full max-w-[calc(100%-80px)]">
              <div
                class="flex flex-col justify-between w-full"
                v-for="message in messages"
              >
                <div class="">
                  <div class="flex items-end gap-3">
                    <div class="shrink-0">
                      <img
                        :src="message?.userImage"
                        alt="User Image"
                        class="rounded-full w-10 aspect-square object-cover"
                        v-if="message?.chat_from == 'user'"
                      />
                      <img
                        :src="message?.businessImage"
                        alt="User Image"
                        class="rounded-full w-10 aspect-square object-cover"
                        v-else
                      />
                    </div>
                    <div
                      class="flex items-start gap-2 px-3 py-2.5 rounded-lg rounded-bl-none border"
                      :class="
                        message?.chat_from == 'user'
                          ? ''
                          : 'bg-green-msg text-white'
                      "
                    >
                      <p class="text-sm">
                        {{ message?.message }}
                      </p>
                      <button type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4.00008 6.66602C4.73646 6.66602 5.33341 7.26297 5.33341 7.99935C5.33341 8.73573 4.73646 9.33268 4.00008 9.33268C3.2637 9.33268 2.66675 8.73573 2.66675 7.99935C2.66675 7.26297 3.2637 6.66602 4.00008 6.66602Z"
                            fill="#E0E0E0"
                          />
                          <path
                            d="M8.00008 6.66602C8.73646 6.66602 9.33341 7.26297 9.33341 7.99935C9.33341 8.73573 8.73646 9.33268 8.00008 9.33268C7.2637 9.33268 6.66675 8.73573 6.66675 7.99935C6.66675 7.26297 7.2637 6.66602 8.00008 6.66602Z"
                            fill="#E0E0E0"
                          />
                          <path
                            d="M13.3334 7.99935C13.3334 7.26297 12.7365 6.66602 12.0001 6.66602C11.2637 6.66602 10.6667 7.26297 10.6667 7.99935C10.6667 8.73573 11.2637 9.33268 12.0001 9.33268C12.7365 9.33268 13.3334 8.73573 13.3334 7.99935Z"
                            fill="#E0E0E0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="flex items-end gap-3">
                    <div class="shrink-0 w-10"></div>
                    <span class="text-xs text-gray-timestamp">{{
                      getMoment(message?.timestamp)
                    }}</span>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <!-- input field  -->
        <div class="bg-white p-2 sm:p-4 min-h-[64px] h-max" ref="messageInput">
          <form class="flex items-center gap-2 sm:gap-4">
            <div
              class="flex-1 flex items-center border h-auto border-neutral300 rounded-lg bg-white-100 gap-1 sm:gap-2 px-2 sm:px-3"
            >
              <div
                v-if="file?.name"
                class="w-full p-2 pl-0 flex items-center gap-2"
              >
                <img
                  :src="fileUrl"
                  alt=""
                  class="w-8 h-8 object-cover rounded"
                />
                <p class="ellipsis w-full">{{ file?.name }}</p>
              </div>
              <textarea
                v-if="!file?.name"
                placeholder="Search message. . ."
                v-model="messageText"
                ref="mesageRef"
                class="text-sm pt-1 sm:text-base h-full w-full max-h-20 outline-none bg-transparent border-none placeholder:text-disable sidebar resize-none leading-normal"
              ></textarea>
              <label for="messageFile" class="relative cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 6.74917V17.3292C16 19.4192 14.47 21.2792 12.39 21.4792C10 21.7092 8 19.8392 8 17.4992V5.13917C8 3.82917 8.94 2.63917 10.24 2.50917C11.74 2.35917 13 3.52917 13 4.99917V15.4992C13 16.0492 12.55 16.4992 12 16.4992C11.45 16.4992 11 16.0492 11 15.4992V6.74917C11 6.33917 10.66 5.99917 10.25 5.99917C9.84 5.99917 9.5 6.33917 9.5 6.74917V15.3592C9.5 16.6692 10.44 17.8592 11.74 17.9892C13.24 18.1392 14.5 16.9692 14.5 15.4992V5.16917C14.5 3.07917 12.97 1.21917 10.89 1.01917C8.51 0.789169 6.5 2.65917 6.5 4.99917V17.2692C6.5 20.1392 8.6 22.7092 11.46 22.9792C14.75 23.2792 17.5 20.7192 17.5 17.4992V6.74917C17.5 6.33917 17.16 5.99917 16.75 5.99917C16.34 5.99917 16 6.33917 16 6.74917Z"
                    fill="#616161"
                  />
                </svg>

                <input
                  id="messageFile"
                  type="file"
                  accept="image/jpeg, image/png"
                  class="absolute w-0.5 h-0.5 opacity-0 invisible"
                  @change="handleFile"
                  ref="imageRef"
                />
              </label>
            </div>
            <button type="submit" class="bg-green-600 p-3 sm:p-4 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  d="M3.67344 20.4L21.1234 12.92C21.9334 12.57 21.9334 11.43 21.1234 11.08L3.67344 3.60002C3.01344 3.31002 2.28344 3.80002 2.28344 4.51002L2.27344 9.12002C2.27344 9.62002 2.64344 10.05 3.14344 10.11L17.2734 12L3.14344 13.88C2.64344 13.95 2.27344 14.38 2.27344 14.88L2.28344 19.49C2.28344 20.2 3.01344 20.69 3.67344 20.4Z"
                  fill="white"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chatmsgicon } from "@/assets/getAssets";
import moment from "moment";
import { mapActions, mapMutations, mapState } from "vuex";
import UserSkeleton from "./UserSkeleton.vue";

export default {
  data() {
    return {
      chatmsgicon: chatmsgicon,
      showMessage: false,
      searchValue: "",
      messageBoxHeight: "",
      messageInputHeight: "28px",
      usersListHeight: "",
      messageText: "",
      file: null,
      fileUrl: null,
    };
  },

  components: {
    UserSkeleton,
  },

  computed: {
    ...mapState({
      auth: (state) => state.auth.auth,
      messageUsers: (state) => state.messages.messageUsers,
      selectedUser: (state) => state.messages.selectedUser,
      isUsersLoading: (state) => state.messages.isUsersLoading,
      isUsersError: (state) => state.messages.isUsersError,

      messages: (state) => state.messages.messages,
      isMessageLoading: (state) => state.messages.isMessageLoading,
      isMessageError: (state) => state.messages.isMessageError,
    }),
    users() {
      if (this.messageUsers?.length) {
        const users = this.messageUsers?.sort((a, b) => {
          const firstTimestamp = Number(a?.last_msg_timestamp);
          const secondTimestamp = Number(b?.last_msg_timestamp);
          return secondTimestamp - firstTimestamp;
        });
        return users;
      } else {
        return [];
      }
    },
  },

  mounted() {
    this.getAllMessageUsers(this.auth?.user_id);
    this.getHeights();
    this.setMessageHeight();
  },
  watch: {
    selectedUser(newValue) {
      this.getHeights();

      if (newValue?.user_id && newValue?.business_id) {
        this.getUserMessages({
          user_id: newValue?.user_id,
          business_id: newValue?.business_id,
        });
      }
    },
    messageText() {
      this.setMessageHeight();
      this.getHeights();
    },
  },

  methods: {
    ...mapActions(["getAllMessageUsers", "getUserMessages"]),
    ...mapMutations(["setSelectMessageUser"]),
    handleMessageBox(value) {},
    handleSelectUser(user) {
      this.setSelectMessageUser(user);
      this.showMessage = true;
    },
    handleFile(event) {
      const files = event.target.files;
      if (files?.length > 0) {
        const file = event.target.files[0];
        const imageURL = URL.createObjectURL(file);
        this.file = file;
        this.fileUrl = imageURL;
      } else {
        this.$refs.imageRef.current.value = "";
      }
    },
    getHeights() {
      const headerHeight = this.$refs.userHeader.clientHeight;
      const footerHeight = this.$refs.messageInput.clientHeight;
      const searchHeight = this.$refs.searchRef.clientHeight;
      const parentContentHeight = this.$refs.parentContentRef.clientHeight;
      this.usersListHeight = `${searchHeight}px`;
      const mainBox =
        parentContentHeight - (headerHeight + footerHeight) + "px";
      this.messageBoxHeight = mainBox;
    },
    setMessageHeight() {
      let textarea = this.$refs.mesageRef;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    lastActive(item) {
      if (item?.activeTime) {
        const givenUnixTimestamp = Number(item?.activeTime);
        const givenTime = moment(givenUnixTimestamp).add(5, "minutes");
        const currentTimePlus5Min = moment();
        const result = currentTimePlus5Min.isBefore(givenTime);
        if (result) {
          return "Active";
        } else {
          return "Last active " + this.getMoment(givenUnixTimestamp);
        }
      }
    },
    getMoment(timestamp) {
      if (timestamp) {
        return moment(Number(timestamp)).startOf("seconds").fromNow();
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped></style>
