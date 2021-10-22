import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import { mutations } from "@/store/mutations";
import { state } from "@/store/state";
import { actions, ActionTypes } from "@/store/actions";
import { createStore } from "vuex";
import { response } from "./results";

const store = createStore({
  state,
  mutations,
  actions,
});

describe("actions", () => {
  it("fetch users", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(response));

    await store.dispatch(ActionTypes.FETCH_USERS);

    expect(store.state.users).toHaveLength(response.results.length);

    fetchMock.resetMocks();
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
