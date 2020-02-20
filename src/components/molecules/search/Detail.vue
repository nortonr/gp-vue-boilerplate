<template>
  <div>
    <drop-down
      v-if="selection"
      :options="selection.options"
      :model="selection.model"
    />

    <!-- <drop-down
      v-if="dropDownThird"
      :options="dropDownThird.options"
      :model="dropDownThird.model"
      @change.native="onChange"
    /> -->
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
