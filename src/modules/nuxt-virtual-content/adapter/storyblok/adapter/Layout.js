import { getLinks } from '../utils/page';

export default async function Layout (client, data, locale) {

  let { footerLinks, headerLinks, menuButton } = data.content;

  headerLinks = await getLinks(client, locale, headerLinks);
  footerLinks = await getLinks(client, locale, footerLinks);

  // console.log('links', JSON.stringify(links));
  return {
    'openGraph': {
      'title': 'Boilerplate',
      'image': 'img/open-graph/image.png',
      'image_secure_url': 'img/open-graph/image.png',
      'image_type': 'image/png'
    },
    'components': {
      'pageHeader': {},
      'pageMenu': {
        'navigation': headerLinks
      },
      'pageMenuButton': {
        'label': menuButton
      },
      'pageFooter': {
        'navigation': footerLinks
      }
    }
  };

}
