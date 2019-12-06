import path from 'upath';
import { getShortName, readFile } from './index';

export async function generateRouteTemplates (options, routes) {
  const template = await readFile(options.template);
  routes.forEach(route => {
    route.template = getPageTemplate(options, template, route);
  });
  return routes;
}

function getPageTemplate (options, template, pageData) {

  // components

  const components = getImportComponents(options, pageData.data);
  const componentList = Object.keys(components.components).map(key => {
    return components.components[String(key)];
  });
  const nuxtI18nPaths = getNuxtI18nPaths(options.nuxtI18n.locales, pageData.data);

  // page components & imports

  if (components.imports.length) {
    template = template.replace('/* PLACEHOLDER_IMPORTS */', `${components.imports.join('\n')}`);
  }
  if (componentList.length) {
    template = template.replace('/* PLACEHOLDER_COMPONENTS */', `\n${componentList.join(',\n')}\n`);
  }
  if (nuxtI18nPaths) {
    template = template.replace('/* PLACEHOLDER_NUXT_I18N_PATHS */', `${nuxtI18nPaths},`);
  }

  return template;

}

function getNuxtI18nPaths (locales, pageData) {
  return 'nuxtI18n: { \n    paths: {\n' + locales.map(({ code }) => {
    let url = pageData[String(code)].url;
    if (typeof url === 'object') {
      url = url.path;
    }
    return `      '${code}': ${pageData[String(code)] ? `'${url}'` : false}`;
  }).join(',\n') + '\n    }\n  }';
}

function getImportComponents (options, pageData) {

  let components = Object.keys(pageData).reduce((result, locale) => {
    pageData[String(locale)].components.forEach(item => {
      result.push(item.component);
    });
    return result;
  }, []);
  components = Array.from(new Set(components));

  return components.reduce((result, component, i) => {
    // TODO: Beachten das der Componenten name auch verschachteln sein kann. bla/component
    const shortName = getShortName(options.componentPrefix, component);
    const componentPath = path.join('@/components/organisms', component);

    if (i < 1) {
      result.components[String(shortName)] = `    ${shortName}: hydrateWhenIdle(() => import(/* webpackMode: "eager" */'${componentPath}'))`;
      // result.imports.push(`import ${shortName} from '${componentPath}';`);
      // result.components[String(shortName)] = shortName;
    } else {
      // result.components[String(shortName)] = `${shortName}:()=>import('${componentPath}')`;
      result.components[String(shortName)] = `    ${shortName}: hydrateWhenVisible(() => import('${componentPath}'), { observerOptions: { rootMargin: '100px' } })`;
    }

    return result;
  }, {
    imports: [],
    components: {}
  });
}
