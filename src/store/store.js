import { createStore } from "vuex";
import auth from "./auth";
import users from "./features/users";
import messages from "./messages";
import notifications from "./notifications";

const initalState = {
  users: users,
  notifications: notifications,
  messages: messages,
  auth: auth,
};

export const store = createStore({
  modules: initalState,
});

export const resetState = () => {
  Object.keys(store.state).forEach((key) => {
    Object.keys(store.state[key]).forEach((newKey) => {
      store.state[key][newKey] = initalState[key].state[newKey];
    });
  });
};
