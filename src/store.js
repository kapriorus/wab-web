import { createStore } from "state-pool";

export const store = createStore("auth");
store.setState("auth", {
  host: null,
  idInstance: null,
  apiTokenInstance: null,
  phone: null,
});
