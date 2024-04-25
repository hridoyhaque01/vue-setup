<template>
  <div>
    <div id="pac-card">
      <input id="pac-input" type="text" placeholder="Enter a location" />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const input = document.getElementById("pac-input");
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      const { name, formatted_address } = place;
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
    });
  },
};
</script>

<style>
#pac-card {
  background-color: #fff;
  padding: 10px 14px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  margin: 10px;
}

#pac-input {
  font-size: 15px;
  padding: 0.5em;
  width: 100%;
  border: 1px solid #ccc;
}
</style>
