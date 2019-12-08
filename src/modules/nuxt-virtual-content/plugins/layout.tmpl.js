import { getLayout } from '<%= options.adapterPath %>';

export default (ctx) => {
  ctx.$getVirtualContentLayout = () => {
    return getLayout(ctx.$getVirtualContentOptions());
  };
  ctx.$getVirtualContentOptions = () => {
    const locales = ctx.app.i18n.locales.map(locale => locale.code);
    const locale = ctx.app.i18n.locale;
    return Object.assign({
      route: ctx.route,
      path: ctx.route.path.replace(RegExp(`^\\/${locale}`), '/'),
      locale,
      locales
    }, <%= JSON.stringify(options) %>);
  };
};
