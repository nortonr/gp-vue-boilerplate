<template>
  <div>
    <v-numeric
      v-model="model.value"
      :separator="getSeparator()"
      :decimal-separator="getDecimalSeparator()"
      :precision="precision"
    />

    {{ $n(model.value, { style: formatStyle, maximumFractionDigits: precision, minimumFractionDigits: precision }) }} {{ unit }}
  </div>
</template>

<script>
import VNumeric from 'vue-numeric';

// const formattedParts = new Intl.NumberFormat({}).formatToParts(1111.11);

export default {
  components: {
    VNumeric
  },

  props: {
    model: {
      type: Object,
      default () {
        return { value: 0 };
      }
    },
    precision: {
      type: Number,
      default () {
        return 2;
      }
    },
    formatStyle: {
      type: String,
      default () {
        return 'decimal';
      }
    },
    unit: {
      type: String,
      default () {
        return '';
      }
    }
  },

  methods: {
    getSeparator () {
      // return formattedParts.find(part => part.type === 'group').value;
      return new Intl.NumberFormat({}).format(1111.11).match(/(.)([\d]+)(.)([\d]+)$/)[1];
    },

    getDecimalSeparator () {
      // return formattedParts.find(part => part.type === 'decimal').value;
      return new Intl.NumberFormat({}).format(1111.11).match(/(.)([\d]+)(.)([\d]+)$/)[3];
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
