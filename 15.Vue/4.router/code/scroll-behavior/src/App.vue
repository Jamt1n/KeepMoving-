<template>
  <div id="app">
    <div id="nav">
      <li><router-link to="/">/</router-link></li>
      <li><router-link to="/bar">/bar</router-link></li>
      <li><router-link to="/bar#anchor">/bar/Anchor</router-link></li>
    </div>
    <router-view />
  </div>
</template>

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
