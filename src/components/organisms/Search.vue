<template>
  <div>
    <search-main :selection="mainSelection" />
    <search-detail :selection="detailSelection" />
    <search-detail :selection="subDetailSelection" />
    {{ selectedValues }}
    {{ inputs }}
  </div>
</template>

<story
  name="Search"
  group="Organisms"
  knobs="{}"
  >
  <search/>
</story>

<script>
import SearchMain from '@/components/molecules/search/Main';
import SearchDetail from '@/components/molecules/search/Detail';
import formMatrix from '@/service/formMatrix';

export default {
  components: {
    SearchMain,
    SearchDetail
  },

  data () {
    return {
      mainSelection: formMatrix
    };
  },

  computed: {
    detailSelection () {
      return this.mainSelection.options.find(option => option.value === this.mainSelection.model.value).child;
    },
    subDetailSelection () {
      if (this.detailSelection) {
        return this.detailSelection.options.find(option => option.value === this.detailSelection.model.value).child;
      }
      return null;
    },
    selectedValues () {
      return this.getValues();
    },
    inputs () {
      if (this.subDetailSelection && this.subDetailSelection.options.find(option => option.value === this.subDetailSelection.model.value).inputs) {
        return this.subDetailSelection.options.find(option => option.value === this.subDetailSelection.model.value).inputs;
      }
      if (this.detailSelection && this.detailSelection.options.find(option => option.value === this.detailSelection.model.value).inputs) {
        return this.detailSelection.options.find(option => option.value === this.detailSelection.model.value).inputs;
      }
      return this.mainSelection.options.find(option => option.value === this.mainSelection.model.value).inputs;
    }
  },

  methods: {
    getValues () {
      const values = [];
      values.push(this.mainSelection.model);
      if (this.detailSelection) {
        values.push(this.detailSelection.model);
      }
      if (this.subDetailSelection) {
        values.push(this.subDetailSelection.model);
      }
      return values;
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
