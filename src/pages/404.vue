<template>
  <div class="error">
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

      stagePicture: {
        picture: {
          sourceClientOnly: false,
          sources: [
            {
              'media': 'default',
              'srcset': 'img/error.jpg'
            }
          ]
        }
      },
      text: {
        article: {
          headline: {
            overline: null,
            headline: '404 - Page not found',
            subline: null
          },
          content: '<p>Unfortunately the page was not found.</p>'
        }
      }
    };
  }

};
</script>

<style lang="postcss">
.error {
  & > * {
    visibility: visible !important;
  }
}
</style>
