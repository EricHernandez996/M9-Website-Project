function getLocation() {
  const coords = document.getElementById("coords");
  const city = document.getElementById("city");

  if (navigator.geolocation) {
    coords.innerText = "Getting your location...";

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      coords.innerText = `Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`;

      // Use a free API to convert coordinates to a city name
      try {
        const response = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`);
        const data = await response.json();

        if (data.address) {
          city.innerText = `You are near: ${data.address.city || data.address.town || data.address.village}, ${data.address.state}`;
        } else {
          city.innerText = "Unable to find city name.";
        }
      } catch (error) {
        city.innerText = "Error retrieving city information.";
      }
    },
    () => {
      coords.innerText = "Permission denied or location unavailable.";
    });
  } else {
    coords.innerText = "Geolocation not supported by this browser.";
  }
}
