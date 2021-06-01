import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async function (event) {
  const { ahvNr, birthdate } = JSON.parse(event.body!);

  const res = await fetch(
    "https://www.ag.ch/app/qvserviceapi/services/qv_info/kandidat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ahvNr,
        geburtsdatum: birthdate,
      }),
    }
  );

  const json = await res.json();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(json),
  };
};

export { handler };
