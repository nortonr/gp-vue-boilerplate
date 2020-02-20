<template>
  <div>
    <drop-down
      :options="dropDownFirst.options"
      :model="dropDownFirst.model"
      @change.native="onChange"
    />

    <drop-down
      v-if="dropDownSecond"
      :options="dropDownSecond.options"
      :model="dropDownSecond.model"
      @change.native="onChange"
    />

    <drop-down
      v-if="dropDownThird"
      :options="dropDownThird.options"
      :model="dropDownThird.model"
      @change.native="onChange"
    />
  </div>
</template>

<story
  name="SelectList"
  group="Molecules"
  knobs="{}"
  >
  <select-list/>
</story>

<script>
import DropDown from '@/components/atoms/DropDown';
import formMatrix from '@/service/formMatrix';

export default {
  components: {
    DropDown
  },

  data () {
    return formMatrix;
  },

  computed: {
    dropDownFirst () {
      return this.dropDowns;
    },

    dropDownSecond () {
      return this.dropDowns.options.find(option => option.value === this.dropDowns.model.value).child;
    },

    dropDownThird () {
      if (this.dropDownSecond) {
        return this.dropDownSecond.options.find(option => option.value === this.dropDownSecond.model.value).child;
      }
      return null;
    }
  },

  methods: {
    onChange (e) {
      console.log('CHANGE', e);
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
