
const utils = require('./utils');
const path = require('upath');

const DEFAULT_LOCALES_PATH = path.resolve(process.cwd(), 'src/locales');

export function getRoutes (options) {
  options = Object.assign({ path: DEFAULT_LOCALES_PATH }, options);
  const rootPath = path.resolve(process.cwd(), options.path);
  return utils.getFiles(options.path + '/**/*.json', rootPath)
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
