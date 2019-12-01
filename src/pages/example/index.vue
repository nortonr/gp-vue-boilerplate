<template>
  <div>
    <gp-organism-stage-picture v-bind="stagePicture" />
    <gp-organism-text v-bind="text" />
  </div>
</template>

<script>

import gpOrganismStagePicture from '@/components/organisms/StagePicture';
import gpOrganismText from '@/components/organisms/Text';
export default {
  components: { gpOrganismStagePicture, gpOrganismText },

  nuxtI18n: {
    paths: {
      en: '/example',
      de: '/beispiel'
    }
  },

  head () {
    return {
      title: this.title
    };
  },

  data: function () {
    return {
      title: 'Example',

      stagePicture: {
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
            headline: 'Example',
            subline: null
          },
          content: '<p>Blanditiis quae optio? Vero nam beatae. Dolorum, risus nulla condimentum, ligula, velit convallis inceptos do dignissimos laoreet? Quam natus quisquam libero laborum omnis vulputate asperiores.</p>'
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
