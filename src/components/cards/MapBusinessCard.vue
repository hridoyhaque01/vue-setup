<template>
  <div
    class="flex flex-col md:flex-row gap-3.5 md:pt-6 md:first:pt-0 cursor-pointer bg-white md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none min-w-[218px]"
    @click="handleNavigate()"
  >
    <div class="w-full md:max-w-[194px] h-32">
      <img
        :src="item?.thumbnail"
        alt="business"
        class="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div class="flex flex-col gap-2.5">
      <h4 class="text-black-900 text-xl font-medium">
        {{ item?.business_name }}
      </h4>
      <p class="text-grey-300 text-xs font-medium">
        {{ item?.address }}
      </p>
      <div class="flex items-center gap-1">
        <span class="text-grey-300 text-xs font-medium">{{
          item?.businessRating?.toFixed(1)
        }}</span>
        <MapRating :rating="item?.businessRating"></MapRating>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import MapRating from "../shared/others/MapRating.vue";
export default {
  props: {
    item: Object,
  },
  methods: {
    ...mapMutations(["setSelectBusiness"]),
    handleNavigate() {
      this.setSelectBusiness(this.item);
      if (
        this.item?.category_name &&
        this.item?.category_name?.toLowerCase() === "restaurant"
      ) {
        this.$router.push({ name: "restaurant-details" });
      } else {
        this.$router.push({ name: "business-details" });
      }
    },
  },
  components: {
    MapRating,
  },
};
</script>

<style scoped></style>
