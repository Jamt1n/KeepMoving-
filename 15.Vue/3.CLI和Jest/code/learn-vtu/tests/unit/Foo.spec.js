import { mount } from "@vue/test-utils";

import Foo from "../../src/components/Foo.vue";

describe("Foo.vue", () => {
  it("count", async () => {
    const wrapper = mount(Foo);

    await wrapper.get("#btn").trigger("click");

    expect(wrapper.text()).toContain("2");
  });

  it("input", (done) => {
    const wrapper = mount(Foo);
    wrapper
      .get("#input")
      .setValue("world")
      .then(() => {
        expect(wrapper.text()).toContain("world");
        done();
      });
  });
});
