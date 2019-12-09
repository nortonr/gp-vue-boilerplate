export const PARAMS = [
  'page', 'nested'
];

export function getPathFromParams (params) {
  return PARAMS.filter(param => {
    if (params[String(param)]) {
      return param;
    }
  }).map(param => params[String(param)]).join('/');
}

export function getStories (client, path, locale) {
  const options = { starts_with: path, version: client.published ? 'published' : 'draft' };
  if (client.defaultLocale !== locale) {
    options.starts_with = `${locale}/${options.starts_with}`;
  }

  return client.storyblok.get('cdn/stories', options).then(response => {
    const { stories } = response.data;
    return stories.map(story => {
      return { locale: story.lang === 'default' ? client.defaultLocale : story.lang, data: story };
    });

  });
}

export function getFullLocalizedStories (client, path) {
  return Promise.all(client.locales.map(locale => {
    return getStories(client, path, locale).then(stories => {
      return { locale, stories };
    });
  })).then(localStories => {

    let sortedStories = {};
    localStories.forEach(({ locale, stories }) => {
      stories.forEach(({ data }) => {
        sortedStories[data.id] = sortedStories[data.id] || {};
        sortedStories[data.id][String(locale)] = data;
      });
    });
    return Object.keys(sortedStories).map(key => sortedStories[Number(key)]);
  });
}

const storyCache = new Map();

export function getStory (client, path, uuid, locale) {
  const options = { version: client.published ? 'published' : 'draft' };
  if (uuid) {
    options.language = locale;
    options.find_by = 'uuid';
  } else if (client.defaultLocale !== locale) {
    path = `${locale}/${path}`;
  }
  const key = JSON.stringify({ path: `cdn/stories/${path}`, options });
  if (!storyCache.has(key)) {
    storyCache.set(key, client.storyblok.get(`cdn/stories/${path}`, options));
  }

  return storyCache.get(key).then(response => {
    const { story } = response.data;
    return { locale: story.lang === 'default' ? client.defaultLocale : story.lang, data: story };
  });
}

export function getFullLocalizedStory (client, path, uuid) {
  return Promise.all(client.locales.map(locale => getStory(client, path, uuid, locale))).then(stories => {
    return stories.reduce((result, { locale, data }) => {
      result[String(locale)] = data;
      return result;
    }, {});
  });

}
