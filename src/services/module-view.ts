import conflicts from '@/module-views/conflicts'
import events from '@/module-views/events'
import news from '@/module-views/news'

import { ModuleView, Dictionary } from '@/interfaces'


class ModuleViewService {
    private readonly moduleViewsMappings : Dictionary<ModuleView>

    constructor() {
        this.moduleViewsMappings = {
            [conflicts.name]: conflicts,
            [events.name]: events,
            [news.name]: news,
        }
    }

    public getModuleView(moduleName : string) : ModuleView {
        return this.moduleViewsMappings[moduleName]
    }
}

export const moduleView = new ModuleViewService()
