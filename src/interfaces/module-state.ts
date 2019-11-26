import { Dictionary } from './dictionary';
import { ServerResponseMeta } from './server-response';


export interface ModuleState<T> {
    // Идентификаторы элементов модуля
    ids: number[]

    // Сущности модуля, где ключ - идентификатор, а значение - сама сущность
    entities: Dictionary<T>

    // Мета-информация последнего запроса
    lastResponseMeta?: ServerResponseMeta | null

    [key: string]: any
}
