export const setUserListStatus = (state, payload) => {
  state.isUsersLoading = payload?.loading;
  state.isUsersError = payload?.error;
};

export const setMessageUsers = (state, payload) => {
  state.messageUsers = [...payload]?.map((item) => {
    return { ...item, activeTime: item?.last_msg_timestamp };
  });
};

export const setNewMessageUser = (state, payload) => {
  const newUsers = state.messageUsers?.find(
    (item) => item?.business_id == payload?.business_id
  );

  if (newUsers?.business_id) {
    state.selectedUser = newUsers;
  } else {
    state.messageUsers = [...state.messageUsers, payload];
    state.selectedUser = payload;
  }
};

export const setSelectMessageUser = (state, payload) => {
  state.selectedUser = payload;
};

export const setMessageStatus = (state, payload) => {
  state.isMessageLoading = payload?.loading;
  state.isMessageError = payload?.error;
};

export const setMessages = (state, payload) => {
  state.messages = payload;
};
