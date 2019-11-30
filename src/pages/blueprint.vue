
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
import {
  // eslint-disable-next-line no-unused-vars
  hydrateWhenVisible
} from 'vue-lazy-hydration';

/* PLACEHOLDER_IMPORTS */

export default {
  scrollToTop: true,

  components: { /* PLACEHOLDER_COMPONENTS */ },

  data: function () {
    return { /* PLACEHOLDER_DATA */ };
  },

  head () {
    return {
      title: this.title
    };
  },

  asyncData ({ store, app, route, error }) {

    const path = (route.fullPath + '/')
      // remove lang prefix
      .replace(/^\//, '')
      .replace(/^\w{2}\//, '')
      .replace(/\/$/, '') || 'index';

    return import(/* webpackMode: "lazy" */`@/virtual-locales/${app.i18n.locale}/${path}.json`).then(data => {

      // TODO: Brauch man das noch? kann doch auch über die i18n routen gesteuert werden.
      if ('routeParams' in data) {
        // set other locale slugs for languageSwitch
        store.dispatch('i18n/setRouteParams', data.routeParams);
      }
      return {
        title: data.title,
        components: data.components
      };
    }).catch(() => {
      error({ statusCode: 404, message: 'local json file not found' });
    });
  },

  created () {
    this.components = this.components.map((component, index) => {
      component.data.options = component.data.options || {};
      if (index < 2) {
        component.data.options = Object.assign(component.data.options, {
          visible: true
        });
      }
      return component;
    });
  }

};

</script>

<style>
</style>
