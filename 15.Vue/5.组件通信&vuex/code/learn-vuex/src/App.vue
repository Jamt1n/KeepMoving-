<template>
  <div id="app">
    <Foo></Foo>
    <!-- <button @click="getState">get state</button> -->
    <Bar></Bar>
  </div>
</template>

<script>
import Foo from "./components/Foo.vue";
import Bar from './components/Bar.vue'
export default {
  name: "App",
  components: {
    Foo,
    Bar
  },
  methods: {
    getState() {
      console.log(this.$store);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
