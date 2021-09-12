<template>
  <div>
    Home
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  beforeRouteEnter(to, from, next) {
    console.log("before-router-enter");
    next();
  },
  beforeRouteUpdate() {
    // hook
    console.log("before - route - update");
  },
  beforeRouteLeave(to, from, next) {
    console.log("before-router-leave");
    next()
  },
};
</script>

<style></style>
