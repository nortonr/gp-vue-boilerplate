export default (ctx) => {
  ctx.$virtualContent = () => {
    const app = ctx.app;
    const path = getRoutePath(app)
      .replace(RegExp(`^/${app.i18n.locale}`), '')
      .replace(/^\/([^?.#]*)[\\/?#]{0,1}[^\\/]*$/, '$1')
      .replace(/\/index|\/$/, '') || 'index';

    return import(/* webpackMode: "lazy" */`@/virtual-locales/${app.i18n.locale}/${path}.json`).catch(() => {
      ctx.error({ statusCode: 404, message: 'local json file not found' });
    });
  };
};

function getRoutePath (app) {
  return app.router.matcher.match(app.localePath(app.getRouteBaseName())).path;
}
