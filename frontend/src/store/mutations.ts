import { MutationTree } from "vuex";
import { State } from "./state";
import { UserRatings, UserRating } from "@/types/user";

export enum MutationTypes {
  SET_USERS = "SET_USERS",
  SET_LOADING = "SET_LOADING",
  SET_CURRENT_FILTER = "SET_CURRENT_FILTER",
  TOOGLE_SORT_ORDER = "TOOGLE_SORT_ORDER",
  REMOVE_USER = "REMOVE_USER",
  SET_CURRENT_USER = "SET_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
  SET_USER_RATINGS = "SET_USER_RATINGS",
  UPDATE_USER_RATING = "UPDATE_USER_RATING",
  SET_CURRENT_USER_RATING = "SET_CURRENT_USER_RATING",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_USERS](state: S, payload: State["users"]): void;
  [MutationTypes.SET_LOADING](state: S, payload: State["loading"]): void;
  [MutationTypes.SET_CURRENT_FILTER](
    state: S,
    payload: State["currentFilter"]
  ): void;
  [MutationTypes.TOOGLE_SORT_ORDER](state: S): void;
  [MutationTypes.REMOVE_USER](state: S, payload: { userId: number }): void;
  [MutationTypes.SET_CURRENT_USER](
    state: S,
    payload: State["currentUser"]
  ): void;
  [MutationTypes.CLEAR_CURRENT_USER](state: S): void;
  [MutationTypes.SET_USER_RATINGS](state: S, payload: UserRatings): void;
  [MutationTypes.UPDATE_USER_RATING](state: S, payload: UserRating): void;
  [MutationTypes.SET_CURRENT_USER_RATING](state: S, payload: UserRating): void;
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
  [MutationTypes.SET_CURRENT_USER](state, user) {
    state.currentUser = user;
  },
  [MutationTypes.CLEAR_CURRENT_USER](state) {
    state.currentUser = {};
  },
  [MutationTypes.SET_USER_RATINGS](state, ratings) {
    state.users = state.users.map((user) => ({
      ...user,
      rating: ratings.find(({ id }) => id === user.id)?.rating || 0,
    }));
  },
  [MutationTypes.UPDATE_USER_RATING](state, newUserData) {
    state.users.map((user) => {
      if (user.id === newUserData.id) user.rating = newUserData.rating;
    });
  },
  [MutationTypes.SET_CURRENT_USER_RATING](state, { rating }) {
    state.currentUser.rating = rating;
  },
};
