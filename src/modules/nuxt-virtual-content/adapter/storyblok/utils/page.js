import { parseComponents } from './components';
import { getStory } from './story';

export function prepareStory (client, story) {
  return Promise.all(client.locales.map(async locale => {
    const { content } = story[String(locale)];

    let { title, components } = content;
    components = (components || []).map(component => {
      return {
        component: component.component,
        data: component
      };
    });

    components = await parseComponents(client, components, { locale });
    return { locale, data: { url: getUrlFromPageStory(story[String(locale)]), title, components } };
  })).then(locales => locales.reduce((result, { locale, data }) => {
    result[String(locale)] = data;
    return result;
  }, {}));
}

const DEFAULT_PAGES_PATH = 'pages';

export function getPathFromPageStory (pageStory) {

  let path = pageStory.full_slug;
  path = path.split('/');
  if (path[0] === DEFAULT_PAGES_PATH) {
    path.shift();
  }

  if (path[path.length - 1] === '') {
    path[path.length - 1] = 'index';
  }
  path = path.join('/');
  return `/${path}`;
}

export function getUrlFromPageStory (pageStory) {
  let path = pageStory.full_slug;
  path = path.split('/');
  if (pageStory.lang !== 'default' && path[0] === pageStory.lang) {
    path.shift();
  }
  if (path[0] === DEFAULT_PAGES_PATH) {
    path.shift();
  }
  if (path[path.length - 1] === '') {
    path.pop();
  }
  path = '/' + path.join('/');
  return { path };
}

export async function getLinks (client, locale, links) {
  return Promise.all(links.map(link => getStory(client, link, true, locale)))
    .then(links => links.map(({ data }) => {
      return { title: data.content.title, url: getUrlFromPageStory(data) };
    }));
}
