import { mount } from "@vue/test-utils";
import Bar from "../../src/components/Bar.vue";
import flushPromises from "flush-promises";

jest.mock("axios", () => {
  return {
    get() {
      return new Promise((resolve) => {
        resolve({ data: "heihei" });
      });
    },
  };
});

describe("Bar.vue", () => {
  it("get users", async () => {
    const wrapper = mount(Bar);

    await wrapper.get("#btn").trigger("click");
    await flushPromises();
    expect(wrapper.text()).toContain("heihei");

    // setTimeout(() => {
    //   expect(wrapper.text()).toContain("heihei");
    //   done();
    // }, 0);
  });
});
