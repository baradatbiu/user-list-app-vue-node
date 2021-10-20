import { Filters, Result, User, Users } from "@/types/user";
import { createStore } from "vuex";

export default createStore({
  state: {
    users: [] as Users,
    loading: false,
    currentFilter: "" as Filters,
    directSortOrder: true,
    currentUser: {} as User,
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
    REMOVE_USER(state, { userId }) {
      state.users = state.users.filter(({ id }) => id !== userId);
    },
    SET_CURRENT_USER(state, { userId }) {
      const user = state.users.find(({ id }) => id === userId);

      if (user) state.currentUser = user;
    },
    CLEAR_CURRENT_USER(state) {
      state.currentUser = {} as User;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        commit("SET_LOADING", true);

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

        commit("SET_USERS", users);
      } catch (error) {
        console.log(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    setCurrentUser({ commit }, { userId }) {
      commit("SET_CURRENT_USER", { userId });
    },
    clearCurrentUser({ commit }) {
      commit("CLEAR_CURRENT_USER");
    },
    changeSortFilter({ commit }, filter: Filters) {
      commit("SET_CURRENT_FILTER", filter);
    },
    toogleSortOrder({ commit }) {
      commit("TOOGLE_SORT_ORDER");
    },
    removeUser({ commit }, { userId }) {
      commit("REMOVE_USER", { userId });
    },
  },
});
