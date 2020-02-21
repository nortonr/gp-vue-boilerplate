<template>
  <div>
    <search-main :selection="mainSelection" />
    <search-detail :selection="childOfDetailSelection" />
    <search-detail :selection="childOfSubdetailSelection" />
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
    mainSelected () {
      return this.getOption(this.mainSelection).inputs || null;
    },
    detailSelection () {
      return this.getOption(this.mainSelection);
    },
    detailSelected () {
      return (this.getOption(this.childOfDetailSelection) || { inputs: null }).inputs || null;
    },
    subdetailSelection () {
      return this.getOption(this.childOfDetailSelection);
    },
    subdetailSelected () {
      return (this.getOption(this.childOfSubdetailSelection) || { inputs: null }).inputs || null;
    },
    childOfDetailSelection () {
      return (this.detailSelection || { child: null }).child || { model: null };
    },
    childOfSubdetailSelection () {
      return (this.subdetailSelection || { child: null }).child || { model: null };
    },
    selectedValues () {
      return this.getValues();
    },
    inputs () {
      return this.subdetailSelected || this.detailSelected || this.mainSelected;
    }
  },

  methods: {
    getOption (selection) {
      return (selection.options || []).find(option => option.value === selection.model.value);
    },

    getValues () {
      const values = [];
      values.push(this.mainSelection.model);
      values.push(this.childOfDetailSelection.model);
      values.push(this.childOfSubdetailSelection.model);
      return values.filter(n => n);
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
