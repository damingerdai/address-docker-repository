import db from '../lib/db';
import { IProvince, Provinces } from '../types/province';

export const provinceService = {

		listProvinces(): Promise<Provinces> {
				return db.select('id', 'name', 'provinceId').from('province');
		},

		geProvince(id: string): Promise<IProvince> {
				return db.select('id', 'name', 'provinceId').from('province').where('id', id).first();
		}
};
