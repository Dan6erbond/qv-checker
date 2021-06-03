<template>
  <va-app-bar color="dark" class="mb-2 pa-4 header row">
    <span class="color-white">QV Checker</span>
    <va-spacer />
    <va-button
      icon="logout"
      color="#fff"
      flat
      :rounded="false"
      v-if="isSignedIn"
      @click="signOut"
    />
  </va-app-bar>
  <Checker />
</template>

<script lang="ts">
  import { useSignedIn } from "@/hooks/useSignedIn";
  import { defineComponent } from "vue";
  import Checker from "./components/Checker.vue";

  export default defineComponent({
    name: "App",
    components: {
      Checker,
    },
    setup: () => {
      const { isSignedIn, signOut } = useSignedIn();

      return { signOut, isSignedIn };
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
