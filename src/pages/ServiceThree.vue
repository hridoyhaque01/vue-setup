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
        <h1 class="text-lg font-medium mb-2">Service Three</h1>
        <router-link
          :to="{ name: 'service1' }"
          class="btn btn-success text-white"
          >Go to Service One</router-link
        >
      </div>
    </div>
  </section>
</template>
<script>
export default {
  mounted() {},
};
</script>

<style scoped></style>
