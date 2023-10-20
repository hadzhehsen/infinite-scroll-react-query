import { cache } from 'react';

const FALCONER_ENDPOINT = 'https://falconer.haqq.sh';

export const getNewsPageContent = cache(async (page = 0, limit = 20) => {
  console.log('getNewsPageContent', { page, limit });
  try {
    const requestURL = new URL('/islamic/news', FALCONER_ENDPOINT);
    requestURL.searchParams.append('page', page.toString());
    requestURL.searchParams.append('limit', limit.toString());

    const response = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ limit, page }),
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
