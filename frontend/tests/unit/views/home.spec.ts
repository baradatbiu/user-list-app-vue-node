import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("view/User.vue", () => {
  const wrapper = shallowMount(Home);

  it("home page has expected text", () => {
    expect(wrapper.html()).toContain("User-List App");
  });
});
