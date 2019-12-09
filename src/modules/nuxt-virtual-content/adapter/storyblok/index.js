import { getClient } from './utils';
import { getFullLocalizedStories, getFullLocalizedStory, getPathFromParams } from './utils/story';
import { prepareStory as preparePageStory, getPathFromPageStory } from './utils/page';
import { prepareStory as prepareLayoutStory, getLayoutData } from './utils/layout';

const DEFAULT_LOCALE = 'de';

export const PATH = __dirname;

export async function getRoutes ({ locales, accessToken, isDev }) {
  const client = getClient(accessToken, locales, DEFAULT_LOCALE, !isDev);
  const stories = await getFullLocalizedStories(client, 'pages');
  return Promise.all(stories.map(story => {
    const path = getPathFromPageStory(story[client.defaultLocale]);
    return preparePageStory(client, story).then(data => {
      return {
        path,
        data
      };
    });
  }));
}

export async function getRoute ({ route, locales, adapterOptions }) {
  const client = getClient(adapterOptions.accessToken, locales, DEFAULT_LOCALE, false);

  const params = route.params;
  params.page = params.page || '';

  const path = getPathFromParams(params);
  const story = await getFullLocalizedStory(client, `pages/${path}`);

  return {
    path: `/${path}`,
    data: await preparePageStory(client, story)
  };
}

export async function getLayout ({ adapterOptions, locales, isDev }) {
  const client = getClient(adapterOptions.accessToken, locales, DEFAULT_LOCALE, !isDev);
  return await prepareLayoutStory(client, await getLayoutData(client));
}
