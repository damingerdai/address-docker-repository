import Router from 'koa-router';
import { CityHandler } from '../handlers/city.handler';
import { ProvinceHandler } from '../handlers/province.handler';

const routes = new Router();

routes.get('/api/v1/provinces', ProvinceHandler.listProvinces());
routes.get('/api/v1/province/:id', ProvinceHandler.getProvince());
routes.get('/api/v1/province/:id/cities', CityHandler.getCitiesByProvinceId());

routes.get('/api/v1/cities', CityHandler.listCities());
routes.get('/api/v1/city/:id', CityHandler.getCity());

export const router = routes;
