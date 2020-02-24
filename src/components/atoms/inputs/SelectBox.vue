<template>
  <v-select
    v-model="model.value"
    :options="options"
    :reduce="item => item.value"
    :clearable="Boolean(false)"
  />
</template>

<script>
import VSelect from 'vue-select';

export default {
  components: {
    VSelect
  },

  props: {
    model: {
      type: Object,
      default () {
        return {};
      }
    },
    options: {
      type: Array,
      default () {
        return [];
      }
    }
  }
};
</script>

<style lang="postcss">
/* purgecss start ignore */
@import "vue-select/dist/vue-select.css";

/* purgecss end ignore */
</style>
