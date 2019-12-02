import fs from 'fs';
import path from 'upath';
const consola = require('consola');
const rimraf = require('rimraf');

export const MODULE_NAME = 'nuxt-virtual-content';
export const PATH_CACHE_DIR = path.join(process.cwd(), '.tmp', MODULE_NAME);
export const PATH_CACHE_ROUTES = path.join(PATH_CACHE_DIR, 'routes.json');
export const PATH_CACHE_PAGES_DIR = path.join(PATH_CACHE_DIR, 'pages');

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

export function getNuxtI18nOptions (nuxtConfig) {
  return getModuleOptions(nuxtConfig.modules, 'nuxt-i18n');
}

export function addRoutesToI18nPages (options, routes) {
  options.parsePages = false;
  options.pages = options.pages || {};
  const pages = options.pages;
  routes.forEach(route => {
    pages[route.path.replace(/^\//, '')] = options.nuxtI18n.locales.reduce((result, { code }) => {
      result[String(code)] = route.data[String(code)] ? route.data[String(code)].url : false;
      return result;
    }, {});
  }, {});
}

/**
 * article/HeadlineText -> prefixArticleHeadlineText
 */
export function getShortName (prefix, component) {
  return prefix + component.split('/').map(name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }).join('');
}

// eslint-disable-next-line complexity
export async function cacheRoutes (options) {
  let cacheEmpty = false;
  let routes = await getCachedRoutes();
  cacheEmpty = !options.routesCache || options.isDev && options.routesCache && !routes || process.env.npm_config_virtual_content_clear_cache;
  if (cacheEmpty) {
    logWarn('Virtual-Content: request all routes, cache routes for fast startup. options.routesCache', true);
    await cleanCacheDir(PATH_CACHE_DIR);
    routes = await options.adapter.getRoutes(options.adapterOptions);
  } else {
    logInfo(`route cache active, read ${routes.length} exists routes`);
  }

  if (options.routesCache && cacheEmpty) {
    logSuccess(`route cache active, ${routes.length} routes saved`, '\n');
    routes = await createRoutesCache(routes);
  }

  if (options.debug) {
    routes.forEach(route => {
      const locales = Object.keys(route.data);
      const logs = [
        `route: ${route.path.replace(/^\//, '').replace(/\//g, '-')}`
      ];
      locales.forEach(locale => {
        logs.push(`\n\t\t      ${locale}: ${route.data[String(locale)].url}`);
      });
      logs.push('\n');
      log(...logs);
    });
  }
  return routes;
}

export function createRoutesCache (routes) {
  const filepath = PATH_CACHE_ROUTES;
  return writeDir(filepath).then(() => writeFile(filepath, JSON.stringify(routes))).then(() => routes);
}

export function getCachedRoutes () {
  const filepath = PATH_CACHE_ROUTES;
  if (fs.existsSync(filepath)) {
    return readFile(filepath).then(content => JSON.parse(content));
  }
  return Promise.resolve(null);
}

export async function createStaticComponents (options, routes) {
  return Promise.all(routes.map(route => {
    const filepath = path.join(PATH_CACHE_PAGES_DIR, route.path + '.vue');
    return writeDir(filepath).then(() => writeFile(filepath, route.template)).then(() => {
      if (options.debug) {
        logSuccess(`write page: ${path.relative(PATH_CACHE_PAGES_DIR, filepath)}`);
      }
      route.component = filepath;
      return route;
    });
  })).then(routes => {
    logSuccess(`write ${routes.length} page templates`);
    return routes;
  });
}

// Files

export function writeDir (filepath) {
  return new Promise(resolve => {
    fs.mkdir(path.dirname(filepath), {
      recursive: true
    }, resolve);
  });
}

export function writeFile (filepath, content) {
  return new Promise(resolve => {
    fs.writeFile(filepath, content, 'utf-8', resolve);
  });
}

export function readFile (filepath) {
  return new Promise(resolve => {
    fs.readFile(filepath, 'utf8', function (err, data) {
      if (err) {
        throw err;
      }
      resolve(data);
    });
  });
}

export function cleanCacheDir (filePath) {
  return new Promise(resolve => {
    rimraf(filePath, {}, resolve);
  });
}

// Logs

export function logSuccess (...message) {
  consola.success(...[
    'Virtual-Content:'
  ].concat(message));
}
export function logInfo (...message) {
  consola.info(...[
    'Virtual-Content:'
  ].concat(message));
}
export function logWarn (...message) {
  consola.warn(...[
    'Virtual-Content:'
  ].concat(message));
}
export function log (...message) {
  consola.log(...[
    '                  '
  ].concat(message));
}
