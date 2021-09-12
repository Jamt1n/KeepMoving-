<template>
  <div>
    user: {{ $route.params.id }}

    <div>
      <router-view></router-view>
    </div>
    <div>
      <button @click="back">back</button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // 路由对象
    // router 给我们注入的
    // user.id -> fetch api -> user
    console.log(`fetch user api id: ${this.$route.params.id}`);
  },
  watch: {
    $route() {
      console.log(`watch - fetch user api id: ${this.$route.params.id}`);
    },
  },
  methods: {
    back() {
      // this.$router.back();
      // go -2 
      // this.$router.go(-2)
    },
  },
  beforeRouteUpdate() {
    // vue-router
    console.log(
      `before-route-udate - fetch user api id: ${this.$route.params.id}`
    );
  },
};
</script>

<style></style>
