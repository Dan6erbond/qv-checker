import { ref } from "@vue/reactivity";

const isSignedIn = ref(false);

export const useSignedIn = () => {
  const signIn = () => (isSignedIn.value = true);
  const signOut = () => (isSignedIn.value = false);
  return { isSignedIn, signIn, signOut };
};
