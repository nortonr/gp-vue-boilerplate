import { getRoute } from '../index';

const options = {
  adapterOptions: {
    accessToken: '2rudyPIpd1oB4feReF9CWQtt'
  },
  locales: [
    'de', 'en'
  ],
  locale: 'en',
  defaultLocale: 'de',
  isPreview: true,
  route: {
    params: {
      page: 'project-1',
      nested: 'projects'
    }
  }
};

getRoute(options).then(data => {
  console.log(data);
  return data;
}).catch(err => {
  throw err;
});
