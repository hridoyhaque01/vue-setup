<template>
  <section class="w-full h-screen relative">
    <!-- google map  -->

    <div class="w-full h-full">
      <ExploreMap :catogorizeBusiness="catogorizeBusiness"></ExploreMap>
    </div>

    <!-- desktop device business -->

    <div class="absolute top-0 left-0 bottom-0 h-full w-full md:pl-4 lg:pl-10">
      <div class="w-full h-full flex">
        <!-- business  -->
        <div
          class="bg-white w-full h-full min-w-[340px] md:max-w-[340px] lg:max-w-[464px] relative z-10 hidden md:block duration-200"
        >
          <div class="p-6">
            <div
              class="flex items-center gap-1 px-3.5 border border-white-300 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18.7915 11.0051H7.62148L12.5015 6.1251C12.8915 5.7351 12.8915 5.0951 12.5015 4.7051C12.1115 4.3151 11.4815 4.3151 11.0915 4.7051L4.50148 11.2951C4.11148 11.6851 4.11148 12.3151 4.50148 12.7051L11.0915 19.2951C11.4815 19.6851 12.1115 19.6851 12.5015 19.2951C12.8915 18.9051 12.8915 18.2751 12.5015 17.8851L7.62148 13.0051H18.7915C19.3415 13.0051 19.7915 12.5551 19.7915 12.0051C19.7915 11.4551 19.3415 11.0051 18.7915 11.0051Z"
                  fill="black"
                />
              </svg>
              <input
                type="text"
                placeholder="Search anything"
                class="w-full py-4 outline-none border-none bg-transparent text-base"
                v-model="value"
              />
              <button
                type="button"
                v-if="value?.trim()?.length > 0"
                class="group"
                @click="value = ''"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    class="fill-white-300 group-hover:fill-black duration-200"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- business list  -->
          <div
            class="flex flex-col gap-6 divide-y divide-white-300 py-6 sidebar overflow-auto h-[calc(100%-112px)] p-6 pt-0"
          >
            <MapBusinessCardSkeleton
              v-for="item in 3"
              v-if="isLoading || isError"
            ></MapBusinessCardSkeleton>

            <MapBusinessCard
              v-for="(item, index) in finalBusiness"
              :key="index"
              :item="item"
              v-else-if="!isLoading && !isError && finalBusiness?.length > 0"
            ></MapBusinessCard>

            <div class="flex flex-col gap-1 items-center justify-center" v-else>
              <div class="w-full max-w-[48px]">
                <img :src="exclametory" alt="" class="w-full" />
              </div>
              <p class="text-lg text-white-300">No nearby places found!</p>
            </div>
          </div>
        </div>

        <!-- categories  -->
        <div class="w-full overflow-hidden px-6 py-6">
          <div
            class="flex items-center gap-1 px-3.5 bg-white w-full max- border border-white-300 rounded-xl mb-3 md:hidden relative z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.7915 11.0051H7.62148L12.5015 6.1251C12.8915 5.7351 12.8915 5.0951 12.5015 4.7051C12.1115 4.3151 11.4815 4.3151 11.0915 4.7051L4.50148 11.2951C4.11148 11.6851 4.11148 12.3151 4.50148 12.7051L11.0915 19.2951C11.4815 19.6851 12.1115 19.6851 12.5015 19.2951C12.8915 18.9051 12.8915 18.2751 12.5015 17.8851L7.62148 13.0051H18.7915C19.3415 13.0051 19.7915 12.5551 19.7915 12.0051C19.7915 11.4551 19.3415 11.0051 18.7915 11.0051Z"
                fill="black"
              />
            </svg>
            <input
              type="text"
              placeholder="Search anything"
              class="w-full py-4 outline-none border-none bg-transparent text-base"
              v-model="value"
            />
            <button
              type="button"
              v-if="value?.trim()?.length > 0"
              class="group"
              @click="value = ''"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  class="fill-white-300 group-hover:fill-black duration-200"
                />
              </svg>
            </button>
          </div>
          <div class="max-w-max mx-auto relative z-10 model_slide">
            <swiper
              :modules="modules"
              slidesPerView="auto"
              :freeMode="true"
              spaceBetween="8"
              :breakpoints="breakpoints"
              :navigation="{
                prevEl: '.recomend-prev',
                nextEl: '.recomend-next',
              }"
              class="w-full flex-1"
            >
              <swiper-slide class="max-w-max">
                <div
                  class="py-2.5 px-4 rounded-full bg-white text-sm font-medium border cursor-pointer"
                  @click="activeTab = 'All'"
                  :class="
                    activeTab === 'All'
                      ? 'border-green-main text-green-main'
                      : 'border-transparent text-black-900'
                  "
                >
                  All
                </div>
              </swiper-slide>
              <swiper-slide
                class="max-w-max"
                v-for="(category, index) in categories"
                :key="index"
              >
                <div
                  class="py-2.5 px-4 rounded-full bg-white text-sm font-medium border cursor-pointer"
                  :class="
                    activeTab === category?.category_name
                      ? 'border-green-main text-green-main'
                      : 'border-transparent text-black-900'
                  "
                  @click="activeTab = category?.category_name"
                >
                  {{ category?.category_name }}
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

    <!-- mobile device business -->

    <div class="absolute bottom-0 left-0 right-0 z-10 business_slide md:hidden">
      <div v-if="isLoading || isError" class="pb-6">
        <swiper
          :modules="modules"
          :slidesPerView="1"
          :freeMode="true"
          :spaceBetween="8"
          :breakpoints="breakpoints"
          :navigation="{
            prevEl: '.recomend-prev',
            nextEl: '.recomend-next',
          }"
          class="w-full flex-1"
        >
          <swiper-slide
            class="max-w-max"
            v-for="(item, index) in 3"
            :key="index"
          >
            <MapBusinessCardSkeleton></MapBusinessCardSkeleton>
          </swiper-slide>
        </swiper>
      </div>
      <div
        v-else-if="!isLoading && !isError && finalBusiness?.length > 0"
        class="pb-6"
      >
        <swiper
          :modules="modules"
          :slidesPerView="1"
          :freeMode="true"
          :spaceBetween="8"
          :breakpoints="breakpoints"
          :navigation="{
            prevEl: '.recomend-prev',
            nextEl: '.recomend-next',
          }"
          class="w-full flex-1"
        >
          <swiper-slide
            class="max-w-max"
            v-for="(item, index) in finalBusiness"
            :key="index"
          >
            <MapBusinessCard :item="item"></MapBusinessCard>
          </swiper-slide>
        </swiper>
      </div>
      <div
        class="flex flex-col gap-1 items-center justify-center bg-white p-3"
        v-else
      >
        <div class="w-full max-w-[24px]">
          <img :src="exclametory" alt="" class="w-full" />
        </div>
        <p class="text-base text-white-300">No nearby places found!</p>
      </div>
    </div>
  </section>
