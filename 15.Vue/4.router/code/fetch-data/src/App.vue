<template>
  <div id="app">
    <div v-show="loading">loading...</div>
    <div id="nav"><router-link to="/">Home</router-link></div>
    <div id="nav"><router-link to="/foo/1">Foo</router-link></div>
    <!-- <div id="nav"><router-link to="/bar/1">Bar</router-link></div> -->
    <div id="nav">
      <button @click="toBar">Bar</button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    toBar() {
      this.loading = true;
      this.$router.push(
        {
          name: "Bar",
          params: {
            id: 3,
          },
        },
        () => {
          this.loading = false;
        }
      );
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
