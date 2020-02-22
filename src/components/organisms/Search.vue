<template>
  <div>
    <search-main :selection="getMatrixByDepth(0)" />
    <search-detail :selection="getMatrixByDepth(1)" />
    <search-detail :selection="getMatrixByDepth(2)" />
    {{ getValues() }}
    {{ getInputs() }}
    <br>
    <nuxt-link to="/?first=b&second=b1&third=b1_a">
      Test B1 A
    </nuxt-link>
    <br>
    <nuxt-link to="/?first=c&second=c1">
      Test C1
    </nuxt-link>
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
import matrix from '@/service/formMatrix';
import formMatrix from '@/utils/formMatrix';

export default {
  components: {
    SearchMain,
    SearchDetail
  },

  data () {
    return {
      matrix: formMatrix.updateByQuery(matrix, { ...this.$route.query })
    };
  },

  watch: {
    $route (to, from) {
      console.log('AJA', to.query);
      formMatrix.updateByQuery(this.matrix, { ...to.query } || {});
    },
    matrix: {
      deep: true,
      handler () {
        const result = this.getValues();
        if (!Object.compare(this.$route.query, result)) {
          this.$router.replace({
            query: result
          }).catch(() => {
            console.log('recall same url');
          });
        }
      }
    }
  },

  methods: {
    getMatrixByDepth (depth) {
      return formMatrix.getByDepth(this.matrix, depth);
    },

    getInputs () {
      return formMatrix.getInputs(this.matrix);
    },

    getValues () {
      return formMatrix.getValues(this.matrix);
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
