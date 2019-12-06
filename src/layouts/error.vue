
<template>
  <div class="content">
    <gp-organism-stage-picture v-bind="stagePicture" />
    <gp-organism-text v-bind="text" />
  </div>
</template>

<script>

export default {
  components: {
    gpOrganismStagePicture: () => import('@/components/organisms/StagePicture'),
    gpOrganismText: () => import('@/components/organisms/Text')
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
  },
  head () {
    return {
      title: this.error.statusCode
    };
  }
};
</script>

<style>
</style>
