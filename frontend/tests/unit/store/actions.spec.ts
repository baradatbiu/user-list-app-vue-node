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

  it("update user rating", async () => {
    const checkRating = { id: mockUser.id, rating: 5 };

    await store.dispatch(ActionTypes.UPDATE_USER_RATING, checkRating);

    expect(store.state.users).toEqual(
      mockUsers.map((user) => {
        if (user.id === checkRating.id) user.rating = checkRating.rating;
        return user;
      })
    );
  });

  it("set user ratings", async () => {
    const getRandomNumber = (max: number, min: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const ratings = mockUsers.map(({ id }) => ({
      id,
      rating: getRandomNumber(5, 1),
    }));

    await store.dispatch(ActionTypes.SET_USER_RATINGS, ratings);

    expect(store.state.users).toEqual(
      mockUsers.map((user) => ({
        ...user,
        rating: ratings.find(({ id }) => id === user.id)?.rating,
      }))
    );
  });

  it("set current user rating", async () => {
    const rating = 5;

    await store.dispatch(ActionTypes.SET_CURRENT_USER_RATING, { rating });

    expect(store.state.currentUser.rating).toEqual(rating);
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
