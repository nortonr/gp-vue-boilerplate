
const VirtualPages = require('./module/VirtualPages');
const VirtualLocales = require('./module/VirtualLocales');
const path = require('upath');

const utils = require('./utils');

module.exports = async function (options) {

  options = Object.assign({ adapter: null, componentPrefix: 'virtual', isDev: this.nuxt.options.dev }, options);

  if (!options.adapter || !options.adapter.getRoutes) {
    throw new Error('no adapter defined!');
  }

  const routes = await options.adapter.getRoutes();

  utils.extendsNuxtI18nPages(this.options, routes);

  this.extendBuild(config => {
    config.plugins.push(new VirtualPages(options, routes));
    config.plugins.push(new VirtualLocales(options, routes));
  });

  this.extendRoutes((nuxtRoutes, resolve) => {
    nuxtRoutes.splice(0, nuxtRoutes.length);
    routes.forEach(route => {
      nuxtRoutes.push({
        name: route.path.replace(/\//g, '-'),
        component: resolve(path.join('@/virtual-pages', route.path)),
        chunkName: path.join('pages', route.path)
      });
    });
  });

};
