function getLocation() {
  const coords = document.getElementById("coords");
  const city = document.getElementById("city");


  coords.innerText = "";
  city.innerText = "";

  if (!navigator.geolocation) {
    coords.innerText = "❌ Geolocation is not supported by your browser.";
    return;
  }

  coords.innerText = "📍 Getting your location...";

 
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      coords.innerText = `📍 Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`;

      
      try {
        const response = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`);
        const data = await response.json();

        if (data && data.address) {
          const place =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            "Unknown location";

          const state = data.address.state || "";
          const country = data.address.country || "";

          city.innerText = `You are near: ${place}, ${state} ${country}`;
        } else {
          city.innerText = "⚠️ Unable to determine your city name.";
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
        city.innerText = "❗ There was a problem retrieving your location details.";
      }
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          coords.innerText = "❌ Permission denied. Please allow location access.";
          break;
        case error.POSITION_UNAVAILABLE:
          coords.innerText = "⚠️ Location information is unavailable.";
          break;
        case error.TIMEOUT:
          coords.innerText = "⌛ Request timed out. Please try again.";
          break;
        default:
          coords.innerText = "❗ An unknown error occurred.";
      }
    }
  );
}
