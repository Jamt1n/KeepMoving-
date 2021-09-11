<template>
  <div>
    {{ count }}
    {{ inputValue }}
    <button id="btn" @click="count++">click</button>
    <input id="input" type="text" v-model="inputValue" />
  </div>
</template>

<script>
// for(let i=0; i<100; i++){
//     count++
// }

export default {
  data() {
    return {
      count: 1,
      inputValue: "hello",
    };
  },
};
</script>

<style></style>
