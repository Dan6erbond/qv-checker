import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

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
    headers,
    statusCode: 200,
    body: JSON.stringify(json),
  };
};

export { handler };
