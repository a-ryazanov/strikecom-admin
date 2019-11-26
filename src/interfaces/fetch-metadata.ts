export interface FetchMetadata {
    // Загружается ли приложение в данный (виден ли глобальный индикатор загрузки)
    isLoading: boolean

    // Ошибка загрузки
    error?: any
}
