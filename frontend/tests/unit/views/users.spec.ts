import { shallowMount } from "@vue/test-utils";
import Users from "@/views/Users.vue";
import { ActionTypes } from "@/store/actions";

const $store = {
  state: {
    users: [1, 2],
    loading: false,
  },
  dispatch: jest.fn(),
};

describe("view/Users.vue", () => {
  it("fetch users isn't called if users are available", () => {
    shallowMount(Users, {
      global: { mocks: { $store } },
    });

    expect($store.dispatch).toHaveBeenCalledTimes(0);
  });

  it("fetch users is called", () => {
    $store.state.users = [];

    shallowMount(Users, {
      global: { mocks: { $store } },
    });

    expect($store.dispatch).toHaveBeenCalledWith(ActionTypes.FETCH_USERS);
  });

  it("show loader if data loading", () => {
    $store.state.loading = true;

    const wrapper = shallowMount(Users, {
      global: { mocks: { $store } },
    });

    const loader = wrapper.find("[data-test='loader']");

    expect(loader.exists()).toBe(true);
  });
});
