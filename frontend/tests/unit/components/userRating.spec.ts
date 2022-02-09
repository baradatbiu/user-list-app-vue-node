import { mount } from "@vue/test-utils";
import UserRating from "@/components/UserRating.vue";

const fakeUser = {
  id: "77",
  rating: 3,
};

describe("UserRating.vue", () => {
  it("click on '+' button up user rating", async () => {
    const wrapper = mount(UserRating, { props: { user: fakeUser } });

    const upBtn = wrapper.find("[data-test='rating-up']");
    const chekRating = fakeUser.rating + 1;

    await upBtn.trigger("click");

    expect(wrapper.emitted().updateRating[0]).toEqual([
      { id: fakeUser.id, rating: chekRating },
    ]);
  });

  it("click '-' button down user rating", async () => {
    const wrapper = mount(UserRating, { props: { user: fakeUser } });

    const downBtn = wrapper.find("[data-test='rating-down']");
    const chekRating = fakeUser.rating - 1;

    await downBtn.trigger("click");

    expect(wrapper.emitted().updateRating[0]).toEqual([
      { id: fakeUser.id, rating: chekRating },
    ]);
  });

  it("click on '+' if max rating don't change user rating", async () => {
    fakeUser.rating = 5;

    const wrapper = mount(UserRating, { props: { user: fakeUser } });

    const upBtn = wrapper.find("[data-test='rating-up']");

    await upBtn.trigger("click");

    expect(wrapper.emitted().updateRating).toBeFalsy();
  });

  it("click '-' if min rating don't change user rating", async () => {
    fakeUser.rating = 0;

    const wrapper = mount(UserRating, { props: { user: fakeUser } });

    const downBtn = wrapper.find("[data-test='rating-down']");

    await downBtn.trigger("click");

    expect(wrapper.emitted().updateRating).toBeFalsy();
  });
});
