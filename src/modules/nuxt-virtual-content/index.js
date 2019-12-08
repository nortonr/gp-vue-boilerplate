
import VirtualPages from './module/VirtualPages';
import VirtualLocales from './module/VirtualLocales';
import path from 'upath';
import { addRoutesToI18nPages, cacheRoutes, createStaticComponents, logInfo, logWarn } from './utils';
import { generateRouteTemplates } from './utils/template';

const DEFAULT_TEMPLATE = path.normalize(path.join(__dirname, '/tmpl/Page.vue'));

module.exports = function (options) {

  options = Object.assign({
    isDev: this.nuxt.options.dev,
    /**
     * If set, modul is also active in development mode.
     */
    dev: false,
    /**
     * Wenn "virtualPages" aktiviert, werden die component in der Route auf ein virtuelles Modul verweisen.
     * Example: @/virtual-pages/index
     * Wichtig: Mit dem aktiveren wird in NuxtI18n "parsePages" deaktiviert,
     * dies extrahiert per Node-Fs das jeweilige nuxti18n-Routing Objekt aus einem physischen Pfad.
     *
     * Alternativ wird per Option "pages" das mapping registriert, im Projekt fest definierte
     * Seiten müssen entsprechend auch per pages Objekt an die nuxtI18n-Konfiguration übergeben werden.
     */
    virtualPages: false,
    /**
     * Function for querying the page structure with Content.
     * @type Function
     */
    adapter: null,
    adapterOptions: {},
    /**
     * Path for the page template
     * @type String
     */
    template: null,
    /**
     * prefix for component imports in generated pages.
     * Example: Component "Text" -> Component "virtualText"
     * @type String
     */
    componentPrefix: 'virtual',
    /**
     * If active, the adapter result is stored locally.
     * @type Boolean
     */
    routesCache: true,
    /**
     * list of route names, to be ignore by routes extend.
     * Example: ['index', 'page', 'nested-page']
     * @type Array
     **/
    ignoreRoutes: [],
    /**
     * If set, all already registered routes will be removed from the list.
     */
    cleanRoutes: false,
    /**
     * Configuration for nuxt-i18n
     */
    nuxtI18n: {}
  }, options);

  if (!options.adapter || !options.adapter.getRoutes) {
    throw new Error('no adapter defined!');
  }

  let setup = Promise.resolve();

  /**
   * add context plugin
   */

  const plugins = [
    { name: 'layout', mode: 'server' },
    { name: 'content' }
  ];

  addPlugins(this, options, plugins);

  if (!options.dev && options.isDev) {
    logWarn('is disabled in development mode');
  } else {
    setup = moduleSetup(this, options);
  }

  return setup.then(routes => {
    // IMPORTANT: hinzufügen von nuxt-i18n module muss nach registrieren des hook "extendRoutes" geschehen.
    this.addModule(getNuxtI18nModule(options));
    logInfo('add module "nuxt-18n" to nuxt');
    return routes;
  });

};

/**
 * @param Array plugins
 * @param ModuleContainer moduleScope
 */
function addPlugins (moduleScope, options, plugins) {
  const pluginOptions = {
    adapterPath: path.normalize(options.adapter.PATH),
    dev: options.dev,
    isDev: options.isDev,
    adapterOptions: options.adapterOptions
  };
  plugins.forEach(({ name, mode }) => {
    moduleScope.addPlugin({
      src: path.resolve(__dirname, `plugins/${name}.tmpl.js`),
      mode,
      options: pluginOptions
    });
  });
}

/**
 * @param Object options
 * @param ModuleContainer moduleScope
 */
function moduleSetup (moduleScope, options) {

  options.template = options.template || DEFAULT_TEMPLATE;

  return cacheRoutes(options)
    .then(routes => {
      // register extends build (webpack) & routes (nuxt)
      moduleScope.extendBuild(extendBuild(options, routes));
      moduleScope.extendRoutes(extendRoutes(options, routes));
      return routes;
    })
    .then(routes => generateRouteTemplates(options, routes))
    .then(routes => {

      // when "virtualPages" is set, parsePages deactivated.
      options.nuxtI18n.parsePages = !options.virtualPages;
      if (options.virtualPages) {
        logInfo('use virtual pages');
        return addRoutesToI18nPages(options.nuxtI18n, routes);
      } else {
        logInfo('use static page components');
        return createStaticComponents(options, routes);
      }
    });
}

function getNuxtI18nModule (options) {
  return [
    'nuxt-i18n', options.nuxtI18n
  ];
}

function extendBuild (options, routes) {
  return config => {
    if (options.virtualPages) {
      config.plugins.push(new VirtualPages(options, routes));
    }
    config.plugins.push(new VirtualLocales(options, routes));
  };
}

function extendRoutes (options, routes) {
  return (nuxtRoutes, resolve) => {

    if (options.cleanRoutes) {
      // remove all routes from nuxt
      nuxtRoutes.splice(0, nuxtRoutes.length);
    } else {
      // remove ignored routes from nuxt
      options.ignoreRoutes.forEach(name => {
        const route = nuxtRoutes.find(route => route.name === name);
        if (route) {
          nuxtRoutes.splice(nuxtRoutes.indexOf(route), 1);
        }
      });
    }

    routes.forEach(route => {

      let component = path.join('@/virtual-pages', route.path.replace(/^\//, ''));
      if (route.component) {
        // staticComponents
        component = route.component;
      }

      let routePath = route.path.replace(/^\//, '');
      const name = routePath.split('/').map(name => name.replace(/_(.*)/, '$1')).join('-');

      if (nuxtRoutes.find(route => name === route.name)) {
        logWarn(`Route "${name}" already defined in project, virtual-content route are ignored.`);
      } else {
        routePath = routePath.split('/').map(name => {
          return name.replace(/_(.*)/, ':$1?');
        }).join('/');

        nuxtRoutes.push({
          name,
          path: routePath,
          component: resolve(component),
          chunkName: path.join('pages', route.path.replace(/^\//, ''))
        });
      }
    });

  };
}
