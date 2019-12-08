<% if (options.isDev || !options.dev && options.isDev) { %>
import { getRoute, getLayout } from '<%= options.adapterPath %>';
<% } %>

import Vue from 'vue';

export default (ctx) => {
  <% if (!options.isDev || options.dev && options.isDev) { %>
    ctx.$getVirtualContent = () => {
      const app = ctx.app;
      const path = getRoutePath(app)
        .replace(RegExp(`^/${app.i18n.locale}`), '')
        .replace(/^\/([^?.#]*)[\\/?#]{0,1}[^\\/]*$/, '$1')
        .replace(/\/index|\/$/, '') || 'index';
      console.log(path)
      return import(/* webpackMode: "lazy" */`@/virtual-locales/pages/${app.i18n.locale}/${path}.json`).catch(err => {
        ctx.error({ statusCode: err.code, message: `local json file not found\n${err.message}` });
      });
    };
  <% } else { %>
    ctx.$getVirtualContent = () => {
      const locales = ctx.app.i18n.locales.map(locale => locale.code);
      const locale = ctx.app.i18n.locale;
      return getRoute(ctx.$getVirtualContentOptions()).then(route => {
        if (!route) {
          throw new Error(`route not found "${ctx.route.path}"`);
        }
        if ('routeParams' in route) {
          // set other locale slugs for languageSwitch
          ctx.store.dispatch('i18n/setRouteParams', route.routeParams);
        }
        return route.data[String(locale)];
      });
    };
  <% } %>
    Vue.prototype.$getVirtualContentOptions = ctx.$getVirtualContentOptions = () => {
      const locales = ctx.app.i18n.locales.map(locale => locale.code);
      const locale = ctx.app.i18n.locale;
      return Object.assign({
        route: ctx.route,
        path: ctx.route.path.replace(RegExp(`^\\/${locale}`), '/'),
        locale,
        locales
        /* eslint-disable-line */
      }, <%= JSON.stringify(options) %>
      );
    };
};

function getRoutePath (app) {
  return app.router.matcher.match(app.localePath(app.getRouteBaseName())).path;
}

