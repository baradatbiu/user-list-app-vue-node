import { Filters, Result, Users } from "@/types/user";
import { createStore } from "vuex";

export default createStore({
  state: {
    users: [] as Users,
    loading: false,
    currentFilter: "" as Filters,
    directSortOrder: true,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_CURRENT_FILTER(state, filter) {
      state.currentFilter = state.currentFilter === filter ? "" : filter;
    },
    TOOGLE_SORT_ORDER(state) {
      state.directSortOrder = !state.directSortOrder;
    },
    REMOVE_USER(state, { id: userId }) {
      state.users = state.users.filter(({ id }) => id !== userId);
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        commit("SET_LOADING", true);

        const response = await fetch(
          "https://randomuser.me/api/?results=7&inc=name,email,login,phone,picture&noinfo"
        );
        const { results } = await response.json();

        const users = results.map((user: Result) => ({
          fullname: `${user.name.first} ${user.name.last}`,
          email: user.email,
          id: user.login.uuid,
          login: user.login.username,
          phone: user.phone,
          picture: user.picture,
        }));

        commit("SET_USERS", users);
      } catch (error) {
        console.log(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    changeSortFilter({ commit }, filter: Filters) {
      commit("SET_CURRENT_FILTER", filter);
    },
    toogleSortOrder({ commit }) {
      commit("TOOGLE_SORT_ORDER");
    },
    removeUser({ commit }, { id }) {
      commit("REMOVE_USER", { id });
    },
  },
});
