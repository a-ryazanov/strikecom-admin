import conflicts from '@/module-views/conflicts';
import countries from '@/module-views/countries';
import events from '@/module-views/events';
import localities from '@/module-views/localities';
import news from '@/module-views/news';
import regions from '@/module-views/regions';

import { ModuleView, Dictionary } from '@/interfaces';


class ModuleViewService {
  private readonly moduleViewsMappings : Dictionary<ModuleView>

  constructor() {
    this.moduleViewsMappings = {
      [countries.name]: countries,
      [conflicts.name]: conflicts,
      [events.name]: events,
      [localities.name]: localities,
      [news.name]: news,
      [regions.name]: regions,
    };
  }

  public getModuleView(moduleName: string) : ModuleView {
    return this.moduleViewsMappings[moduleName];
  }
}

export const moduleView = new ModuleViewService();
