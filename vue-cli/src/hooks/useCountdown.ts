import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useTimer } from "./useTimer";

export const useCountdown = (seconds: number, callback: () => void) => {
  const { timer, reset, running, ...props } = useTimer();
  const prevCountdown = ref(seconds);
  const countdown = computed(() =>
    running ? seconds - timer.value : prevCountdown.value,
  );

  watch(countdown, (countdown, oldCountdown) => {
    if (countdown === 0) {
      reset();
      callback();
    }
    prevCountdown.value = oldCountdown;
  });

  return { ...props, reset, countdown };
};
