import fs from 'fs';
import path from 'upath';
const consola = require('consola');

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
    pages[route.path.replace(/^\//, '')] = options.locales.reduce((result, { code }) => {
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

const PATH_CACHE_ROUTES = 'src/modules/virtual-content/.cache/routes.json';

export function cacheRoutes (options, getRoutes) {
  let cacheEmpty = false;
  return getCachedRoutes().then(routes => {
    cacheEmpty = !options.routesCache || options.routesCache && !routes || process.env.npm_config_virtual_content_clear_cache;
    if (!cacheEmpty) {
      logInfo(`route cache active, read ${routes.length} exists routes`);
      return routes;
    } else {
      logWarn('Virtual-Content: request all routes, cache routes for fast startup. options.routesCache', true);
      return getRoutes();
    }
  }).then(routes => {
    if (options.routesCache && cacheEmpty) {
      logSuccess(`route cache active, ${routes.length} routes saved`, '\n');
      return createRoutesCache(routes);
    }
    return routes;
  }).then(routes => {
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
        logInfo(...logs);
      });
    }
    return routes;
  });
}

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
export function logWarn (message) {
  consola.warn(message);
}

export function createRoutesCache (routes) {
  const filepath = path.resolve(process.cwd(), PATH_CACHE_ROUTES);
  return writeDir(filepath).then(() => writeFile(filepath, JSON.stringify(routes))).then(() => routes);
}

export function getCachedRoutes () {
  const filepath = path.resolve(process.cwd(), PATH_CACHE_ROUTES);
  if (fs.existsSync(filepath)) {
    return readFile(filepath).then(content => JSON.parse(content));
  }
  return Promise.resolve(null);
}

const PATH_CACHE_PAGES = 'src/modules/virtual-content/.cache/pages';

export async function createStaticComponents (options, routes) {
  const dest = path.join(process.cwd(), PATH_CACHE_PAGES);
  return Promise.all(routes.map(route => {
    const filepath = path.join(dest, route.path + '.vue');
    return writeDir(filepath).then(() => writeFile(filepath, route.template)).then(() => {
      if (options.debug) {
        logSuccess(`write page: ${filepath}`);
      }
      route.component = filepath;
      return route;
    });
  })).then(routes => {
    logSuccess(`write ${routes.length} page templates`);
    return routes;
  });
}

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
