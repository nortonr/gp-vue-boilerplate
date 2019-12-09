import StoryblokClient from 'storyblok-js-client';

let client = null;

export function getClient (accessToken, locales, defaultLocale, published = true) {

  if (client) {
    return client;
  }
  return client = {
    published,
    storyblok: new StoryblokClient({
      accessToken,
      cache: {
        clear: 'auto',
        type: 'memory'
      }
    }),
    locales,
    defaultLocale
  };
}
