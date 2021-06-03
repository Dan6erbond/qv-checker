import { QvKandidat } from "@/types/api";
import { Ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import dayjs from "dayjs";
import "dayjs/locale/de-ch";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { usePoll } from "./usePoll";

dayjs.locale("de-ch");
dayjs.extend(customParseFormat);

type FetchParams = { ahvNr: string; birthdate: string };

export const useQvResults = (
  pollTime: number,
  fetchParams: Ref<FetchParams>,
) => {
  const init = computed(() =>
    process.env.NODE_ENV === "production"
      ? "/.netlify/functions/results"
      : "https://qv-checker.netlify.app/.netlify/functions/results",
  );

  const input = computed(() => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ahvNr: fetchParams.value.ahvNr,
      birthdate: dayjs(fetchParams.value.birthdate, "D.MM.YYYY").format(
        "YYYY-MM-DD",
      ),
    }),
  }));

  const data = usePoll<QvKandidat>(pollTime, init, input);

  return data;
};
