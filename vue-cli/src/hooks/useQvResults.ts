import { QvKandidat } from "@/types/api";
import dayjs from "dayjs";
import "dayjs/locale/de-ch";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLazyFetch } from "./useLazyFetch";

dayjs.locale("de-ch");
dayjs.extend(customParseFormat);

type FetchParams = { ahvNr: string; birthdate: string };

export const useQvResults = () => {
  const { load, ...result } = useLazyFetch<QvKandidat>(
    "https://qv-checker.netlify.app/.netlify/functions/results",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const _load = ({ ahvNr, birthdate }: FetchParams) =>
    load({
      body: JSON.stringify({
        ahvNr,
        birthdate: dayjs(birthdate, "D.MM.YYYY").format("YYYY-MM-DD"),
      }),
    });

  return { ...result, load: _load };
};
