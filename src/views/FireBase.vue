<template>
  <div class="w-full h-screen flex items-center justify-center">
    <button type="button" class="btn" @click="signinPopup">
      Google Signup
    </button>
  </div>
</template>
<!-- 
<script>
import { GoogleAuthProvider } from "firebase/auth";
export const googleAuthProvider = new GoogleAuthProvider();
</script> -->

<script>
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
export default {
  data() {
    return {
      auth: useFirebaseAuth(),
      googleAuthProvider: new GoogleAuthProvider(),
    };
  },
  methods: {
    signinPopup() {
      signInWithPopup(this.auth, this.googleAuthProvider)
        .then((res) => {
          console.log(res);
        })
        .catch((reason) => {
          console.error("Failed sign", reason);
        });
    },
  },
};
</script>
