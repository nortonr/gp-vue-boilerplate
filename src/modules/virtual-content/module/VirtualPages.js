import VirtualModule from 'webpack-virtual-modules';
import path from 'upath';

const PLUGIN_NAME = 'VirtualPages';

export default class VirtualPages extends VirtualModule {
  constructor(options, routes = []) {
    super();

    this.routes = routes;
    this.options = Object.assign({ componentPrefix: 'virtual' }, options);

  }

  apply (compiler) {
    super.apply(compiler);
    compiler.hooks.compilation.tap(PLUGIN_NAME, onCompilation(this));
  }

}

function onCompilation (virtualModule) {
  return () => {
    virtualModule.routes.forEach(route => {
      virtualModule.writeModule(
        path.join('src/virtual-pages', `${route.path.replace(/^\//, '')}.vue`),
        route.template
      );
    });
  };
}

