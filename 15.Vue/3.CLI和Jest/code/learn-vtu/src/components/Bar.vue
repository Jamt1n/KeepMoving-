<template>
  <div>
    {{ users }}
    <button id="btn" @click="getUsers">get</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      const { data } = await axios.get("/users");
      this.users = data;
    },
  },
};
</script>

<style></style>
