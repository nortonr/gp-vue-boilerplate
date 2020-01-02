import { getLayout } from '../index';

const options = {
  adapterOptions: {
    accessToken: '2rudyPIpd1oB4feReF9CWQtt'
  },
  locales: [
    'de', 'en'
  ],
  defaultLocale: 'de',
  isPreview: true
};

getLayout(options).then(data => {
  console.log(data);
  return data;
}).catch(err => {
  throw err;
});
