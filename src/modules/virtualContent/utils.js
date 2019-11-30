/**
 * Get module option from nuxt config
 */
export function getModuleOptions (modules, name) {
  let module = modules.find(module => module[0] === name);
  if (module) {
    if (typeof module[1] === 'object') {
      return module[1];
    }
    return {};
  }
  return null;
}

export function extendsNuxtI18nPages (options, routes) {

  const pages = routes.reduce((result, route) => {

    result[route.path] = Object.keys(route.data).reduce((result, locale) => {
      result[String(locale)] = route.data[String(locale)].url;
      return result;
    }, {});

    return result;

  }, {});

  const nuxtI18nOptions = getModuleOptions(options.modules, 'nuxt-i18n');
  nuxtI18nOptions.parsePages = false;
  nuxtI18nOptions.pages = pages;
  console.debug(nuxtI18nOptions);
}

/**
 * article/HeadlineText -> prefixArticleHeadlineText
 */
export function getShortName (prefix, component) {
  return prefix + component.split('/').map(name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }).join('');
}
