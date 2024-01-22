<template>
  <section class="w-full h-screen min-h-screen">
    <div class="w-full h-full grid md:grid-cols-2">
      <div class="h-full flex items-center justify-center sm:mt-0 p-6">
        <div class="w-full max-w-[440px] mx-auto" v-if="isShowLogin">
          <div class="text-center">
            <div class="w-full max-w-[128px] mx-auto mb-6">
              <img :src="logo" alt="" class="w-full" />
            </div>
            <h4 class="text-2xl font-medium text-black-900">
              Stay Connected with Kanga. Be an early tester when Kanga launches.
            </h4>
          </div>

          <!-- form content  -->
          <form action="#" class="mt-10" @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-6">
              <!-- name  -->
              <div>
                <input
                  type="name"
                  placeholder="Your Name"
                  v-model="name"
                  class="border border-neutral-300 rounded-lg placeholder:text-disable w-full p-4 outline-none"
                />
              </div>
              <!-- email  -->
              <div>
                <input
                  type="email"
                  v-model="email"
                  placeholder="Your email"
                  class="border border-neutral-300 rounded-lg placeholder:text-disable w-full p-4 outline-none"
                />
              </div>
            </div>

            <!-- submit button  -->

            <div class="mt-10">
              <button
                type="submit"
                class="px-10 py-4 rounded-lg bg-mainGradient w-full text-white font-medium"
                :disabled="checkValid"
              >
                Join the Waitlist
              </button>
            </div>
          </form>
        </div>
        <div
          class="w-full max-w-[440px] mx-auto flex flex-col items-center gap-4 text-center"
          v-else
        >
          <div class="w-36">
            <img :src="success" alt="" class="w-ffull" />
          </div>
          <h4 class="text-2xl font-medium text-black-900">
            Welcome to Kanga! We will notify you once Kanga goes live.
          </h4>
        </div>
      </div>
      <div
        class="hidden md:flex h-full flex-col justify-center bg-green-main md:px-6 lg:px-12 py-6 relative"
      >
        <div
          class="md:w-40 md:h-40 lg:w-80 lg:h-80 md:rounded-tr-[30px] md:rounded-bl-[30px] lg:rounded-tr-[50px] lg:rounded-bl-[50px] border border-green-400 absolute top-0 left-0 z-10"
        ></div>
        <div class="relative z-20">
          <div class="w-full max-w-[592px] mx-auto">
            <img :src="authBg" alt="" class="w-full" />
          </div>
          <div class="flex flex-col text-center text-white mt-10">
            <h2 class="md:text-2xl lg:text-3xl font-bold">Kanga is coming.</h2>
            <p class="leading-6 mt-2 lg:mt-4">
              Welcome to Kanga! By joining our waitlist, you’re stepping into an
              exciting journey with us. You’ll be among the first to know about
              our launch and receive exclusive updates. Thank you for your
              support. Stay tuned for more from Kanga! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { authBg, logo, success } from "../assets/getAssets";
import Password from "../components/shared/element/Password.vue";
export default {
  data() {
    return {
      authBg,
      logo,
      success,
      name: "",
      email: "",
      isShowLogin: true,
    };
  },
  computed: {
    checkValid() {
      if (this.name && this.email) {
        return false;
      } else {
        return true;
      }
    },
  },
  components: {
    Password,
  },
  methods: {
    handlePassword(newValue) {
      this.value = newValue;
    },
    handleSubmit() {
      const data = {
        name: this.name,
        email: this.email,
      };
      this.isShowLogin = false;
    },
  },
};
</script>
