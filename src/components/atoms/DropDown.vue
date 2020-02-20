<template>
  <select
    v-model="model.value"
    :name="model.name"
  >
    <option
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
    >
      {{ item.label }}
    </option>
  </select>
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
