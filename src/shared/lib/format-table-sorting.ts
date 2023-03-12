import { TableProps } from 'antd'

type Sorting<T> = Parameters<NonNullable<TableProps<T>['onChange']>>[2]
type Result = Record<string, string | undefined>

export const formatTableSorting = <T>(payload: Sorting<T>): Result => {
  const sorting = Array.isArray(payload) ? payload : [payload]

  return sorting.reduce<Result>((acc, item) => {
    // Специально не строго
    if (item.order == null) {
      acc['sort.field'] = undefined
      acc['sort.order'] = undefined
    } else {
      acc['sort.field'] = item.field as string
      acc['sort.order'] = item.order.slice(0, -3)
    }

    return acc
  }, {})
}
