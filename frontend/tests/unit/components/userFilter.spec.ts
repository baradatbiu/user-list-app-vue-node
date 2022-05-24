import { mutations } from "@/store/mutations";
import { state } from "@/store/state";
import { actions } from "@/store/actions";
import { mount } from "@vue/test-utils";
import UserFilter from "@/components/UserFilter.vue";
import { createStore } from "vuex";
import { Filters } from "@/types/user";

const vuexStore = createStore({
  state,
  mutations,
  actions,
});

describe("UserFilter.vue", () => {
  const wrapper = mount(UserFilter, {
    global: { plugins: [vuexStore] },
  });

  it("click on sort button changes sort order on opposite", async () => {
    const initialOrderStatus = vuexStore.state.directSortOrder;
    const sortBtn = wrapper.find("[data-test='sort-btn']");

    await sortBtn.trigger("click");

    expect(vuexStore.state.directSortOrder).toBe(!initialOrderStatus);
  });

  it("click on filter button changes current filter", async () => {
    const checkFilter = Filters.Login;
    const filterBtn = wrapper.find(`[data-test='filter-${checkFilter}']`);

    await filterBtn.trigger("click");

    expect(vuexStore.state.currentFilter).toBe(checkFilter);
  });
});
