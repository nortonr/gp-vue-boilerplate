
const utils = require('./utils');

export const PATH = __dirname;

export function getRoutes () {
  return utils.getFiles()
    .catch(err => { throw err; });
}

export async function getRoute ({ path, locale }) {
  return utils.getPages().find(page => page.matches.find(match => match.locale === locale && match.url === path));
}

export async function getLayout () {
  return utils.getLayoutData();
}
