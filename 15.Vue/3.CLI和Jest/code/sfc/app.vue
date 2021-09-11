<template>
  <div>
    hi app.vue --
    <p></p>
    {{ count }}
    <img src="" alt="" srcset="" />
    <button @click="handleClick">click</button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    name() {},
    handleClick() {
      this.count++;
    },
  },

  mounted() {},
};
</script>

<style>
.app {
  background: red;
}
</style>
