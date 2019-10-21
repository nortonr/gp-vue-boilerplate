<template>
  <header>
    <nav>
      <link-list :list="navigation" />
    </nav>
    <div
      v-if="hasI18n"
      class="langs"
    >
      <nuxt-link
        v-for="language in languages"
        :key="language.code"
        :to="switchLocalePath(language.code)"
        class="language-switch"
      >
        {{ language.code }}
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import LinkList from '~/components/molecules/LinkList';

export default {
  components: {
    'link-list': LinkList
  },
  props: {
    navigation: {
      type: Array,
      required: true,
      default: function () {
        return [];
      }
    }
  },

  computed: {
    hasI18n () {

      return process.env.I18N_MODULE_ACTIVATED;
    },
    languages: function () {
      return this.$i18n.locales.filter((locale) => {
        return locale.code !== this.$i18n.locale;
      });
    }
  }
};
</script>
