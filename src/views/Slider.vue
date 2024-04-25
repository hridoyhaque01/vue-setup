<template>
  <div class="w-full p-10">
    <swiper
      :slides-per-view="3"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>
        <div class="p-10 border">Slide 1</div>
      </swiper-slide>
      <swiper-slide>
        <div class="p-10 border">Slide 2</div>
      </swiper-slide>
      <swiper-slide>
        <div class="p-10 border">Slide 3</div>
      </swiper-slide>
      <swiper-slide>
        <div class="p-10 border">Slide 4</div>
      </swiper-slide>
      <swiper-slide>
        <div class="p-10 border">Slide 5</div>
      </swiper-slide>
      <swiper-slide>
        <div class="p-10 border">Slide 6</div>
      </swiper-slide>
      <swiper-slide>
        <div class="p-10 border">Slide 7</div>
      </swiper-slide>
    </swiper>

    <button class="btn mt-10" @click="() => changeActiveIndex(4)">
      change slider
    </button>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperInstance = ref(null);

    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
    };

    const onSlideChange = () => {
      console.log("Slide changed");
    };

    const changeActiveIndex = (index) => {
      if (swiperInstance.value) {
        swiperInstance.value.slideTo(index);
      }
    };

    return {
      onSwiper,
      onSlideChange,
      changeActiveIndex,
    };
  },
};
</script>
