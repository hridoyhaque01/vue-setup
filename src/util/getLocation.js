const getLocationCoordinates = async (locationName) => {
  try {
    const geocodingUrl = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(
      locationName
    )}&key=3b2158ee-5eb1-4439-8f09-731495da58bc`;

    const geocodingResp = await fetch(geocodingUrl, {
      method: "GET",
    });
    const geocodingData = await geocodingResp.json();

    if (geocodingData.hits && geocodingData.hits.length > 0) {
      return geocodingData;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

const searchPlaces = async (location) => {
  if (location?.length > 0) {
    try {
      const coordinates = await getLocationCoordinates(location);
      const parse = JSON.parse(JSON.stringify(coordinates));
      return parse;
    } catch (error) {
      return error;
    }
  } else {
    return [];
  }
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new google.maps.Geocoder();
          const latlng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                resolve({
                  latitude,
                  longitude,
                  name: results[0].formatted_address,
                  address: results[0].place_id,
                });
              } else {
                reject(new Error("No address found"));
              }
            } else {
              reject(new Error("Geocoder failed due to: " + status));
            }
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported"));
    }
  });
};

export { getCurrentLocation, searchPlaces };
