import { Context } from 'koa';

import { cityService } from '../services/city.service';
import { provinceService } from '../services/province.service';

export const CityHandler = {
    
    listCities: () => {
        return async(ctx: Context) => {
            const cities = await cityService.listCities();
            return ctx.rest(cities);
        }
    },

    getCity: () => {
        return async(ctx: Context) => {
            const id = ctx.params.id;
            const city = await cityService.getCity(id);
            return ctx.rest(city);
        }
    },

    getCitiesByProvinceId: () => {
        return async(ctx: Context) => {
            const id = ctx.params.id;
            const province = await provinceService.geProvince(id);
            if (province && province.id) {
                ctx.rest(
                    new Error(`fail to get province which id is ${id}`)
                )
            }
            const cities = await cityService.getCitiesByProvinceId(province.provinceId);
            return ctx.rest(cities);
        }
    }
}