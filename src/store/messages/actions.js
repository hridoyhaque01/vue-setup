import instance from "@/util/instance";

export const getAllMessageUsers = async ({ commit }, payload) => {
  if (payload) {
    try {
      commit("setUserListStatus", { loading: true, error: false });
      const response = await instance.get(
        `/user/get_user_chat_user/${payload}`
      );
      const users = response?.data;
      commit("setMessageUsers", users);
      commit("setUserListStatus", { loading: false, error: false });
    } catch (error) {
      commit("setUserListStatus", { loading: false, error: true });
    }
  } else {
    return;
  }
};

export const getUserMessages = async ({ commit }, { user_id, business_id }) => {
  if (user_id && business_id) {
    try {
      commit("setMessages", []);
      commit("setMessageStatus", { loading: true, error: false });
      const response = await instance.get(
        `/user/get_message/${user_id}/${business_id}`
      );
      const users = response?.data?.data;
      commit("setMessages", users);
      commit("setMessageStatus", { loading: false, error: false });
    } catch (error) {
      commit("setMessageStatus", { loading: false, error: true });
    }
  } else {
    return;
  }
};
