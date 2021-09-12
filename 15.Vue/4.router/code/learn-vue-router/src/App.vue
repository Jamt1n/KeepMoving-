<template>
  <div id="app">
    <div>
      <!-- <a href="/user/1">to user</a> -->
      <router-link :to="{ name: 'User', params: { id: 2 } }"
        >to user</router-link
      >
      <!-- <button @click="handleToUser">to user</button> -->
    </div>
    <router-view></router-view>
    <router-view name="one"></router-view>
    <router-view name="two"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    handleToUser() {
      console.log(this.$router);
      // push
      this.$router.push({
        name: "User",
        // path:"/users/1"
        params: {
          id: 2,
        },
      });
      // this.$router.push(() => {
      //   console.log("push function");

      //   return "/user/1"
      // });
      // replace
      // this.$router.replace("/user/1");

      // push vs replace
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
