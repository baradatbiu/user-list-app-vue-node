import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationTypes {
  SET_USERS = "SET_USERS",
  SET_LOADING = "SET_LOADING",
  SET_CURRENT_FILTER = "SET_CURRENT_FILTER",
  TOOGLE_SORT_ORDER = "TOOGLE_SORT_ORDER",
  REMOVE_USER = "REMOVE_USER",
  SET_CURRENT_USER = "SET_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_USERS](state: S, payload: State["users"]): void;
  [MutationTypes.SET_LOADING](state: S, payload: State["loading"]): void;
  [MutationTypes.SET_CURRENT_FILTER](
    state: S,
    payload: State["currentFilter"]
  ): void;
  [MutationTypes.TOOGLE_SORT_ORDER](state: S): void;
  [MutationTypes.REMOVE_USER](state: S, payload: { userId: string }): void;
  [MutationTypes.SET_CURRENT_USER](state: S, payload: { userId: string }): void;
  [MutationTypes.CLEAR_CURRENT_USER](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USERS](state, users) {
    state.users = users;
  },
  [MutationTypes.SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [MutationTypes.SET_CURRENT_FILTER](state, filter) {
    state.currentFilter = state.currentFilter === filter ? "" : filter;
  },
  [MutationTypes.TOOGLE_SORT_ORDER](state) {
    state.directSortOrder = !state.directSortOrder;
  },
  [MutationTypes.REMOVE_USER](state, { userId }) {
    state.users = state.users.filter(({ id }) => id !== userId);
  },
  [MutationTypes.SET_CURRENT_USER](state, { userId }) {
    const user = state.users.find(({ id }) => id === userId);

    if (user) state.currentUser = user;
  },
  [MutationTypes.CLEAR_CURRENT_USER](state) {
    state.currentUser = {};
  },
};
