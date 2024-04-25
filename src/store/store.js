import { createStore } from "vuex";
import users from "./features/users";

const initalState = {
  users: users,
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
