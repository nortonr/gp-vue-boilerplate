
const glob = require('glob');
const fs = require('fs');
const path = require('upath');

const LOCALES_PATH = 'src/locales';

export function getRoutes () {
  return new Promise(resolve => {

    glob(path.resolve(LOCALES_PATH + '/**/*.json'), {
      ignore: path.resolve(LOCALES_PATH, 'blueprint.json')
    }, (e, files) => {
      const rootPath = path.resolve(process.cwd(), LOCALES_PATH) + '/';
      files = files.map((filePath) => {
        const shortPath = path.normalize(filePath).replace(rootPath, '').replace('.json', '');

        return getFileContent(filePath).then(fileContent => {
          return {
            path: shortPath,
            data: JSON.parse(fileContent)
          };
        });
      });
      return Promise.all(files).then(resolve);
    });
  });
}

function getFileContent (filePath) {
  return new Promise(resolve => {
    fs.readFile(filePath, 'utf8', function (err, content) {
      resolve(content);
    });
  });
}

/**
 * Get module option from nuxt config
 */
export function getModuleOptions (modules, name) {
  let module = modules.find(module => module[0] === name);
  if (module) {
    if (typeof module[1] === 'object') {
      return module[1];
    }
    return {};
  }
  return null;
}

export function extendsNuxtI18nPages (options, routes) {

  const pages = routes.reduce((result, route) => {

    result[route.path] = Object.keys(route.data).reduce((result, locale) => {
      result[String(locale)] = route.data[String(locale)].url;
      return result;
    }, {});

    return result;

  }, {});

  const nuxtI18nOptions = getModuleOptions(options.modules, 'nuxt-i18n');
  nuxtI18nOptions.parsePages = false;
  nuxtI18nOptions.pages = pages;
  console.debug(nuxtI18nOptions);
}

/**
 * article/HeadlineText -> prefixArticleHeadlineText
 */
export function getShortName (prefix, component) {
  return prefix + component.split('/').map(name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }).join('');
}
