<template>
  <div
    class="w-full h-full overflow-auto lg:py-6 lg:px-8"
    :class="{ 'py-6 px-6 lg:px-8': !isMobileChatCotainerOpened }"
  >
    <div
      class="chat-container flex items-stretch rounded-lg shadow-messageBox"
      :class="{ 'border border-neutral-300': !isMobileChatCotainerOpened }"
    >
      <!-- mobile part -->

      <!-- User List mobile -->
      <div
        :class="{ hidden: selectedUser }"
        class="block w-full lg:hidden flex-shrink-0 bg-white rounded-lg border border-r-neutral-gray"
      >
        <!-- Search Bar -->
        <div class="px-5 pt-5 pb-4 bg-white">
          <!-- search box -->
          <div
            class="flex items-center gap-1 py-2 px-3 border border-neutral-300 rounded-lg bg-white-100"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.9772 14.4713H15.1872L14.9072 14.2013C16.1072 12.8013 16.7272 10.8913 16.3872 8.86133C15.9172 6.08133 13.5972 3.86133 10.7972 3.52133C6.56719 3.00133 3.00719 6.56133 3.52719 10.7913C3.86719 13.5913 6.08719 15.9113 8.86719 16.3813C10.8972 16.7213 12.8072 16.1013 14.2072 14.9013L14.4772 15.1813V15.9713L18.7272 20.2213C19.1372 20.6313 19.8072 20.6313 20.2172 20.2213C20.6272 19.8113 20.6272 19.1413 20.2172 18.7313L15.9772 14.4713ZM9.97719 14.4713C7.48719 14.4713 5.47719 12.4613 5.47719 9.97133C5.47719 7.48133 7.48719 5.47133 9.97719 5.47133C12.4672 5.47133 14.4772 7.48133 14.4772 9.97133C14.4772 12.4613 12.4672 14.4713 9.97719 14.4713Z"
                  fill="#D0D0D0"
                />
              </svg>
            </span>
            <input
              v-model="messageSearchQuery"
              @input="filterUserList"
              class="bg-transparent border-none outline-none focus:outline-none focus:border-none text-sm"
              placeholder="Search message.."
            />
          </div>
        </div>
        <!-- top -->
        <ul class="px-4">
          <li
            class="pb-3"
            v-for="(user, index) in filteredUserList"
            :key="index"
            @click="
              () => {
                selectUser(user)
                isMobileChatCotainerOpened = true
              }
            "
            :class="{ 'bg-main-white': selectedUser === user.userId }"
          >
            <div class="flex items-center gap-3 cursor-pointer" v-if="user.userId !== 1">
              <!-- photo   -->
              <div class="relative">
                <img :src="user.userImage" alt="User Image" class="rounded-full w-10 h-10" />
                <!-- online status svg -->
                <span class="absolute bottom-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <circle cx="7" cy="7" r="6" fill="#3DA172" stroke="white" stroke-width="2" />
                  </svg>
                </span>
              </div>
              <!-- details -->
              <div class="flex-1">
                <p class="text-black-900 text-xs sm:text-sm font-medium font-roboto leading-5">
                  {{ user.userName }}
                </p>
                <p class="text-black-600 text-[10px] xs:text-sm font-roboto font-normal leading-4">
                  {{ user.userStatus }}
                </p>
              </div>
              <div v-if="user.unreadMessages > 0" class="badge">
                <!-- Apply red background badge -->
                {{ user.unreadMessages }}+
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- mobile chat container -->

      <div
        :class="{ hidden: !selectedUser }"
        class="relative w-full flex rounded-lg lg:hidden flex-col"
      >
        <!-- top -->
        <div
          v-if="selectedUser"
          class="bg-white p-5 border-t-0 border-b border-b-neutral-gray flex justify-between"
        >
          <!-- back -->
          <div
            class="flex items-center gap-1 cursor-pointer"
            @click="
              () => {
                selectUser(null)
                isMobileChatCotainerOpened = false
              }
            "
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.3307 7.33317H5.2174L8.94406 3.6065L7.9974 2.6665L2.66406 7.99984L7.9974 13.3332L8.9374 12.3932L5.2174 8.6665H13.3307V7.33317Z"
                  fill="#212121"
                />
              </svg>
            </span>
            <span class="font-roboto text-base font-medium text-black-900 leading-6">Back</span>
          </div>

          <div class="flex flex-row-reverse gap-1 sm:gap-3 items-center">
            <!-- photo -->
            <div class="relative">
              <img :src="selectedUser?.userImage" class="rounded-full w-10 h-10" />
              <!-- online status svg -->
              <span class="absolute bottom-0 right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <circle cx="7" cy="7" r="6" fill="#3DA172" stroke="white" stroke-width="2" />
                </svg>
              </span>
            </div>
            <!-- id -->
            <div>
              <h5 class="text-black-800 font-inter text-sm font-medium text-right">
                {{ selectedUser?.userName }}
              </h5>
              <p class="text-[10px] text-black-500 font-normal text-right">Online 3 minutes ago</p>
            </div>
          </div>
        </div>

        <!-- middle -->
        <div
          v-if="selectedUser"
          class="flex-1 w-full h-full bg-gray-25 flex flex-col justify-between overflow-auto"
        >
          <div
            class="max-h-[90vh] flex-1 flex flex-col overflow-y-auto"
            ref="mobileMessageContainer"
          >
            <!-- Display messages for the selected user -->
            <div
              class="mb-3 px-4"
              v-for="(message, index) in sortedMessages"
              :key="message?.messageId"
            >
              <div
                :class="{
                  'flex justify-end ': message.senderId === currentUser.userId,
                  'flex justify-start': message.senderId !== currentUser.userId
                }"
              >
                <div
                  class="flex items-end gap-2 py-3"
                  :class="{
                    'flex-row-reverse ': message.senderId === currentUser.userId,
                    '': message.senderId !== currentUser.userId
                  }"
                >
                  <!-- photo -->
                  <div class="relative flex-shrink-0 mb-4">
                    <img
                      :src="getUserById(message.senderId).userImage"
                      alt="User Image"
                      class="rounded-full w-6 h-6"
                    />
                    <!-- online status svg -->
                    <span v-if="isUserOnline(message.senderId)" class="absolute bottom-0 right-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <circle
                          cx="4"
                          cy="4"
                          r="3"
                          fill="#3DA172"
                          stroke="white"
                          stroke-width="1.5"
                        />
                      </svg>
                    </span>
                  </div>
                  <!-- message text -->
                  <div class="flex flex-col">
                    <div
                      :class="{
                        'flex flex-row-reverse items-start gap-2 max-w-full  text-black-700 font-roboto text-sm font-normal leading-5  ':
                          message.senderId === currentUser.userId,
                        'flex items-start gap-2 max-w-sm  text-white font-roboto text-sm font-normal leading-5  ':
                          message.senderId !== currentUser.userId
                      }"
                      class=""
                    >
                      <p
                        class="flex-1 break-all max-w-[90%]"
                        :class="{
                          ' bg-white px-3 py-[10px] rounded-lg rounded-b-none whitespace-pre-line ':
                            message.senderId === currentUser.userId,
                          ' bg-green-main px-3 py-[10px] rounded-lg rounded-b-none whitespace-pre-line ':
                            message.senderId !== currentUser.userId
                        }"
                      >
                        {{ message.message }}
                      </p>
                      <span class="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3.9974 6.6665C4.73378 6.6665 5.33073 7.26346 5.33073 7.99984C5.33073 8.73622 4.73378 9.33317 3.9974 9.33317C3.26102 9.33317 2.66406 8.73622 2.66406 7.99984C2.66406 7.26346 3.26102 6.6665 3.9974 6.6665Z"
                            fill="#E0E0E0"
                          />
                          <path
                            d="M7.9974 6.6665C8.73378 6.6665 9.33073 7.26346 9.33073 7.99984C9.33073 8.73622 8.73378 9.33317 7.9974 9.33317C7.26102 9.33317 6.66406 8.73622 6.66406 7.99984C6.66406 7.26346 7.26102 6.6665 7.9974 6.6665Z"
                            fill="#E0E0E0"
                          />
                          <path
                            d="M13.3307 7.99984C13.3307 7.26346 12.7338 6.6665 11.9974 6.6665C11.261 6.6665 10.6641 7.26346 10.6641 7.99984C10.6641 8.73622 11.261 9.33317 11.9974 9.33317C12.7338 9.33317 13.3307 8.73622 13.3307 7.99984Z"
                            fill="#E0E0E0"
                          />
                        </svg>
                      </span>
                    </div>
                    <!-- timestamp -->
                    <p
                      class="text-xs font-roboto font-normal leading-4 gray-timestamp text-gray-timestamp"
                      :class="{
                        'text-right': message.senderId === currentUser.userId,
                        'text-left': message.senderId !== currentUser.userId
                      }"
                    >
                      {{ formatTimestamp(message.sentAt) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Message input form -->
          <div
            class="flex-shrink-0 p-2 bg-white mt-auto rounded-lg rounded-t-none border border-t-neutral-gray"
          >
            <div class="flex flex-wrap items-center gap-4">
              <div
                class="border border-neutral-300 flex-1 flex flex-wrap items-center gap-2 lg:gap-8 bg-neutral-300 p-2 rounded-lg"
              >
                <textarea
                  class="resize-none flex-1 bg-transparent border-none outline-none text-sm"
                  v-model="newMessage"
                  placeholder="Type your message"
                ></textarea>
                <!-- attachment -->
                <div>
                  <label class="cursor-pointer" for="file">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M16 6.7477V17.3277C16 19.4177 14.47 21.2777 12.39 21.4777C10 21.7077 8 19.8377 8 17.4977V5.1377C8 3.8277 8.94 2.6377 10.24 2.5077C11.74 2.3577 13 3.5277 13 4.9977V15.4977C13 16.0477 12.55 16.4977 12 16.4977C11.45 16.4977 11 16.0477 11 15.4977V6.7477C11 6.3377 10.66 5.9977 10.25 5.9977C9.84 5.9977 9.5 6.3377 9.5 6.7477V15.3577C9.5 16.6677 10.44 17.8577 11.74 17.9877C13.24 18.1377 14.5 16.9677 14.5 15.4977V5.1677C14.5 3.0777 12.97 1.2177 10.89 1.0177C8.51 0.787705 6.5 2.6577 6.5 4.9977V17.2677C6.5 20.1377 8.6 22.7077 11.46 22.9777C14.75 23.2777 17.5 20.7177 17.5 17.4977V6.7477C17.5 6.3377 17.16 5.9977 16.75 5.9977C16.34 5.9977 16 6.3377 16 6.7477Z"
                        fill="#616161"
                      />
                    </svg>
                  </label>
                  <input type="file" id="file" class="hidden" />
                </div>
              </div>

              <button @click="sendMessage" class="flex-shrink-0 bg-green-600 p-4 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3.67344 20.4L21.1234 12.92C21.9334 12.57 21.9334 11.43 21.1234 11.08L3.67344 3.60002C3.01344 3.31002 2.28344 3.80002 2.28344 4.51002L2.27344 9.12002C2.27344 9.62002 2.64344 10.05 3.14344 10.11L17.2734 12L3.14344 13.88C2.64344 13.95 2.27344 14.38 2.27344 14.88L2.28344 19.49C2.28344 20.2 3.01344 20.69 3.67344 20.4Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ------------desktop part--------------- -->

      <!-- User List large-->
      <div
        class="hidden lg:block flex-shrink-0 bg-white rounded-l-lg border border-r-neutral-gray h-full overflow-y-auto"
      >
        <!-- Search Bar -->
        <div class="px-5 pt-5 pb-4 bg-white">
          <!-- search box -->
          <div
            class="flex items-center gap-1 py-2 px-3 border border-neutral-300 rounded-lg bg-white-100"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.9772 14.4713H15.1872L14.9072 14.2013C16.1072 12.8013 16.7272 10.8913 16.3872 8.86133C15.9172 6.08133 13.5972 3.86133 10.7972 3.52133C6.56719 3.00133 3.00719 6.56133 3.52719 10.7913C3.86719 13.5913 6.08719 15.9113 8.86719 16.3813C10.8972 16.7213 12.8072 16.1013 14.2072 14.9013L14.4772 15.1813V15.9713L18.7272 20.2213C19.1372 20.6313 19.8072 20.6313 20.2172 20.2213C20.6272 19.8113 20.6272 19.1413 20.2172 18.7313L15.9772 14.4713ZM9.97719 14.4713C7.48719 14.4713 5.47719 12.4613 5.47719 9.97133C5.47719 7.48133 7.48719 5.47133 9.97719 5.47133C12.4672 5.47133 14.4772 7.48133 14.4772 9.97133C14.4772 12.4613 12.4672 14.4713 9.97719 14.4713Z"
                  fill="#D0D0D0"
                />
              </svg>
            </span>
            <input
              v-model="messageSearchQuery"
              @input="filterUserList"
              class="bg-transparent border-none outline-none focus:outline-none focus:border-none text-sm"
              placeholder="Search message.."
            />
          </div>
        </div>
        <!-- top -->
        <ul class="px-0">
          <li
            class="py-3"
            v-for="(user, index) in filteredUserList"
            :key="index"
            :class="{ 'bg-main-white': selectedUser?.userId === user?.userId }"
            @click="
              () => {
                selectUser(user)
                isMobileChatCotainerOpened = true
              }
            "
          >
            <div class="flex items-center gap-3 cursor-pointer px-4" v-if="user?.userId !== 1">
              <!-- photo   -->
              <div class="relative">
                <img :src="user.userImage" alt="User Image" class="rounded-full w-10 h-10" />
                <!-- online status svg -->
                <span class="absolute bottom-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <circle cx="7" cy="7" r="6" fill="#3DA172" stroke="white" stroke-width="2" />
                  </svg>
                </span>
              </div>
              <!-- details -->
              <div class="flex-1">
                <p class="text-black-900 text-xs sm:text-sm font-medium font-roboto leading-5">
                  {{ user.userName }}
                </p>
                <p class="text-black-600 text-xs font-roboto font-normal leading-4">
                  {{ user.userStatus }}
                </p>
              </div>
              <div v-if="user.unreadMessages > 0" class="badge">
                <!-- Apply red background badge -->
                {{ user.unreadMessages }}+
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- large chat container -->
      <div class="hidden flex-1 rounded-r-lg lg:flex flex-col">
        <!-- top -->
        <div
          v-if="selectedUser"
          class="bg-white p-5 rounded-lg rounded-l-none rounded-b-none border border-b-neutral-gray"
        >
          <div class="flex gap-2 items-center">
            <!-- photo -->
            <div class="relative">
              <img :src="selectedUser?.userImage" class="rounded-full w-10 h-10" />
              <!-- online status svg -->
              <span class="absolute bottom-0 right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <circle cx="7" cy="7" r="6" fill="#3DA172" stroke="white" stroke-width="2" />
                </svg>
              </span>
            </div>
            <!-- id -->
            <div>
              <h5 class="text-black-800 font-inter text-sm font-medium leading-5">
                {{ selectedUser?.userName }}
              </h5>
              <p class="text-xs text-black-500 font-normal leading-[18px]">Online 3 minutes ago</p>
            </div>
          </div>
        </div>

        <!-- middle -->
        <div
          v-if="selectedUser"
          class="flex-1 w-full h-full bg-gray-25 flex flex-col justify-between overflow-auto"
        >
          <div class="max-h-[90vh] flex-1 flex flex-col overflow-y-auto" ref="messageContainer">
            <!-- Display messages for the selected user -->
            <div
              class="mb-3 px-4"
              v-for="(message, index) in sortedMessages"
              :key="message?.messageId"
            >
              <div
                :class="{
                  'flex justify-end ': message?.senderId === currentUser?.userId,
                  'flex justify-start': message?.senderId !== currentUser?.userId
                }"
              >
                <div
                  class="flex items-end gap-2 py-3"
                  :class="{
                    'flex-row-reverse ': message?.senderId === currentUser?.userId,
                    '': message.senderId !== currentUser?.userId
                  }"
                >
                  <!-- photo -->
                  <div class="relative flex-shrink-0 mb-4">
                    <img
                      :src="getUserById(message.senderId).userImage"
                      alt="User Image"
                      class="rounded-full w-6 h-6"
                    />
                    <!-- online status svg -->
                    <span v-if="isUserOnline(message.senderId)" class="absolute bottom-0 right-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <circle
                          cx="4"
                          cy="4"
                          r="3"
                          fill="#3DA172"
                          stroke="white"
                          stroke-width="1.5"
                        />
                      </svg>
                    </span>
                  </div>
                  <!-- message text -->
                  <div class="flex flex-col">
                    <div
                      :class="{
                        'flex flex-row-reverse items-start gap-2 max-w-full  text-black-700 font-roboto text-sm font-normal leading-5  ':
                          message?.senderId === currentUser?.userId,
                        'flex items-start gap-2 max-w-sm  text-white font-roboto text-sm font-normal leading-5  ':
                          message?.senderId !== currentUser?.userId
                      }"
                      class=""
                    >
                      <p
                        class="flex-1 break-all max-w-[90%]"
                        :class="{
                          ' bg-white px-3 py-[10px] rounded-lg rounded-b-none whitespace-pre-line ':
                            message?.senderId === currentUser?.userId,
                          ' bg-green-main px-3 py-[10px] rounded-lg rounded-b-none whitespace-pre-line ':
                            message?.senderId !== currentUser?.userId
                        }"
                      >
                        {{ message?.message }}
                      </p>
                      <span class="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3.9974 6.6665C4.73378 6.6665 5.33073 7.26346 5.33073 7.99984C5.33073 8.73622 4.73378 9.33317 3.9974 9.33317C3.26102 9.33317 2.66406 8.73622 2.66406 7.99984C2.66406 7.26346 3.26102 6.6665 3.9974 6.6665Z"
                            fill="#E0E0E0"
                          />
                          <path
                            d="M7.9974 6.6665C8.73378 6.6665 9.33073 7.26346 9.33073 7.99984C9.33073 8.73622 8.73378 9.33317 7.9974 9.33317C7.26102 9.33317 6.66406 8.73622 6.66406 7.99984C6.66406 7.26346 7.26102 6.6665 7.9974 6.6665Z"
                            fill="#E0E0E0"
                          />
                          <path
                            d="M13.3307 7.99984C13.3307 7.26346 12.7338 6.6665 11.9974 6.6665C11.261 6.6665 10.6641 7.26346 10.6641 7.99984C10.6641 8.73622 11.261 9.33317 11.9974 9.33317C12.7338 9.33317 13.3307 8.73622 13.3307 7.99984Z"
                            fill="#E0E0E0"
                          />
                        </svg>
                      </span>
                    </div>
                    <!-- timestamp -->
                    <p
                      class="text-xs font-roboto font-normal leading-4 gray-timestamp text-gray-timestamp"
                      :class="{
                        'text-right': message?.senderId === currentUser?.userId,
                        'text-left': message?.senderId !== currentUser?.userId
                      }"
                    >
                      {{ formatTimestamp(message.sentAt) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Message input form -->
          <div
            class="flex-shrink-0 p-2 bg-white mt-auto rounded-lg rounded-t-none border border-t-neutral-gray"
          >
            <div class="flex flex-wrap items-center gap-4">
              <div
                class="border border-neutral-300 flex-1 flex flex-wrap items-center gap-2 lg:gap-8 bg-neutral-300 p-2 rounded-lg"
              >
                <textarea
                  class="resize-none flex-1 bg-transparent border-none outline-none text-sm"
                  v-model="newMessage"
                  placeholder="Type your message"
                ></textarea>
                <!-- attachment -->
                <div>
                  <label class="cursor-pointer" for="file">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M16 6.7477V17.3277C16 19.4177 14.47 21.2777 12.39 21.4777C10 21.7077 8 19.8377 8 17.4977V5.1377C8 3.8277 8.94 2.6377 10.24 2.5077C11.74 2.3577 13 3.5277 13 4.9977V15.4977C13 16.0477 12.55 16.4977 12 16.4977C11.45 16.4977 11 16.0477 11 15.4977V6.7477C11 6.3377 10.66 5.9977 10.25 5.9977C9.84 5.9977 9.5 6.3377 9.5 6.7477V15.3577C9.5 16.6677 10.44 17.8577 11.74 17.9877C13.24 18.1377 14.5 16.9677 14.5 15.4977V5.1677C14.5 3.0777 12.97 1.2177 10.89 1.0177C8.51 0.787705 6.5 2.6577 6.5 4.9977V17.2677C6.5 20.1377 8.6 22.7077 11.46 22.9777C14.75 23.2777 17.5 20.7177 17.5 17.4977V6.7477C17.5 6.3377 17.16 5.9977 16.75 5.9977C16.34 5.9977 16 6.3377 16 6.7477Z"
                        fill="#616161"
                      />
                    </svg>
                  </label>
                  <input type="file" id="file" class="hidden" />
                </div>
              </div>

              <button @click="sendMessage" class="flex-shrink-0 bg-green-600 p-4 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3.67344 20.4L21.1234 12.92C21.9334 12.57 21.9334 11.43 21.1234 11.08L3.67344 3.60002C3.01344 3.31002 2.28344 3.80002 2.28344 4.51002L2.27344 9.12002C2.27344 9.62002 2.64344 10.05 3.14344 10.11L17.2734 12L3.14344 13.88C2.64344 13.95 2.27344 14.38 2.27344 14.88L2.28344 19.49C2.28344 20.2 3.01344 20.69 3.67344 20.4Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Display a blank page if no user is selected -->
        <div v-else class="h-full">
          <BlankPage></BlankPage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userphoto, logoBrand, logo } from '@/assets/getAssets'
import moment from 'moment'
import BlankPage from './BlankPage.vue'
export default {
  data() {
    return {
      currentUser: {
        userId: 1,
        userName: 'Jay Hargudson',
        userImage: 'https://randomuser.me/api/portraits/men/12.jpg',
        userStatus: 'Lorem ipsum'
      },
      userList: [
        {
          userId: 1,
          userName: 'Jay Hargudson',
          userImage: 'https://randomuser.me/api/portraits/women/12.jpg',
          userStatus: 'Lorem ipsum',
          userStatus: 'Lorem ipsum',
          userEmail: 'ayan@gmail.com',
          userStatus: 'Lorem ipsum dolor si amet',
          messageId: 0,
          unreadMessages: 0
        },

        {
          userId: 2,
          userName: 'Ayan',
          userImage: 'https://randomuser.me/api/portraits/men/13.jpg',
          userStatus: 'Lorem ipsum',
          userEmail: 'ayan@gmail.com',
          userStatus: 'Lorem ipsum dolor si amet',
          messageId: 1,
          unreadMessages: 0
        },

        {
          userId: 3,
          userName: 'Jay Hargudson',
          userImage: 'https://randomuser.me/api/portraits/men/14.jpg',
          userEmail: 'jay@gmail.com',
          userStatus: 'Lorem ipsum dolor si amet',
          messageId: 2
        },
        {
          userId: 4,
          userName: 'Lary Hargudson',
          userImage: 'https://randomuser.me/api/portraits/men/18.jpg',
          userEmail: 'lary@gmail.com',
          userStatus: 'Lorem ipsum dolor si amet',
          messageId: 3,
          unreadMessages: 5
        },
        {
          userId: 5,
          userName: 'Brain Hargudson',
          userImage: 'https://randomuser.me/api/portraits/men/16.jpg',
          userEmail: 'brian@gmail.com',
          userStatus: 'Lorem ipsum dolor si amet',
          messageId: 4,
          unreadMessages: 15
        },
        {
          userId: 6,
          userName: 'Jhon Hargudson',
          userImage: 'https://randomuser.me/api/portraits/men/17.jpg',
          userEmail: 'jhon@gmail.com',
          userStatus: 'Lorem ipsum dolor si amet',
          messageId: 5,
          unreadMessages: 0
        }
      ],
      selectedUser: null,
      newMessage: '',
      messages: {
        1: [
          {
            messageId: 1,
            senderId: 2,
            receiverId: 1,
            message: 'Hello!',
            sentAt: 1703728302
          },
          {
            messageId: 2,
            senderId: 1,
            receiverId: 2,
            message: 'Hi there!',
            sentAt: 1703728302
          }
        ],
        2: [
          {
            messageId: 3,
            senderId: 2,
            receiverId: 1,
            message: 'Hello!',
            sentAt: 1703728302
          },
          {
            messageId: 4,
            senderId: 1,
            receiverId: 2,
            message: 'Hi there!',
            sentAt: 1703728302
          }
        ],
        3: [
          {
            messageId: 5,
            senderId: 3,
            receiverId: 1,
            message: 'Hey!',
            sentAt: 1703728302
          },
          {
            messageId: 6,
            senderId: 1,
            receiverId: 3,
            message: 'Hi!',
            sentAt: 1703728302
          }
        ],
        4: [
          {
            messageId: 7,
            senderId: 4,
            receiverId: 1,
            message: 'Hello are you from bangladesh?',
            sentAt: 1703728302
          },
          {
            messageId: 8,
            senderId: 1,
            receiverId: 4,
            message: 'Hi there!',
            sentAt: 1703728302
          }
        ],
        5: [
          {
            messageId: 9,
            senderId: 5,
            receiverId: 1,
            message: 'Hello I am from Bagdad',
            sentAt: 1703728302
          },
          {
            messageId: 10,
            senderId: 1,
            receiverId: 5,
            message: 'Hi there!',
            sentAt: 1703728302
          }
        ],
        6: [
          {
            messageId: 11,
            senderId: 6,
            receiverId: 1,
            message: 'Hello I am from spain',
            sentAt: 1703728302
          },
          {
            messageId: 12,
            senderId: 1,
            receiverId: 6,
            message: 'Hi there!',
            sentAt: 1703728302
          }
        ]
      },
      messageSearchQuery: '',
      userphoto,
      logoBrand,
      logo,
      isMobileChatCotainerOpened: false,
      scrollPosition: 0
    }
  },
  methods: {
    selectUser(user) {
      this.selectedUser = user
      this.$nextTick(() => {
        const mobileContainer = this.$refs?.mobileMessageContainer
        if (mobileContainer) {
          mobileContainer.scrollTop = mobileContainer?.scrollHeight
        }
      })
      this.$nextTick(() => {
        const container = this.$refs?.messageContainer
        if (container) {
          container.scrollTop = container?.scrollHeight
        }
      })
    },

    sendMessage() {
      if (this.selectedUser && this.newMessage !== '') {
        const messageId = this.messages[this.selectedUser?.userId]?.length * 100
        // Create a new Date object representing the current date and time
        const currentDate = new Date()

        this.messages[this.selectedUser?.userId].push({
          messageId,
          senderId: this.currentUser?.userId,
          receiverId: this.selectedUser?.userId,
          message: this.newMessage.trim(),
          sentAt: Math.floor(currentDate.getTime() / 1000)
        })

        // Scroll to the bottom of the message container
        this.$nextTick(() => {
          const mobileContainer = this.$refs?.mobileMessageContainer
          mobileContainer.scrollTop = mobileContainer?.scrollHeight
        })
        this.$nextTick(() => {
          const container = this.$refs?.messageContainer
          container.scrollTop = container?.scrollHeight
        })

        this.newMessage = ''
      }
    },

    getUserById(userId) {
      return this.userList.find((user) => user.userId === userId) || {}
    },
    isUserOnline(userId) {
      // Dummy function
      return true
    },
    formatTimestamp(timestamp) {
      // Use moment to format the timestamp
      return moment(timestamp * 1000)
        .startOf('seconds')
        .fromNow()
    },
    filterUserList() {
      // No need to do anything here; the computed property will handle the filtering
    }
  },
  computed: {
    // Compute a sorted array of messages based on the sentAt timestamp
    sortedMessages() {
      const messages = this.messages[this.selectedUser?.userId] || []
      return messages.slice().sort((a, b) => a.sentAt - b.sentAt)
    },
    // Compute a filtered user list based on the search query
    filteredUserList() {
      const query = this.messageSearchQuery.toLowerCase()
      return this.userList.filter(
        (user) =>
          user.userName.toLowerCase().includes(query) ||
          user.userEmail.toLowerCase().includes(query)
      )
    }
  },

  components: {
    BlankPage
  }
}
</script>

<style scoped>
.chat-container {
  height: 100%;
}
.badge {
  display: flex;
  padding: 2px 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: #f04438;
  color: #fff;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 136%; /* 13.6px */
  letter-spacing: 0.05px;
}
</style>
