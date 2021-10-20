import { Filters, Result } from "@/types/user";

import { ActionTree, ActionContext } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { State } from "./state";

export enum ActionTypes {
  FETCH_USERS = "FETCH_USERS",
  SET_CURRENT_USER = "SET_CURRENT_USER",
  CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER",
  CHANGE_SORT_FILTER = "CHANGE_SORT_FILTER",
  TOOGLE_SORT_ORDER = "TOOGLE_SORT_ORDER",
  REMOVE_USER = "REMOVE_USER",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.FETCH_USERS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.SET_CURRENT_USER](
    { commit }: AugmentedActionContext,
    payload: { userId: string }
  ): void;
  [ActionTypes.CLEAR_CURRENT_USER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CHANGE_SORT_FILTER](
    { commit }: AugmentedActionContext,
    payload: Filters
  ): void;
  [ActionTypes.TOOGLE_SORT_ORDER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.REMOVE_USER](
    { commit }: AugmentedActionContext,
    payload: { userId: string }
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_USERS]({ commit }) {
    try {
      commit(MutationTypes.SET_LOADING, true);

      const response = await fetch(
        "https://randomuser.me/api/?results=7&inc=name,email,login,phone,picture,dob,location&noinfo"
      );
      const { results } = await response.json();

      const users = results.map((user: Result) => {
        const {
          name: { first, last },
          email,
          login: { uuid: id, username: login, password },
          phone,
          picture,
          location: {
            street: { name: street },
            city,
            postcode,
          },
          dob: { age },
        } = user;

        return {
          fullname: `${first} ${last}`,
          email,
          id,
          login,
          phone,
          picture,
          age,
          address: `${postcode} ${city} ${street}`,
          password,
        };
      });

      commit(MutationTypes.SET_USERS, users);
    } catch (error) {
      console.log(error);
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
  },
  [ActionTypes.SET_CURRENT_USER]({ commit }, { userId }) {
    commit(MutationTypes.SET_CURRENT_USER, { userId });
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
  [ActionTypes.REMOVE_USER]({ commit }, { userId }) {
    commit(MutationTypes.REMOVE_USER, { userId });
  },
};
