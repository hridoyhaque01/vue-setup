<template>
  <GoogleMap
    :api-key="apiKey"
    style="
      width: 100%;
      height: 500px;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    "
    :center="center"
    :zoom="15"
    :options="mapOptions"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  data() {
    return {
      apiKey: import.meta.env.VITE_MAP_KEY,
      center: { lat: 40.689247, lng: -74.044502 },
      mapOptions: {
        zoomControl: false,
        mapTypeControl: false,
      },
    };
  },
  components: {
    GoogleMap,
    Marker,
  },
  methods: {
    onMapInitialized(map) {
      map.setOptions({ draggable: false });
    },
  },
};
</script>
