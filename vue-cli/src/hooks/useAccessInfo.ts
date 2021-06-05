import { Ref, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

const ahvNr = ref(localStorage.getItem("ahvNr") ?? "");
const birthdate = ref(localStorage.getItem("birthdate") ?? "");

export const useAccessInfo = (remember?: Ref<boolean>) => {
  watch(
    [ahvNr, birthdate, remember ?? ref(true)],
    ([ahvNr, birthdate, remember]) => {
      if (remember) {
        localStorage.setItem("ahvNr", ahvNr);
        localStorage.setItem("birthdate", birthdate);
      } else {
        clear(true);
      }
    },
  );

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
