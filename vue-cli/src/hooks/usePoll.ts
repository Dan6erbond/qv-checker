import { useLazyFetch } from "./useLazyFetch";
import { useCountdown } from "./useCountdown";
import { Ref } from "@vue/reactivity";

export const usePoll = <T>(
  pollTime: number,
  input: Ref<RequestInfo>,
  init?: Ref<RequestInit>,
) => {
  const { load, ...result } = useLazyFetch<T>(input, init);

  const _start = async () => {
    await load();
    start();
  };

  const { start, ...countdownProps } = useCountdown(pollTime, _start);

  return { ...result, ...countdownProps, load, start: _start };
};
