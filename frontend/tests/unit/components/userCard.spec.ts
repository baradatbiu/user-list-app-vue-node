import { Details } from "@/types/user";
import { mount } from "@vue/test-utils";
import UserCard from "@/components/UserCard.vue";

const $store = {
  state: {
    currentUser: {
      fullname: "Lilly Dupont",
      email: "lilly.dupont@example.com",
      phone: "079 143 56 34",
      picture: {
        large: "https://randomuser.me/api/portraits/women/17.jpg",
      },
      age: 74,
      address: "8976 St. Niklaus Rue du Stade",
      password: "prodigy",
    },
  },
};

describe("UserCard.vue", () => {
  const wrapper = mount(UserCard, {
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
});
