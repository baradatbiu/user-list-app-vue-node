import { mount } from "@vue/test-utils";
import UserTableRow from "@/components/UserTableRow.vue";
import { ActionTypes } from "@/store/actions";

const checkId = 3;

const fakeUser = {
  id: checkId,
  fullname: "Lilly Dupont",
  email: "lilly.dupont@example.com",
  phone: "079 143 56 34",
  picture: "https://randomuser.me/api/portraits/women/17.jpg",
};

const mockRouter = {
  push: jest.fn(),
};

const mockStore = {
  dispatch: jest.fn(),
};

describe("UserTableRow.vue", () => {
  const wrapper = mount(UserTableRow, {
    props: {
      user: fakeUser,
    },
    global: {
      mocks: {
        $router: mockRouter,
        $store: mockStore,
      },
    },
  });

  it("click on remove button removes user", async () => {
    const removeBtn = wrapper.find("[data-test='remove-btn']");

    await removeBtn.trigger("click");

    expect(mockStore.dispatch).toHaveBeenCalledWith(ActionTypes.REMOVE_USER, {
      userId: checkId,
    });
  });

  it("click on enter button changes route", async () => {
    const enterBtn = wrapper.find("[data-test='enter-btn']");

    await enterBtn.trigger("click");

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "User",
      params: { id: checkId },
    });
  });
});
