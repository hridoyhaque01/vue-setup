import Echo from "laravel-echo";

export const getNotifications = (setter) => {
  const echo = new Echo({
    broadcaster: "pusher",
    key: "cb4c556076e700034c7c",
    cluster: "ap2",
    encrypted: true,
  });

  echo
    .channel("user-booking-notifications")
    .listen("UserBookingNotification", (notification) => {
      console.log({ notification });
      setter.push(notification);
    });
};
