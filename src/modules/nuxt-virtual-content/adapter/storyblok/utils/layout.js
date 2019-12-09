import { getFullLocalizedStory } from './story';
import adapter from '../adapter/Layout';

export const DEFAULT_LAYOUT = 'default';

export function getLayoutData (client, layout = DEFAULT_LAYOUT) {
  return getFullLocalizedStory(client, `layouts/${layout}`);
}

export function prepareStory (client, story) {
  return Promise.all(client.locales.map(async locale => {
    return adapter(client, story[String(locale)], locale).then(data => {
      return { locale, data: data };
    });
  })).then(locales => locales.reduce((result, { locale, data }) => {
    result[String(locale)] = data;
    return result;
  }, {}));

}
