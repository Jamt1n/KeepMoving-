<template>
  <div :class="classes">
    {{ todo.text }}

    <button id="removeBtn" @click="removeTodo">X</button>
    <button @click="completeTodo">complete</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["todo"],

  computed: {
    classes() {
      return {
        completed: this.todo.state === "completed",
      };
    },
  },
  methods: {
    removeTodo() {
      this.$emit("remove", this.todo.id);
    },
    completeTodo() {
      this.$emit("complete", this.todo.id);
    },
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
