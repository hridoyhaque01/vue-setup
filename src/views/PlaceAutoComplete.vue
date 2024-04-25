<template>
  <div class="flex items-center justify-center h-screen bg-slate-100">
    <div class="relative w-full">
      <div
        class="flex items-center bg-white px-3 rounded-xl gap-3 w-full max-w-2xl mx-auto"
      >
        <button @click="currentLocation()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="30"
            viewBox="0 0 22 30"
            fill="none"
          >
            <path
              d="M10.9951 0.0109863C4.93345 0.0109863 2.59931e-06 4.9464 0 11.0081C-3.79899e-06 21.674 10.3761 29.7824 10.3761 29.7824C10.7407 30.0727 11.2574 30.0727 11.6219 29.7824C11.6219 29.7824 22 21.674 22 11.0081C22 4.9464 17.0568 0.0109863 10.9951 0.0109863ZM10.9951 6.01134C13.744 6.01134 15.9996 8.25922 15.9996 11.0081C15.9997 13.7569 13.744 16.0106 10.9951 16.0106C8.24626 16.0106 5.99839 13.7569 5.9984 11.0081C5.99841 8.25922 8.24628 6.01134 10.9951 6.01134Z"
              fill="#F2C963"
            />
          </svg>
        </button>
        <input
          type="text"
          v-model="searchValue"
          v-bind="$attrs"
          id="pac-input"
          placeholder="Search"
          class="bg-transparent border-none outline-none py-3 pr-3 w-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentLocation } from "../util/getLocation";
export default {
  props: {
    value: String,
  },
  data() {
    return {
      searchValue: "",
      locations: [],
      apiKey: import.meta.env.VITE_MAP_KEY,
    };
  },
  watch: {
    value(newValue) {
      this.searchValue = newValue;
    },
  },
  mounted() {
    this.loadGoogleMapsScript(() => {
      this.getLocations();
      this.currentLocation();
    });
  },
  methods: {
    getCurrentLocation,
    loadGoogleMapsScript(callback) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
      script.onload = callback;
      document.head.appendChild(script);
    },
    getLocations() {
      const input = document.getElementById("pac-input");
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        const { name, place_id } = place;
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        const data = {
          name: name,
          address: place_id,
          latitude: latitude,
          longitude,
        };
      });
    },
    currentLocation() {
      console.log("jell");
      this.getCurrentLocation()
        .then((res) => {
          this.searchValue = res?.name;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
