
const glob = require('glob');
const fs = require('fs');
const path = require('upath');

const DEFAULT_LOCALES_PATH = path.resolve(process.cwd(), 'src/locales');

export function getRoutes (options) {
  options = Object.assign({ path: DEFAULT_LOCALES_PATH }, options);
  return new Promise(resolve => {
    glob(path.resolve(options.path + '/**/*.json'), (err, files) => {
      if (err) {
        throw err;
      }
      resolve(files);
    });
  }).then(files => {
    const rootPath = path.resolve(process.cwd(), DEFAULT_LOCALES_PATH);
    return files.map((filePath) => {
      const shortPath = path.normalize(filePath).replace(rootPath, '').replace('.json', '');
      return getFileContent(filePath, shortPath);
    });
  }).then(files => Promise.all(files)).catch(err => { throw err; });
}

function getFileContent (filePath, shortPath) {
  return new Promise(resolve => {
    fs.readFile(filePath, 'utf8', function (err, content) {
      resolve(content);
    });
  }).then(fileContent => {
    return {
      path: shortPath,
      data: JSON.parse(fileContent)
    };
  });
}
