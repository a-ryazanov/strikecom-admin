import { Locale } from './locale';
import { FetchMetadata } from './fetch-metadata';


export interface RootState {
    // Текущий язык приложения
    locale: Locale

    // Глобальное состояние загрузки приложения
    fetchMeta: FetchMetadata

    // Идентификатор последнего выбранного элемента из списка сущностей
    lastSelectedItemIdFromEntityList: number | null,

    [key: string]: any
}
