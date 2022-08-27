export const denullify = (text) => {
  if (text === undefined || text === null) text = ' ';
  return text;
};

export function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const sendPush = (deviceTokens, event) => {
  console.log('send push to', deviceTokens);
  console.log("event", event)
  const url = 'https://fcm.googleapis.com/fcm/send';

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      registration_ids: deviceTokens,
      notification: {
        title: event.title,
        body: event.description,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
      'Accept-Encoding': 'gzip, deflate, br',
      Host: '<calculated when request is sent>',
      'Content-Length': '<calculated when request is sent>',
      Accept: '*/*',
      Authorization:
        'key=' + process.env.REACT_APP_FIREBASE_CLOUD_MESSAGING_KEY_API,
    },
  })
    .then((response) => response.text())
    .then((html) => console.log(html));
};
