<template>
  <va-app-bar color="dark" class="mb-2 pa-4 header row justify--center">
    <span class="color-white">QV Checker</span>
  </va-app-bar>
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
