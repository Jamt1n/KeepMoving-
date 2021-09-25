<template>
  <div id="app">
    <div>count: {{ count }}</div>
    <div>double: {{ double }}</div>
    <button @click="changeCount">changeCount</button>
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters } = createNamespacedHelpers("moduleA");
export default {
  name: "App",
  components: {},
  computed: {
    // ...mapState("moduleA", ["count"]),
    ...mapState(["count"]),
    // count() {
    //   return this.$store.state.moduleA.count;
    // },
    ...mapGetters(["double"]),
    // ...mapGetters("moduleA", ["double"]),
    // double() {
    //   return this.$store.getters["moduleA/double"];
    // },
  },
  methods: {
    changeCount() {
      this.$store.commit("moduleA/changeCount", 10);
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
