<template>
  <div>
    <gp-organism-stage-image v-bind="StageImage" />
    <gp-organism-text v-bind="text" />
  </div>
</template>

<script>

import gpOrganismStageImage from '@/components/organisms/StageImage';
import gpOrganismText from '@/components/organisms/Text';
export default {
  components: { gpOrganismStageImage, gpOrganismText },

  nuxtI18n: {
    paths: {
      en: '/examples/example-1',
      de: '/beispiele/beispiel-1'
    }
  },

  data: function () {
    return {
      title: 'Example 1',

      StageImage: {
        picture: {
          sourceClientOnly: false,
          sources: [
            {
              'media': 'default',
              'srcset': 'https://dummyimage.com/1920x1080/eeeeee/000000.jpg'
            }
          ]
        }
      },
      text: {
        article: {
          headline: {
            overline: null,
            headline: 'Example 1',
            subline: null
          },
          content: '<p>Blanditiis quae optio? Vero nam beatae. Dolorum, risus nulla condimentum, ligula, velit convallis inceptos do dignissimos laoreet? Quam natus quisquam libero laborum omnis vulputate asperiores.</p>'
        }
      }
    };
  },

  head () {
    return {
      title: this.title
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
