
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
