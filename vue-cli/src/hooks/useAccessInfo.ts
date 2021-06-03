import { Ref, ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";

const ahvNr = ref(localStorage.getItem("ahvNr") ?? "");
const birthdate = ref(localStorage.getItem("birthdate") ?? "");

export const useAccessInfo = (remember?: Ref<boolean>) => {
  const _remember = computed(() => remember?.value ?? true);

  watch([ahvNr, birthdate, _remember], ([ahvNr, birthdate, remember]) => {
    if (remember) {
      localStorage.setItem("ahvNr", ahvNr);
      localStorage.setItem("birthdate", birthdate);
    } else {
      clear(true);
    }
  });

  const clear = (storageOnly = false) => {
    localStorage.removeItem("ahvNr");
    localStorage.removeItem("birthdate");
    if (!storageOnly) {
      birthdate.value = "";
      ahvNr.value = "";
    }
  };

  return { ahvNr, birthdate, clear };
};
