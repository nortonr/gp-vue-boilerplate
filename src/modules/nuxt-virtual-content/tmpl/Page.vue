
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

import { getOpenGraph } from '@/utils/meta';

import {
  // eslint-disable-next-line no-unused-vars
  hydrateWhenIdle,
  // eslint-disable-next-line no-unused-vars
  hydrateWhenVisible
} from 'vue-lazy-hydration';

/* PLACEHOLDER_IMPORTS */

export default {
  scrollToTop: true,

  /* PLACEHOLDER_NUXT_I18N_PATHS */

  components: {
    /* PLACEHOLDER_COMPONENTS */
  },

  asyncData ({ $virtualContent, error }) {

    return $virtualContent().then(data => {
      const meta = [].concat((data.meta || []));
      if ('openGraph' in data) {
        meta.push(...getOpenGraph(data.openGraph));
      }
      return {
        title: data.title,
        meta,
        components: data.components
      };
    }).catch(() => {
      error({ statusCode: 404, message: 'virtual content module not found' });
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
    this.components = this.components.map((component, index) => {
      component.data.options = component.data.options || {};
      if (index < 2) {
        component.data.options = Object.assign(component.data.options, {
          visible: true
        });
      }
      return component;
    });
  },

  head () {
    return {
      title: this.title,
      meta: this.meta
    };
  }

};

</script>
