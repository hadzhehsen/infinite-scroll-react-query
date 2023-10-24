import { cache } from "react";
import { storyblokInit, apiPlugin } from "@storyblok/js";
import {
  REVALIDATE_TIME,
  STORYBLOK_ACCESS_TOKEN,
  NEWS_LIMIT,
} from "../constants";

export const revalidate = REVALIDATE_TIME;
// const FALCONER_ENDPOINT = 'https://falconer.haqq.sh';

// export const getNewsPageContent = cache(async (page = 0, limit = 20) => {
//   try {
//     const requestURL = new URL('/islamic/news', FALCONER_ENDPOINT);
//     requestURL.searchParams.append('page', page.toString());
//     requestURL.searchParams.append('limit', limit.toString());

//     const response = await fetch(requestURL, {
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       next: {
//         revalidate: 180,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();

//       return data ?? [];
//     }
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// });

export const getPosts = cache(async (page = 0, limit = NEWS_LIMIT) => {
  console.log("getPosts", { page, limit });
  const { storyblokApi } = storyblokInit({
    accessToken: STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
  });

  if (!storyblokApi) {
    throw new Error("Failed to init storyblok");
  }

  try {
    const response = await storyblokApi.get("cdn/stories", {
      version: "draft",
      page: page,
      per_page: limit,
      starts_with: "news",
    });
    console.log({
      response: response.data.stories,
    });
    return response.data.stories;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});
export const getPost = cache(async (slug: string) => {
  console.log("getPost", { slug });
  const { storyblokApi } = storyblokInit({
    accessToken: STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
  });

  if (!storyblokApi) {
    throw new Error("Failed to init storyblok");
  }

  try {
    const response = await storyblokApi.get(`cdn/stories/news/${slug}`, {
      version: "draft",
    });

    return response.data.story;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});
