
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

import { getRoute } from './index';

export default {

  asyncData ({ app, route, store, error }) {
    const locale = app.i18n.locale;
    return getRoute(route.path.replace(RegExp(`^\\/${locale}`), ''), locale).then(route => {
      if (!route) {
        throw new Error(`path not found "${route.path}"`);
      }
      if ('routeParams' in route) {
        // set other locale slugs for languageSwitch
        store.dispatch('i18n/setRouteParams', route.routeParams);
      }
      return route.data[String(locale)];
    }).catch((err) => {
      error({ statusCode: err.code, message: err.message });
    });
  },

  data: function () {
    return {
      title: null,
      meta: null,
      components: []
    };
  },

  created () {
    this.components = getAsyncComponents(this.components);
  },

  head () {
    return {
      title: this.title,
      meta: this.meta
    };
  }

};

function getAsyncComponents (componentsData) {
  return componentsData.map((item) => {
    let asyncLoad = () => import(`@/components/organisms/${item.component}`);
    item.data.options = Object.assign(item.data.options || {}, {
      visible: true
    });
    return {
      component: asyncLoad,
      data: item.data
    };
  });
}

</script>

