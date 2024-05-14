<template>
  <div
    v-for="user in 6"
    class="flex items-center gap-3 w-full py-3 px-4 cursor-pointer"
  >
    <div class="w-10 h-10 rounded-full skeleton"></div>
    <div class="flex-1">
      <div class="h-4 skeleton"></div>
      <div class="h-3 mt-1 skeleton"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
