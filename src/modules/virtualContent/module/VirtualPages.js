
const VirtualModule = require('webpack-virtual-modules');
const nodeify = require('nodeify');
const fs = require('fs');
const path = require('upath');
const utils = require('../utils');

const PLUGIN_NAME = 'VirtualPages';
// const PARAMS_CONTENT = PLUGIN_NAME + '_content';

module.exports = class VirtualPages extends VirtualModule {
  constructor(options, routes = []) {
    super();

    this.routes = routes;
    this.options = Object.assign({ componentPrefix: 'virtual' }, options);

  }

  apply (compiler) {
    super.apply(compiler);
    compiler.hooks.beforeCompile.tapAsync(PLUGIN_NAME, onBeforeCompile(this));
    compiler.hooks.compilation.tap(PLUGIN_NAME, onCompilation(this));
  }

};

function readPageTemplate () {
  return new Promise(resolve => {
    fs.readFile(path.resolve(process.cwd(), 'src', 'pages/blueprint.vue'), 'utf8', function (err, data) {
      if (err) {
        throw err;
      }
      resolve(data);
    });
  });
}

function onBeforeCompile () {
  return (params, callback) => {
    nodeify(readPageTemplate().then(fileContent => {
      params['pageTemplate'] = fileContent;
      return fileContent;
    }), callback);
  };
}

function onCompilation (virtualModule) {
  return (compilation, params) => {

    const routes = generatePageTemplates(virtualModule.options, params['pageTemplate'], virtualModule.routes);

    routes.forEach(route => {
      virtualModule.writeModule(
        path.join('src/virtual-pages', `${route.path.replace(/^\//, '')}.vue`),
        route.template
      );
    });
  };
}

function generatePageTemplates (options, template, routes) {
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

  // page components & imports

  template = template.replace('/* PLACEHOLDER_IMPORTS */', `${components.imports.join('\n')}`);
  template = template.replace('/* PLACEHOLDER_COMPONENTS */', `\n${componentList.join(',\n')}\n`);

  return template;

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
    const shortName = utils.getShortName(options.componentPrefix, component);
    const componentPath = path.join('@/components/organisms', component);

    if (i < 2) {
      result.components[String(shortName)] = `${shortName}:()=>import(/* webpackMode: "eager" */'${componentPath}')`;
      // result.imports.push(`import ${shortName} from '${componentPath}';`);
      // result.components[String(shortName)] = shortName;
    } else {
      // result.components[String(shortName)] = `${shortName}:()=>import('${componentPath}')`;
      result.components[String(shortName)] = `${shortName}:hydrateWhenVisible(()=>import('${componentPath}'), { observerOptions: { rootMargin: '0px' } })`;
    }
    return result;
  }, {
    imports: [],
    components: {}
  });
}
