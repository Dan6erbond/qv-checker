import { ref } from "@vue/reactivity";

type Timeout = ReturnType<typeof setInterval>;

export const useCountdown = (seconds: number, callback: () => void) => {
  const timeout = ref<Timeout>();
  const countdown = ref(seconds);

  const start = () => {
    timeout.value = setInterval(() => {
      countdown.value--;
      if (countdown.value === 0) {
        callback();
        window.clearInterval(timeout.value!);
        timeout.value = undefined;
        countdown.value = seconds;
      }
    }, 1000);
  };

  const stop = () => {
    if (timeout.value) {
      window.clearInterval(timeout.value!);
      timeout.value = undefined;
      countdown.value = seconds;
    }
  };

  return { start, stop, countdown };
};
