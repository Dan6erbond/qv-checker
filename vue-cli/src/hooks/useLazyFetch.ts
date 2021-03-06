import { Ref, ref } from "@vue/reactivity";

export const useLazyFetch = <T>(
  input: Ref<RequestInfo>,
  init?: Ref<RequestInit>,
) => {
  const data = ref({} as T);
  const loading = ref(false);
  const error = ref({} as any);

  const load = async (_init?: RequestInit) => {
    let dat: T | null = null;
    try {
      loading.value = true;
      const res = await fetch(
        input.value,
        Object.assign({}, init?.value, _init),
      );
      if (!res.ok || !res.status.toString().startsWith("2")) {
        const e = await res.text();
        error.value = e;
        loading.value = false;
        throw new Error(e);
      } else {
        dat = await res.json();
        data.value = dat as any;
      }
    } catch (e) {
      error.value = e;
      loading.value = false;
      throw e;
    }

    loading.value = false;
    return dat;
  };

  return { data, loading, error, load };
};
