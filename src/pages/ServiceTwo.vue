<template>
  <section class="h-screen flex items-center justify-center">
    <div>
      <ul class="flex items-center gap-2 mb-4">
        <li>Home</li>
        <li>/</li>
        <li>About</li>
        <li>/</li>
        <li>Service</li>
      </ul>
      <div>
        <h1 class="text-lg font-medium mb-2">Service Two</h1>
        <router-link
          :to="{ name: 'service3' }"
          class="btn btn-success text-white"
          >GO to Service Three</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style scoped></style>
