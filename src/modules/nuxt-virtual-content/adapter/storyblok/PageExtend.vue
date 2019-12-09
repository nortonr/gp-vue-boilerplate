
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

import getBridge from './service/bridge';

export default {

  asyncData ({ $getVirtualContent }) {
    return $getVirtualContent();
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

  mounted () {
    getBridge(this.$getVirtualContentOptions()).then(bridge => {
      bridge.on([
        'input', 'published', 'change'
      ], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content;
          }
        } else {
          window.location.reload();
        }
      });
      return bridge;
    }).catch(err => {
      throw err;
    });
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

