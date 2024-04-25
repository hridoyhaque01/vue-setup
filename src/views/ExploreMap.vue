<template>
  <GoogleMap
    :api-key="apiKey"
    style="width: 100%; height: 100%; position: relative; z-index: 9"
    :center="{
      lat: Number(center?.latitude),
      lng: Number(center?.longitude),
    }"
    :zoom="10"
    :zoom-control="false"
    :fullscreen-control="false"
    :map-type-control="false"
    :street-view-control="false"
  >
    <Marker
      v-for="business in catogorizeBusiness"
      :options="{
        position: {
          lat: Number(business?.latitude),
          lng: Number(business?.longitude),
        },
        icon: customMarkerIcon,
      }"
    >
      <InfoWindow>
        <div class="w-full max-w-[260px] sm:max-w-[320px]">
          <div class="flex items-start gap-2 mb-2">
            <!-- images  -->
            <div class="w-16 h-16">
              <img
                :src="business?.thumbnail"
                alt=""
                class="w-full h-full object-cover bg-center rounded-lg"
              />
            </div>
            <!-- address  -->
            <div class="flex-1 ellipsis">
              <h4 class="text-base font-medium text-dark ellipsis w-full">
                {{ business?.business_name }}
              </h4>

              <!-- ratings  -->
              <div class="flex items-center gap-1 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 17.5198L16.15 20.0298C16.91 20.4898 17.84 19.8098 17.64 18.9498L16.54 14.2298L20.21 11.0498C20.88 10.4698 20.52 9.36977 19.64 9.29977L14.81 8.88977L12.92 4.42977C12.58 3.61977 11.42 3.61977 11.08 4.42977L9.19001 8.87977L4.36001 9.28977C3.48001 9.35977 3.12001 10.4598 3.79001 11.0398L7.46001 14.2198L6.36001 18.9398C6.16001 19.7998 7.09001 20.4798 7.85001 20.0198L12 17.5198Z"
                    fill="#F2C963"
                  ></path></svg
                ><span class="text-base font-medium text-black-900">{{
                  business?.businessRating
                }}</span
                ><span class="text-base font-medium text-green-main"
                  >({{ business?.totalReview }})</span
                >
              </div>
            </div>
          </div>
          <div>
            {{ business?.description }}
            <span class="text-green-main cursor-pointer">more details</span>
          </div>
        </div>
      </InfoWindow>
    </Marker>
    <Marker
      :options="{
        position: {
          lat: Number(center?.latitude),
          lng: Number(center?.longitude),
        },
      }"
    />
    <Circle
      :options="{
        center: {
          lat: Number(center?.latitude),
          lng: Number(center?.longitude),
        },
        radius: 50000,
        fillColor: '#1EC96B',
        fillOpacity: 0.3,
        strokeWeight: 0,
      }"
    />
  </GoogleMap>
</template>

<script>
import { marker } from "@/assets/getAssets";
import { Circle, GoogleMap, InfoWindow, Marker } from "vue3-google-map";

export default {
  props: {
    catogorizeBusiness: Array,
  },

  data() {
    return {
      apiKey: import.meta.env.VITE_MAP_KEY,
      center: { latitude: 24.3726268, longitude: 88.5580875 },
      mapOptions: {
        zoomControl: false,
        mapTypeControl: false,
      },
      customMarkerIcon: {
        url: marker,
      },
    };
  },
  components: {
    GoogleMap,
    Marker,
    InfoWindow,
    Circle,
  },
};
</script>
