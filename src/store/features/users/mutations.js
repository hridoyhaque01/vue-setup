import { store } from "../../store";

export const SET_USER = (state, user) => {
  state.users = { ...state.users, user };
};

// export const RESET_STATE = (state) => {
//   Object.keys(store.state).forEach((key) => {
//     console.log(store.state[key]);
//     // newState[key] = null; // or = initialState[key]
//   });
//   // state.users = [];
// };
