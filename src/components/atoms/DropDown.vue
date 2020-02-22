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
  },

  watch: {
    'model.value' (value) {
      // console.log(value);
      // this.$router.replace({ path: '/', query: { [this.model.name]: value } });
    }
  },

  mounted () {
    // console.log(this.$route, Object.assign(this.$route.query, { [this.model.name]: this.model.value }));

    // this.$route.query[this.model.name] = this.model.value;
  }
};
</script>

<style lang="postcss" scoped>
</style>
