<template>
  <div>
    Foo
    <div v-show="loading">loading...</div>
    <div v-show="error">error</div>

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
      loading: false,
      error: false,
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.error = false;
      this.post = {}
      apiPost(this.$route.params.id, false)
        .then((post) => {
          console.log(post);
          this.post = post;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
  },
};
</script>

<style></style>
