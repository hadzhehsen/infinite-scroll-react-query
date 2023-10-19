import { cache } from "react";

const FALCONER_ENDPOINT = "https://falconer.haqq.sh";

export const getNewsPageContent = cache(async (page = 0, limit = 10) => {
  console.log("getNewsPageContent", { page, limit });

  try {
    const response = await fetch(`${FALCONER_ENDPOINT}/islamic/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit, page }),
      next: {
        revalidate: 180,
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data ?? [];
    }
  } catch (error) {
    console.error(error);
    return;
  }
});
