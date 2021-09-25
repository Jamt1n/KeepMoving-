<template>
  <div>
    foo

    <p>username:{{ username }}</p>
    <!-- <p>username:{{ $store.state.username }}</p> -->

    <p>age: {{ age }}</p>

    <p>
      10年后的年龄:{{tenYeasOld}}
    </p>
    <div>
      <button @click="changeUseerName">changeUseerName</button>
      <button @click="changeUseerAge">changeUseerAge</button>
      <button @click="asyncChangeUseerAge">async - changeUseerAge</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// const states = mapState(["username", "age"]);
// console.log(states);

export default {
  data() {
    return {
      // string ->
      //   username: this.$store.state.username,
      //   age: this.$store.state.age,
    };
  },
  computed: {
    ...mapState(["username", "age"]),
    tenYeasOld() {
      return this.$store.state.age + 10;
    },
    // username() {
    //   return this.$store.state.username;
    // },
    // age() {
    //   return this.$store.state.age;
    // },
  },
  methods: {
      async asyncChangeUseerAge(){
          await this.$store.dispatch("changeUsername",{
              username:"heihei"
          })
          
          // 
          console.log("change user name ok")

      },
    changeUseerName() {
      console.log("changeUsername");
      //   this.$store.state.username = "xiaoli";
      //   changeUseerName("xiaoli")
      
      this.$store.commit("changeUsername", {
        username: "xiaoli",
      });
    },
    changeUseerAge() {
      //   this.$store.state.age = 29;

      this.$store.commit("changeUserAge", {
        age: 29,
      });
    },
  },
};

// function changeUsername(val) {
//     debugger;
//   this.$store.state.username = val;
// }
</script>

<style></style>
