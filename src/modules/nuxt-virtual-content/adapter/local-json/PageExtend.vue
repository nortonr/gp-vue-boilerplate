
<template>
  <div class="content">
    <component
      :is="item.component"
      v-for="(item, index) in components"
      :key="index"
      v-bind="item.data"
    />
  </div>
</template>

<script>

export default {

  data: function () {
    return {
      title: null,
      meta: null,
      components: []
    };
  },

  head () {
    return {
      title: this.title,
      meta: this.meta
    };
  },

  asyncData ({ app, route, store, error }) {
    const locale = app.i18n.locale;
    const fullPath = route.fullPath.replace(RegExp(`^/${app.i18n.locale}([/]?)`), '/');

    return getRouteData(locale, fullPath).then(routeData => {
      if (!routeData) {
        throw new Error(`path not found "${fullPath}"`);
      }
      if ('routeParams' in routeData) {
        // set other locale slugs for languageSwitch
        store.dispatch('i18n/setRouteParams', routeData.routeParams);
      }
      return routeData.data[String(locale)];
    }).catch((err) => {
      error({ statusCode: err.code, message: err.message });
    });
  },

  created () {
    this.components = getAsyncComponents(this.components);
  }

};

function getAsyncComponents (componentsData, initialVisibleComponents = 1) {
  return componentsData.map((item, index) => {
    let asyncLoad = () => import(`@/components/organisms/${item.component}`);
    item.data.options = item.data.options || {};
    if (index >= initialVisibleComponents) {
      return {
        component: asyncLoad,
        data: item.data
      };
    }
    item.data.options = Object.assign(item.data.options, {
      visible: true
    });
    return {
      component: asyncLoad,
      data: item.data
    };
  });
}

// ####################################################################

const req = require.context('@/locales', true, /\.json$/);
const pages = req.keys().map(path => {
  const data = req(path);
  return Object.keys(data).reduce((result, locale) => {
    const url = data[String(locale)].url.replace(/^\//, '').split('/');
    if (url.length > 1) {
      result.routeParams[String(locale)] = { nested: url[0], page: url[1] };
    } else {
      result.routeParams[String(locale)] = { page: url[0] };
    }
    result.matches.push({ url: data[String(locale)].url, locale });
    return result;
  }, {
    path: path, data,
    routeParams: {},
    matches: []
  });
});

export function getRouteData (locale, fullPath) {
  const page = pages.find(page => page.matches.find(match => match.locale === locale && match.url === fullPath));
  return Promise.resolve(page);
}

</script>

