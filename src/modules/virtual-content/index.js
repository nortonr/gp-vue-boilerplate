
import VirtualPages from './module/VirtualPages';
import VirtualLocales from './module/VirtualLocales';
import path from 'upath';
import { getNuxtI18nOptions, addRoutesToI18nPages, cacheRoutes, createStaticComponents, logInfo } from './utils';
import { generateRouteTemplates } from './utils/template';

const DEFAULT_TEMPLATE = path.resolve(process.cwd(), 'src/modules/virtual-content/tmpl/Page.vue');

module.exports = async function (options) {

  const nuxtConfig = this.options;

  options = Object.assign({
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
    locales: [
      {
        code: 'en',
        iso: 'en-US'
      }
    ],
    adapter: null,
    template: null,
    componentPrefix: 'virtual',
    isDev: this.nuxt.options.dev,
    routesCache: true,
    debug: false
  }, options);

  options.template = options.template || DEFAULT_TEMPLATE;

  const nuxtI18nOptions = getNuxtI18nOptions(nuxtConfig);

  if (!options.adapter || !options.adapter.getRoutes) {
    throw new Error('no adapter defined!');
  }

  /**
   * add context plugin
   */
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      adapter: options.adapter
    }
  });

  return cacheRoutes(options, options.adapter.getRoutes)
    .then(routes => {
      // register extends build (webpack) & routes (nuxt)
      this.extendBuild(extendBuild(options, routes));
      this.extendRoutes(extendRoutes(options, routes));
      return routes;
    })
    .then(routes => generateRouteTemplates(options, routes))
    .then(routes => {
      // when "virtualPages" is set, parsePages deactivated.
      nuxtI18nOptions.parsePages = !options.virtualPages;
      if (!options.virtualPages) {
        logInfo('use static page components');
        return createStaticComponents(options, routes);
      } else {
        logInfo('use virtual pages');
        return addRoutesToI18nPages(nuxtI18nOptions, routes);
      }
    });

};

function extendBuild (options, routes) {
  return config => {
    if (options.virtualPages) {
      config.plugins.push(new VirtualPages(options, routes));
    }
    config.plugins.push(new VirtualLocales(options, routes));
  };
}

function extendRoutes (options, routes) {
  return (defaultRoutes, resolve) => {
    routes.forEach(route => {

      let component = path.join('@/virtual-pages', route.path.replace(/^\//, ''));
      if (route.component) {
        // staticComponents
        component = route.component;
      }

      let routePath = route.path.replace(/^\//, '');
      const name = routePath.split('/').map(name => name.replace(/_(.*)/, '$1')).join('-');

      routePath = routePath.split('/').map(name => {
        return name.replace(/_(.*)/, ':$1?');
      }).join('/');

      defaultRoutes.push({
        name,
        path: routePath,
        component: resolve(component),
        chunkName: path.join('pages', route.path.replace(/^\//, ''))
      });
    });

  };
}
