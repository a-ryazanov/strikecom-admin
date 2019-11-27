import ITableView from '@x10d/vue-kit/src/types/ITableView';


export interface ModuleView {
  name: string

  dataSourceEndPoint: string

  title: string

  tableView?: ITableView
}
