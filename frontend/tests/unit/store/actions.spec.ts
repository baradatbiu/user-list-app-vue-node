import { mutations } from "@/store/mutations";
import { state } from "@/store/state";
import { actions, ActionTypes } from "@/store/actions";
import { createStore } from "vuex";
import { users as mockUsers } from "./users";

const store = createStore({
  state,
  mutations,
  actions,
});

jest.mock("@/services/UserService", () => ({
  getAll: jest.fn(() => Promise.resolve({ data: mockUsers })),
}));

describe("actions", () => {
  it("fetch users", async () => {
    await store.dispatch(ActionTypes.FETCH_USERS);

    expect(store.state.users).toHaveLength(mockUsers.length);
  });

  it("set current user", () => {
    const checkUser = store.state.users[1];

    store.dispatch(ActionTypes.SET_CURRENT_USER, { userId: checkUser.id });

    expect(store.state.currentUser).toEqual(checkUser);
  });

  it("clear current user", () => {
    store.dispatch(ActionTypes.CLEAR_CURRENT_USER);

    expect(store.state.currentUser).toEqual({});
  });

  it("remove user", () => {
    const checkUser = store.state.users[1];

    store.dispatch(ActionTypes.REMOVE_USER, { userId: checkUser.id });

    expect(store.state.users).toEqual(expect.not.arrayContaining([checkUser]));
  });
});
