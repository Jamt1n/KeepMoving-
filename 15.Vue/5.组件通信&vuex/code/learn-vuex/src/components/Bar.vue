<template>
  <div>
    <p>10年后的年龄:{{ tenYeasOld }}</p>
    <p>18 岁的user :{{ findUsersByAge(18) }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["tenYeasOld", "findUsersByAge"]),
    // tenYeasOld() {
    //   return this.$store.getters.tenYeasOld;
    //   //   return this.$store.state.age + 10;
    // },
  },
};
</script>

<style></style>
