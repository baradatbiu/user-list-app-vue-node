import { createStore, DispatchOptions, Store as VuexStore } from "vuex";
import { Actions, actions } from "./actions";
import { mutations } from "./mutations";
import { State, state } from "./state";

export const store = createStore({
  state,
  mutations,
  actions,
});

export type Store = Omit<VuexStore<State>, "dispatch"> & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
