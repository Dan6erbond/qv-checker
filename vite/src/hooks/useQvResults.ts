import { QvKandidat } from "@/types/api";
import { useLazyFetch } from "./useLazyFetch";

type FetchParams = { ahvNr: string; birthdate: string };

export const useQvResults = () => {
  const { load, ...result } = useLazyFetch<QvKandidat>(
    "https://www.ag.ch/app/qvserviceapi/services/qv_info/kandidat",
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
        birthdate,
      }),
    });

  return { ...result, load: _load };
};
