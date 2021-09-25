<template>
  <div @click="count++">
    count is {{ count }}
  </div>
  <ul>
    <li>
      <router-link to="/home">home</router-link>
    </li>
    <li>
      <router-link to="/about">about</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<script setup>
// ref: count = 1
// $count.value++/count++

// let count = $ref(1)
// count++

// let count = $(1)
import {ref} from "vue";

const count = ref(1)
</script>

<style>
div {
  color: red;
}
</style>
