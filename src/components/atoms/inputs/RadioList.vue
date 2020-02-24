<template>
  <fieldset>
    <input
      v-for="(item, index) in options"
      :key="index"
      v-model="model.value"
      :name="model.name"
      type="radio"
      :value="item.value"
    >
  </fieldset>
</template>

<script>
export default {
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

<style lang="postcss" scoped>
</style>
