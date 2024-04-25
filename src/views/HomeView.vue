<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <ul>
      <li v-for="user in users">
        {{ user?.name }}
      </li>
    </ul>
    <button class="btn btn-primary">Show State</button>
    <button class="btn btn-primary" @click="resetState">Clear State</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { resetState } from "../store/store";
export default {
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
  },
  methods: {
    resetState,
  },
};
</script>

<style scoped></style>
