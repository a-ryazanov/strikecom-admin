import compose from '@tinkoff/utils/function/compose'
import { parse, format } from 'date-fns'

const parseServerDate = (date: number): Date => parse(date.toString(10), 't', new Date())

const daytime = (date: Date): string => format(date, 'dd.MM.yyyy HH:mm')

export const formatToDaytime = compose(daytime, parseServerDate)
