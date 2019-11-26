import { Dictionary } from './dictionary';


export interface ServerResponse<T> {
    // Непосредственно сами данные
    data: T | T[]

    // Поле присутствует в ответе, но веб-приложением никак не используется
    links?: Dictionary<string>

    // Мета-информация о данных. Пагинация, общее количество элементов и т.д.
    meta?: ServerResponseMeta
}

export interface ServerResponseMeta {
    // Текущая страница
    current_page: number

    // Последняя страница в наборе
    last_page: number

    // Количество элементов на странице
    per_page: number

    // Количество элементов в наборе
    total: number
}
