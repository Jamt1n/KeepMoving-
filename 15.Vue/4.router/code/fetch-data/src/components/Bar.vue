<template>
  <div>
    Bar
    <div>
      {{ post.title }}
      {{ post.body }}
    </div>
  </div>
</template>

<script>
import { apiPost } from "../api";
export default {
  data() {
    return {
      post: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    apiPost(to.params.id).then((post) => {
      next((vm) => {
        vm.post = post;
      });
    });
  },
};
</script>

<style></style>
