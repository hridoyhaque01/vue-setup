<template>
  <div class="flex items-center justify-center gap-1">
    <span v-for="(star, index) in stars" :key="index">
      <div v-html="star"></div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  computed: {
    stars() {
      const fullStarCount = Math.floor(this.rating);
      const hasHalfStar = this.rating % 1 >= 0.01;
      const starCount = hasHalfStar ? fullStarCount + 1 : fullStarCount;
      const emptyStarCount = 5 - starCount;
      const stars = [];
      for (let i = 0; i < fullStarCount; i++) {
        stars.push(this.fillStarSvg);
      }
      if (hasHalfStar) {
        stars.push(this.halfFillStarSvg);
      }
      for (let i = 0; i < emptyStarCount; i++) {
        stars.push(this.strokeStarSvg);
      }

      return stars;
    },
  },
  data() {
    return {
      fillStarSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 40 41" fill="none">
                    <path d="M20.0001 29.7003L26.9168 33.8836C28.1835 34.6503 29.7335 33.5169 29.4001 32.0836L27.5668 24.2169L33.6835 18.9169C34.8001 17.9503 34.2001 16.1169 32.7335 16.0003L24.6835 15.3169L21.5335 7.88359C20.9668 6.53359 19.0335 6.53359 18.4668 7.88359L15.3168 15.3003L7.26679 15.9836C5.80012 16.1003 5.20012 17.9336 6.31679 18.9003L12.4335 24.2003L10.6001 32.0669C10.2668 33.5003 11.8168 34.6336 13.0835 33.8669L20.0001 29.7003Z" fill="#F2C963"/>
                    </svg>`,
      strokeStarSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 40 41" fill="none">
                    <path d="M20.0001 29.7003L26.9168 33.8836C28.1835 34.6503 29.7335 33.5169 29.4001 32.0836L27.5668 24.2169L33.6835 18.9169C34.8001 17.9503 34.2001 16.1169 32.7335 16.0003L24.6835 15.3169L21.5335 7.88359C20.9668 6.53359 19.0335 6.53359 18.4668 7.88359L15.3168 15.3003L7.26679 15.9836C5.80012 16.1003 5.20012 17.9336 6.31679 18.9003L12.4335 24.2003L10.6001 32.0669C10.2668 33.5003 11.8168 34.6336 13.0835 33.8669L20.0001 29.7003Z" stroke="#F2C963"/>
                    </svg>`,
      halfFillStarSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 40 41" fill="none">
                        <path d="M32.7477 15.9924L24.681 15.2924L21.531 7.87578C20.9643 6.52578 19.031 6.52578 18.4643 7.87578L15.3143 15.3091L7.26435 15.9924C5.79768 16.1091 5.19768 17.9424 6.31435 18.9091L12.431 24.2091L10.5977 32.0758C10.2643 33.5091 11.8143 34.6425 13.081 33.8758L19.9977 29.7091L26.9143 33.8925C28.181 34.6591 29.731 33.5258 29.3977 32.0925L27.5643 24.2091L33.681 18.9091C34.7977 17.9424 34.2143 16.1091 32.7477 15.9924ZM19.9977 26.5924V11.0924L22.8477 17.8258L30.1477 18.4591L24.6143 23.2591L26.281 30.3925L19.9977 26.5924Z" fill="#F2C963"/>
                        </svg>`,
    };
  },
};
</script>
