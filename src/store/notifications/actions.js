import instance from "@/util/instance";
import { errorNotify } from "@/util/toastify";

export const getAllNotifications = async (
  { commit, state, rootState },
  payload
) => {
  if (!state.isFetchedNotification) {
    try {
      commit("setNotificationStatus", { loading: true, error: false });
      const response = await instance.get(
        `/user/get_notifications/1713872894166`
      );
      const notifications = response?.data?.data;
      commit("setNotifications", notifications);
      commit("setNotificationsFetched", true);
      commit("setNotificationStatus", { loading: false, error: false });
    } catch (error) {
      const status = error?.response?.status;
      if (status == 401) {
        errorNotify("Login sesion has expired");
      }
      commit("setNotificationsFetched", false);
      commit("setNotificationStatus", { loading: false, error: true });
    }
  } else {
    return;
  }
};

export const getAllReadableNotifications = async (
  { commit, state, rootState },
  payload
) => {
  if (!state.isFetchedReadableNotification) {
    try {
      commit("setReadableNotificationStatus", { loading: true, error: false });
      const response = await instance.get(
        `/user/read_notification/1713872894166`
      );
      const notifications = response?.data?.data;
      commit("setReadableNotifications", notifications);
      commit("setReadableNotificationsFetched", true);
      commit("setReadableNotificationStatus", { loading: false, error: false });
    } catch (error) {
      const status = error?.response?.status;
      if (status == 401) {
        errorNotify("Login sesion has expired");
      }
      commit("setReadableNotificationsFetched", false);
      commit("setReadableNotificationStatus", { loading: false, error: true });
    }
  } else {
    return;
  }
};
