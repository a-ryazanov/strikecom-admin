import ITableView from '@x10d/vue-kit/src/types/ITableView.d'
import IActionButtonView from '@x10d/vue-kit/src/types/IActionButtonView.d'


export interface ModuleView {
    name : string

    dataSourceEndPoint : string

    title : string

    tableView ?: ITableView

    globalActions ?: Array<IActionButtonView>
}
