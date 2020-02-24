<template>
  <div>
    <select-box
      v-if="selection.model"
      :options="selection.options"
      :model="selection.model"
    />
  </div>
</template>

<script>
import SelectBox from '@/components/atoms/inputs/SelectBox';

export default {
  components: {
    SelectBox
  },

  props: {
    selection: {
      type: Object,
      default () {
        return null;
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
