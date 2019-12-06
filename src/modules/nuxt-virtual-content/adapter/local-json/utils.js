const path = require('upath');

let glob, fs;

if (!process.client) {
  glob = require('glob');
  fs = require('fs');
}

export function getFiles (dir, rootPath) {
  return new Promise(resolve => {
    glob(path.resolve(dir), (err, files) => {
      if (err) {
        throw err;
      }

      resolve(files);
    });
  }).then(files => Promise.all(files.map(filepath => getFileContent(filepath, rootPath))));
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
  const req = require.context('@/locales', true, /\.json$/);
  return req.keys().map(path => {
    const data = req(path);
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
