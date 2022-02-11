import UserService from "@/services/UserService";
import { Filters, UserRatings, UserRating } from "@/types/user";

import { ActionTree, ActionContext } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { State } from "./state";

export enum ActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_CURRENT_USER = "FETCH_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
  CHANGE_SORT_FILTER = "CHANGE_SORT_FILTER",
  TOOGLE_SORT_ORDER = "TOOGLE_SORT_ORDER",
  REMOVE_USER = "REMOVE_USER",
  SET_USER_RATINGS = "SET_USER_RATINGS",
  UPDATE_USER_RATING = "UPDATE_USER_RATING",
  SET_CURRENT_USER_RATING = "SET_CURRENT_USER_RATING",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.FETCH_USERS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.FETCH_CURRENT_USER](
    { commit }: AugmentedActionContext,
    payload: { userId: number }
  ): void;
  [ActionTypes.CLEAR_CURRENT_USER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CHANGE_SORT_FILTER](
    { commit }: AugmentedActionContext,
    payload: Filters
  ): void;
  [ActionTypes.TOOGLE_SORT_ORDER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.REMOVE_USER](
    { commit }: AugmentedActionContext,
    payload: { userId: number }
  ): void;
  [ActionTypes.SET_USER_RATINGS](
    { commit }: AugmentedActionContext,
    payload: UserRatings
  ): void;
  [ActionTypes.UPDATE_USER_RATING](
    { commit }: AugmentedActionContext,
    payload: UserRating
  ): void;
  [ActionTypes.SET_CURRENT_USER_RATING](
    { commit }: AugmentedActionContext,
    payload: UserRating
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_USERS]({ commit }) {
    try {
      commit(MutationTypes.SET_LOADING, true);

      const { data: users } = await UserService.getAll();

      commit(MutationTypes.SET_USERS, users);
    } catch (error) {
      console.log(error);
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
  },
  async [ActionTypes.FETCH_CURRENT_USER]({ commit }, { userId }) {
    try {
      commit(MutationTypes.SET_LOADING, true);

      const { data: user } = await UserService.get({ userId });

      commit(MutationTypes.SET_CURRENT_USER, user);
    } catch (error) {
      console.log(error);
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
  },
  [ActionTypes.CLEAR_CURRENT_USER]({ commit }) {
    commit(MutationTypes.CLEAR_CURRENT_USER);
  },
  [ActionTypes.CHANGE_SORT_FILTER]({ commit }, filter) {
    commit(MutationTypes.SET_CURRENT_FILTER, filter);
  },
  [ActionTypes.TOOGLE_SORT_ORDER]({ commit }) {
    commit(MutationTypes.TOOGLE_SORT_ORDER);
  },
  async [ActionTypes.REMOVE_USER]({ commit }, { userId }) {
    try {
      await UserService.delete({ userId });

      commit(MutationTypes.REMOVE_USER, { userId });
    } catch (error) {
      console.log(error);
    }
  },
  [ActionTypes.SET_USER_RATINGS]({ commit }, ratings) {
    commit(MutationTypes.SET_USER_RATINGS, ratings);
  },
  [ActionTypes.UPDATE_USER_RATING]({ commit }, rating) {
    commit(MutationTypes.UPDATE_USER_RATING, rating);
  },
  [ActionTypes.SET_CURRENT_USER_RATING]({ commit }, rating) {
    commit(MutationTypes.SET_CURRENT_USER_RATING, rating);
  },
};
