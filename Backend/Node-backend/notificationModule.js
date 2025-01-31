const admin = require("firebase-admin");
require("dotenv").config();
const serviceAccount = require("./accountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (object) => {
  const registrationToken =
  "fQ2yJxlpr026qOZX6B9CZk:APA91bGLNFllyN-gG_eu4zDXmakCWbJnWI-vVETpvqMsfcfa6qWHAGA8ls14BSIHun3IuIfa0ifqTVKzBWBBJg0iIqwxnsZtAV2ymV1AgyI3LEozOeqyKyfxw9LH-1SMSjgViTzNyQzB";


  const message = {
    data: {
      // Custom data to be sent to the device
    },
    webpush: {
      notification: {
        title: `${object} Detected in the area`,
        body: "Please check the live feed",
        icon: "https://cdn.pixabay.com/photo/2016/11/19/12/24/path-1839000_1280.jpg",
        click_action: "https://www.google.com.",
        sound:
          "https://cdn.jsdelivr.net/npm/whatsapp-notification-sound@1.0.0/notification.mp3",
      },
    },
    token: registrationToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// sendNotification();

exports.sendNotification = sendNotification;
