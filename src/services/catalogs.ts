import { map, reduce, keyBy } from 'lodash-es';

import { api } from './api';

import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
} from '@/util';

import { Catalogs, Dictionary } from '@/interfaces';


class CatalogsService {
    private catalogs: Catalogs | null

    private readonly catalogsCheckSum: string | null

    constructor() {
      this.catalogsCheckSum = getValueFromLocalStorage('catalogsCheckSum');

      // JSON.parse(null) вернет null. Неясно, почему TS ругается
      // @ts-ignore
      this.catalogs = JSON.parse(getValueFromLocalStorage('catalogs'));
    }

    async initialize(checkSum: string): Promise<void> {
      if (!this.catalogs || checkSum !== this.catalogsCheckSum) {
        const { data: fetchedCatalogs } = await api.fetchCatalogs();

        this.catalogs = reduce<any, Catalogs>(fetchedCatalogs, (accumulator, catalog, key) => {
          accumulator[key] = keyBy(catalog, o => o.id);

          return accumulator;
        }, {});

        setValueToLocalStorage('catalogsCheckSum', checkSum);
        setValueToLocalStorage('catalogs', JSON.stringify(this.catalogs));
      }
    }

    getCatalog(catalogName: string): Dictionary<string>[] | null {
      return this.catalogs ? map(this.catalogs[catalogName], item => item) : null;
    }

    getCatalogValue(catalogName: string, itemId: number): Dictionary<string> | null {
      return this.catalogs ? this.catalogs[catalogName][itemId] : null;
    }
}

export const catalogs = new CatalogsService();
