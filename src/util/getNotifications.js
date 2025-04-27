import Echo from "laravel-echo";

export const getNotifications = (fn) => {
  const echo = new Echo({
    broadcaster: "pusher",
    key: "cb4c556076e700034c7c",
    cluster: "ap2",
    encrypted: true,
  });

  echo
    .channel("user-notification")
    .listen("UserNotificationEvent", (notification) => {
      fn(notification);
    });
};
