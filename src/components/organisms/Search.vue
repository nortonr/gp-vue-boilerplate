<template>
  <form>
    <search-main :selection="matrix.getSubmatrixByDepth(0)" />
    <search-detail :selection="matrix.getSubmatrixByDepth(1)" />
    <search-detail :selection="matrix.getSubmatrixByDepth(2)" />
    {{ matrix.getValues() }}
    <component
      :is="item.component"
      v-for="(item, index) in matrix.getInputs()"
      :key="index"
      v-bind="item.options"
      :model="item.model"
    />
    <component
      :is="item.component"
      v-for="(item, index) in matrix.getCriteria()"
      :key="'test'+ index"
      :options="item.options"
      :model="item.model"
    />
    <br>
    <nuxt-link to="/?first=b&second=b1&third=b1_a">
      Senioren
    </nuxt-link>
    <br>
    <nuxt-link to="/?first=c&second=c1">
      Studenten
    </nuxt-link>
  </form>
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
import formConfig from '@/config/form';
import FormMatrix from '@/classes/FormMatrix';

export default {
  components: {
    SearchMain,
    SearchDetail
  },

  data () {
    return {
      matrix: new FormMatrix(formConfig, this.$route.query)
    };
  },

  watch: {
    $route (to, from) {
      this.matrix.updateByQuery(to.query || {});
    },
    matrix: {
      deep: true,
      handler () {
        console.log('aja');
        const result = this.matrix.getValues();
        if (!Object.compare(this.$route.query, result)) {
          this.$router.replace({
            query: result
          }).catch(() => {
            console.log('recall same url');
          });
        }
      }
    }
  }
};

Object.compare = (a, b) => {
  const s = o => Object
    .entries(o)
    .sort()
    .map((i) => {
      if (i[1] instanceof Object) { i[1] = s(i[1]); }
      return i;
    });
  return JSON.stringify(s(a)) === JSON.stringify(s(b));
};
</script>

<style lang="postcss" scoped>
</style>
