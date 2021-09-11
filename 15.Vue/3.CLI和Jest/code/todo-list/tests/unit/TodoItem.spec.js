import { shallowMount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";

describe("TodoItem.vue", () => {
  it("input: props , output: view", () => {
    // given
    const todo = {
      text: "吃饭",
    };

    // when
    const wrapper = shallowMount(TodoItem, {
      propsData: { todo },
    });

    // then
    expect(wrapper.text()).toMatch("吃饭");
  });

  it("input: slot, output: view", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          text: "nihao",
        },
      },

      slots: {
        default: "hi slot",
      },
    });

    expect(wrapper.text()).toMatch("hi slot");
  });

  it("input: user click , output: emit", () => {
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        todo: {
          text: "nihao",
          id: 1,
        },
      },
    });

    // 找到 button  ，发起 click 事件
    wrapper.get("#removeBtn").trigger("click");

    expect(wrapper.emitted("remove")[0]).toEqual([1]);
  });
});
