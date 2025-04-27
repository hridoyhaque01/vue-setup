<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="relative">
      <img :src="chatmsgicon" alt="brand" class="mb-3 mx-auto" />
      <span class="font-inter font-semibold text-black-600 text-lg">
        Select an user first for chat.
      </span>
    </div>
  </div>
</template>

<script>
import { chatmsgicon } from '@/assets/getAssets'

export default {
  data() {
    return {
      chatmsgicon
    }
  }
}
</script>

<style scoped></style>
