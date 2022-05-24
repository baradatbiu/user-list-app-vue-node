import { shallowMount } from "@vue/test-utils";
import NotFound from "@/views/NotFound.vue";

describe("view/User.vue", () => {
  const wrapper = shallowMount(NotFound);

  it("home page has expected text", () => {
    expect(wrapper.html()).toContain("Page not found");
  });
});
