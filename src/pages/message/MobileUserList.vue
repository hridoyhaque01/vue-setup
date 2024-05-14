<template>
     <div
        :class="{ hidden: selectedUser }"
        class="px-6 block w-full lg:hidden flex-shrink-0 bg-white rounded-lg border border-r-neutral-gray"
      >
        <!-- Search Bar -->
        <div class="lg:px-5 pt-5 pb-4 bg-white">
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
        <ul class="">
          <li
            class="py-3"
            v-for="user in filteredUserList"
            :key="user.userId"
            @click="selectUser(user.userId)"
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
              <div
                v-if="user.unreadMessages > 0"
                class="flex flex-col justify-center items-center gap-8 p-2 bg-red-500 rounded-full text-white font-inter text-xs font-semibold"
              >
                <!-- Apply red background badge -->
                {{ user.unreadMessages }}+
              </div>
            </div>
          </li>
        </ul>
      
      </div>
</template>

<script>
    export default {
        props:{
            selectedUser:Boolean,
            messageSearchQuery:String,
            filterUserList:Function,
            filteredUserList:Array
        }
        
    }
</script>

<style scoped>

</style>