importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "",
    authDomain: "rajasthan-hackathon-project.firebaseapp.com",
    projectId: "rajasthan-hackathon-project",
    storageBucket: "rajasthan-hackathon-project.appspot.com",
    messagingSenderId: "1065541948138",
    appId: "1:1065541948138:web:8a546431c5ec39300d3d93",
    measurementId: "G-24QQ6YLZB5"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});