export const setNotifications = (state, payload) => {
  state.notifications = payload;
};

export const setReadableNotifications = (state, payload) => {
  state.readableNotifications = payload;
};

export const setNotificationsFetched = (state, payload) => {
  state.isFetchedNotification = payload;
};

export const setReadableNotificationsFetched = (state, payload) => {
  state.isFetchedReadableNotification = payload;
};

export const setNotificationStatus = (state, payload) => {
  state.isLoading = payload?.loading;
  state.isError = payload?.error;
};

export const setReadableNotificationStatus = (state, payload) => {
  state.isReadbleLoading = payload?.loading;
  state.isReadbleError = payload?.error;
};
