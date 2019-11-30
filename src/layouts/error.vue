
<template>
  <div class="content">
    <gp-organism-stage-picture v-bind="stagePicture" />
    <gp-organism-text v-bind="text" />
  </div>
</template>

<script>
import gpOrganismStagePicture from '@/components/organisms/StagePicture';
import gpOrganismText from '@/components/organisms/Text';

export default {
  components: {
    gpOrganismStagePicture,
    gpOrganismText
  },
  head () {
    return {
      title: this.error.statusCode
    };
  },

  props: {
    error: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  data: function () {
    return {
      components: []
    };
  },

  computed: {

    stagePicture () {
      return {
        'picture': {
          'sourceClientOnly': false,
          'sources': [
            {
              'media': 'default',
              'srcset': 'img/error.jpg'
            }
          ]
        }
      };
    },
    text () {
      return {
        article: {
          headline: {
            overline: null,
            headline: String(this.error.statusCode),
            subline: null
          },
          content: `<p>${this.error.message}</p>`
        }
      };
    }
  }

};
</script>

<style>
</style>
