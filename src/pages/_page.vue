<script>
import LocalJSON from '@/modules/nuxt-virtual-content/adapter/local-json/PageExtend';
export default {
  extends: LocalJSON,
  nuxtI18n: {
    paths: {
      en: '/:page',
      de: '/:page'
    }
  }
};
</script>
