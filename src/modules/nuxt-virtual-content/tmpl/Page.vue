
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
  hydrateWhenVisible
} from 'vue-lazy-hydration';

/* PLACEHOLDER_IMPORTS */

export default {
  scrollToTop: true,

  /* PLACEHOLDER_NUXT_I18N_PATHS */

  components: {
    /* PLACEHOLDER_COMPONENTS */
  },

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

  asyncData ({ $virtualContent, error }) {
    return $virtualContent().then(data => {
      return {
        title: data.title,
        meta: [].concat((data.meta || []), getOpenGraph(data.openGraph)),
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
