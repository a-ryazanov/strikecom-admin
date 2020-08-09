export enum Networks {
    ALL = 'all',
    TG = 'tg',
    OD = 'od',
    VK = 'vk',
}

export const networksMappings = {
    [Networks.TG]: 'telegram',
    [Networks.OD]: 'odnoklassniki',
    [Networks.VK]: 'vkontakte',
}
