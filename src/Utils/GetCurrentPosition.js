export default function GetCurrentLocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    return {
      lat: crd.latitude,
      lng: crd.longitude,
    };
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  return navigator.geolocation.getCurrentPosition(success, error, options);
}
