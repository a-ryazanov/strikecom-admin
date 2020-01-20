import { Dictionary } from './dictionary'


export interface Catalogs {
    [key : string] : Dictionary<Dictionary<string>>
}
