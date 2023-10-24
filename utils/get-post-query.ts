import { cache } from 'react';
import { storyblokInit, apiPlugin } from '@storyblok/js';
import {
  REVALIDATE_TIME,
  STORYBLOK_ACCESS_TOKEN,
  VERCEL_ENV,
} from '../constants';

export const revalidate = REVALIDATE_TIME;
const FALCONER_ENDPOINT = 'https://falconer.haqq.sh';

export const getNewsPageContent = cache(async (page = 0, limit = 20) => {
  try {
    const requestURL = new URL('/islamic/news', FALCONER_ENDPOINT);
    requestURL.searchParams.append('page', page.toString());
    requestURL.searchParams.append('limit', limit.toString());

    const response = await fetch(requestURL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const getPersonalNews = cache(async (page = 0, limit = 3) => {
  const { storyblokApi } = storyblokInit({
    accessToken: STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
  });

  if (!storyblokApi) {
    throw new Error('Failed to init storyblok');
  }

  const response = await storyblokApi.get('cdn/stories/news', {
    version: VERCEL_ENV === 'production' ? 'published' : 'draft',
    // page,
    // per_page: limit,
  });

  return response.data.story.content.columns[0].columns;
});
