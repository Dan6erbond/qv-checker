<template>
  <va-navbar color="dark" class="mb-2">
    <template #left>
      <va-navbar-item>QV Checker</va-navbar-item>
    </template>
  </va-navbar>
  <Checker />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Checker from "./components/Checker.vue";

  export default defineComponent({
    name: "App",
    components: {
      Checker,
    },
  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
