import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

type Timeout = ReturnType<typeof setInterval>;

export const useTimer = () => {
  const timeout = ref<Timeout>();
  const timer = ref(0);
  const running = computed(() => timeout.value !== undefined);

  const start = () => {
    if (running.value) return;

    timeout.value = setInterval(() => {
      timer.value++;
    }, 1000);
  };

  const stop = () => {
    if (timeout.value) {
      window.clearInterval(timeout.value!);
      timeout.value = undefined;
    }
  };

  const reset = () => {
    if (timeout.value) {
      stop();
      timer.value = 0;
    }
  };

  return { start, stop, reset, timer, running };
};