</template>

<script>
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import MapBusinessCard from "../components/cards/MapBusinessCard.vue";
import { businesses, categories } from "../util/data";
import { marker, exclametory } from "@/assets/getAssets";
import MapBusinessCardSkeleton from "./MapBusinessCardSkeleton.vue";
import ExploreMap from "./ExploreMap.vue";
export default {
  data() {
    return {
      value: "",
      businesses,
      categories,
      breakpoints: {
        380: {
          slidesPerView: "auto",
          spaceBetween: 8,
        },
      },
      exclametory,
      activeTab: "All",
      isLoading: true,
      isError: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    MapBusinessCard,
    MapBusinessCardSkeleton,
    ExploreMap,
  },

  computed: {
    catogorizeBusiness() {
      if (this.activeTab === "All") {
        return this.businesses;
      } else {
        const filteredBusiness = this.businesses?.filter(
          (business) => business?.category_name === this.activeTab
        );
        return filteredBusiness;
      }
    },
    finalBusiness() {
      if (this.value?.trim()?.length > 0) {
        const filteredBusiness = this.catogorizeBusiness?.filter((business) =>
          business?.business_name
            ?.toLowerCase()
            ?.includes(this.value?.toLowerCase())
        );
        return filteredBusiness;
      } else {
        return this.catogorizeBusiness;
      }
    },
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false;
      this.isError = false;
    }, 2000);
  },

  setup() {
    return {
      modules: [Navigation, A11y],
    };
  },
};
</script>
