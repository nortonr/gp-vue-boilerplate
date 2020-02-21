<template>
  <div>
    <drop-down
      v-if="selection.model"
      :options="selection.options"
      :model="selection.model"
    />
  </div>
</template>

<script>
import DropDown from '@/components/atoms/DropDown';

export default {
  components: {
    DropDown
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
