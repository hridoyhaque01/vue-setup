<template>
  <main class="w-full h-screen flex flex-col items-center justify-center gap-4">
    <input type="text" v-model="count" class="outline-none border p-2" />

    <div class="flex items-center gap-6">
      <button
        type="button"
        class="btn w-20"
        @click="() => toggleCount('decreament')"
      >
        -
      </button>
      <div>{{ count }}</div>

      <button
        type="button"
        class="btn w-20"
        @click="() => toggleCount('increament')"
      >
        +
      </button>
    </div>
    <div v-if="count <= 5">
      <button>flk;jdsfklsdfsdfklj</button>
    </div>
    <router-link to="/about">Visit about</router-link>
  </main>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },

  watch: {
    count(newValue) {
      console.log(`watch = ${newValue}`);
    },
  },

  methods: {
    toggleCount(type) {
      if (type === "increament") {
        this.count++;
      } else {
        this.count--;
      }
    },
  },

  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");

    // alert("teeee");
  },
};
</script>
