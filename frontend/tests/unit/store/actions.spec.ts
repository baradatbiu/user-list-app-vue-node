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

const mockUser = mockUsers[1];

jest.mock("@/services/UserService", () => ({
  getAll: jest.fn(() => Promise.resolve({ data: mockUsers })),
  get: jest.fn(() => Promise.resolve({ data: mockUser })),
  delete: jest.fn(() => Promise.resolve()),
}));

describe("actions", () => {
  it("fetch users", async () => {
    await store.dispatch(ActionTypes.FETCH_USERS);

    expect(store.state.users).toHaveLength(mockUsers.length);
  });

  it("fetch current user", async () => {
    await store.dispatch(ActionTypes.FETCH_CURRENT_USER, {
      userId: mockUser.id,
    });

    expect(store.state.currentUser).toEqual(mockUser);
  });

  it("clear current user", () => {
    store.dispatch(ActionTypes.CLEAR_CURRENT_USER);

    expect(store.state.currentUser).toEqual({});
  });

  it("remove user", async () => {
    await store.dispatch(ActionTypes.REMOVE_USER, { userId: mockUser.id });

    expect(store.state.users).toEqual(expect.not.arrayContaining([mockUser]));
  });
});
