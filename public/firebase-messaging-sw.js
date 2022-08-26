importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
	apiKey: "AIzaSyD84Kxx4bzBBr8sVCgCRhd7dhq8ap_9Pkw",
	authDomain: "gh-2022.firebaseapp.com",
	projectId: "gh-2022",
	storageBucket: "gh-2022.appspot.com",
	messagingSenderId: "341830089527",
	appId: "1:341830089527:web:2664d4aadcbf2fe86178b2",
	measurementId: "G-SX8CV9GVGE",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});