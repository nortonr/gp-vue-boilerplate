
const utils = require('./utils');

export function getRoutes () {
  return utils.getFiles()
    .catch(err => { throw err; });
}

export function getRoute (path, locale) {
  const page = utils.getPages()
    .find(page => {
      return page.matches.find(match => {
        return match.locale === locale && match.url === path;
      });
    });
  return Promise.resolve(page);
}
