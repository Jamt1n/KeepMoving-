<template>
  <div>
    <input type="text" @keyup.enter="addTodo" v-model="newTodo" />

    <div>
      <ul>
        <li v-for="todo in todolist" :key="todo.id">
          <TodoItem
            :todo="todo"
            @remove="removeTodo"
            @complete="completeTodo"
          ></TodoItem>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let id = 1;

function createId() {
  return id++;
}
import TodoItem from "./TodoItem.vue";

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      todolist: [],
      newTodo: "",
    };
  },
  methods: {
    completeTodo(id) {
      // todo
      // eslint-disable-next-line no-debugger
      console.log(id);
      const todo = this.todolist.find((todo) => todo.id === id);
      if (todo) {
        todo.state = todo.state === "completed" ? "action" : "completed";
      }
    },
    removeTodo(id) {
      this.todolist = this.todolist.filter((todo) => {
        return todo.id !== id;
      });
    },
    addTodo() {
      this.todolist.push({
        id: createId(),
        text: this.newTodo,
        state: "action",
      });

      // reset
      this.newTodo = ``;
    },
  },
};
</script>

<style></style>
