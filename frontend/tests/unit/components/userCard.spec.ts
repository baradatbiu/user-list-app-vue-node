import { Details } from "@/types/user";
import { shallowMount } from "@vue/test-utils";
import UserCard from "@/components/UserCard.vue";
import { ActionTypes } from "@/store/actions";
import { users as mockUsers } from "../store/users";

const $store = {
  state: {
    currentUser: mockUsers[1],
    users: mockUsers,
  },
  dispatch: jest.fn(),
};

describe("UserCard.vue", () => {
  const wrapper = shallowMount(UserCard, {
    global: { mocks: { $store } },
  });

  it("on mount user info block has user fullname", () => {
    const userInfo = wrapper.find("[data-test='user-info']");

    expect(userInfo.text()).toBe($store.state.currentUser[Details.Name]);
  });

  it("changing tab changes user info", async () => {
    const checkKey = Details.Email;

    const userInfo = wrapper.find("[data-test='user-info']");
    const checkTab = wrapper.find(`[data-test='tab-${checkKey}']`);

    await checkTab.trigger("click");

    expect(userInfo.text()).toBe($store.state.currentUser[checkKey]);
  });

  it("update user rating", async () => {
    const checkRating = { id: $store.state.currentUser.id, rating: 5 };

    await wrapper.vm.updateRating(checkRating);

    expect($store.dispatch).toHaveBeenCalledWith(
      ActionTypes.SET_CURRENT_USER_RATING,
      checkRating
    );
  });
});
