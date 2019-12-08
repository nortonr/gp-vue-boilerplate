const path = require('upath');

const LOCALES_PATH = path.resolve(process.cwd(), 'src/locales/pages');
function getPageLocalesContext () {
  return require.context('@/locales/pages', true, /\.json$/);
}
export function getLayoutData () {
  return require('@/locales/layout');
}

// #########################################################

let glob, fs;

if (!process.client) {
  glob = require('glob');
  fs = require('fs');
}

export function getFiles () {
  return new Promise(resolve => {
    glob(path.resolve(path.join(LOCALES_PATH, '/**/*.json')), (err, files) => {
      if (err) {
        throw err;
      }

      resolve(files);
    });
  }).then(files => Promise.all(files.map(filepath => getFileContent(filepath, LOCALES_PATH))));
}

function getFileContent (filepath, rootPath) {
  return new Promise(resolve => {
    const shortPath = path.normalize(filepath).replace(rootPath, '').replace('.json', '');
    fs.readFile(filepath, 'utf8', function (err, content) {
      if (err) {
        throw err;
      }
      resolve({
        path: shortPath,
        data: JSON.parse(content)
      });
    });
  });
}

export function getPages () {
  const requireContext = getPageLocalesContext();
  return requireContext.keys().map(path => {
    const data = requireContext(path);
    return Object.keys(data).reduce((result, locale) => {
      const url = data[String(locale)].url.path.replace(/^\//, '').split('/');
      if (url.length > 1) {
        result.routeParams[String(locale)] = { nested: url[0], page: url[1] };
      } else {
        result.routeParams[String(locale)] = { page: url[0] };
      }
      result.matches.push({ url: data[String(locale)].url.path, locale });
      return result;
    }, {
      path: path, data,
      routeParams: {},
      matches: []
    });
  });

}
