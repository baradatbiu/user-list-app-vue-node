import { shallowMount } from "@vue/test-utils";
import User from "@/views/User.vue";
import { ActionTypes } from "@/store/actions";

const checkId = "user";

const $store = {
  state: {
    currentUser: {},
  },
  dispatch: jest.fn(),
};

const $route = { params: { id: "user" } };

describe("view/User.vue", () => {
  const wrapper = shallowMount(User, {
    global: { mocks: { $store, $route } },
  });

  it("set user is called with expected params", () => {
    expect($store.dispatch).toHaveBeenCalledWith(
      ActionTypes.FETCH_CURRENT_USER,
      {
        userId: checkId,
      }
    );
  });

  it("clear user is called if component unmount", () => {
    wrapper.unmount();

    expect($store.dispatch).toHaveBeenCalledWith(
      ActionTypes.CLEAR_CURRENT_USER
    );
  });
});
