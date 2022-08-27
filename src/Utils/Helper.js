export const denullify = (text) => {
  if (text === undefined || text === null) text = ' ';
  return text;
};

export const CalculateDistance = (lat1, long1, lat2, long2)=>{
	var distance =
		Math.sin(lat1 * Math.PI) * Math.sin(lat2 * Math.PI) +
		Math.cos(lat1 * Math.PI) *
			Math.cos(lat2 * Math.PI) *
			Math.cos(Math.abs(long1 - long2) * Math.PI);

	// Return the distance in miles
	//return Math.acos(distance) * 3958.754;

	// Return the distance in meters
	return Math.acos(distance) * 6370981.162;
}

export function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d*1000;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}