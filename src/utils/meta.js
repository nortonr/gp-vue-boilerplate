export function getOpenGraph (options) {

  options = Object.assign({
    type: 'website',
    site_name: null,
    title: null,
    description: null,
    url: null,
    image: null,
    image_secure_url: null,
    image_type: null,
    image_width: 1200,
    image_height: 630
  }, options);

  const tags = {
    type: { hid: 'og:site_name', property: 'og:type' },
    site_name: { hid: 'og:site_name', property: 'og:site_name' },
    title: { hid: 'og:title', property: 'og:title' },
    description: { hid: 'og:description', property: 'og:description' },
    url: { hid: 'og:url', property: 'og:url' },
    image: { hid: 'og:image', property: 'og:image' },
    image_secure_url: { hid: 'og:secure_url', property: 'og:secure_url' },
    image_type: { hid: 'og:image:type', property: 'og:image:type' },
    image_width: { hid: 'og:image:width', property: 'og:image:width' },
    image_height: { hid: 'og:image:height', property: 'og:image:height' }
  };

  [
    'url', 'image', 'image_secure_url'
  ].forEach(name => {
    let value = options[String(name)];
    if (value && !/^http[s]?:\/\//.test(value)) {
      if (!/^\//.test(value)) {
        value = `/${value}`;
      }
      options[String(name)] = `${process.env.baseUrl}${value}`;
    }
  });
  return Object.keys(tags).filter(name => options[String(name)]).map(name => Object.assign({ content: options[String(name)] }, tags[String(name)]));

}
