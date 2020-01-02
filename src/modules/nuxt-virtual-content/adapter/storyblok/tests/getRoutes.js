import { getRoutes } from '../index';

const options = {};

getRoutes(options).then(data => {
  console.log(data);
  return data;
}).catch(err => {
  throw err;
});
