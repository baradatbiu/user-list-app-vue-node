import { shallowMount } from "@vue/test-utils";
import UserList from "@/components/UserList.vue";
import { Filters } from "@/types/user";

const $store = {
  state: {
    users: ["b", "a", "c"].map((fullname) => ({ fullname })),
    currentFilter: "",
    directSortOrder: true,
  },
};

const expectedSortedUsers = () =>
  [...$store.state.users].sort((a, b) => a.fullname.localeCompare(b.fullname));

describe("UserList.vue", () => {
  it("users not sorted if filter not selected", () => {
    const wrapper = shallowMount(UserList, {
      global: { mocks: { $store } },
    });

    const users = $store.state.users;
    const sortedUsers = wrapper.vm.sortedUsers;

    expect(sortedUsers).toEqual(users);
  });

  it("users sorted by selected filter", () => {
    $store.state.currentFilter = Filters.Name;

    const wrapper = shallowMount(UserList, {
      global: { mocks: { $store } },
    });

    expect(wrapper.vm.sortedUsers).toEqual(expectedSortedUsers());
  });

  it("users reversed if directSortOrder false", () => {
    $store.state.currentFilter = Filters.Name;
    $store.state.directSortOrder = false;

    const wrapper = shallowMount(UserList, {
      global: { mocks: { $store } },
    });

    expect(wrapper.vm.sortedUsers).toEqual(expectedSortedUsers().reverse());
  });
});
