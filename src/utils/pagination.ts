import { pagination, dataList, pagingDataList } from '../types/admin'

export const getPagination = (page: number, size: number): pagination => {
  const limit = (size > 0) ? size : 100
  const offset = (page > 1) ? (page - 1) * limit : 0
  return { limit, offset }
}

export const getPagingData = (data: dataList, page: number, limit: number): pagingDataList => {
  const { count: totalItems, rows: result } = data
  const currentPage = page
  const totalPages = Math.ceil(totalItems / limit)
  return { totalItems, data: result, totalPages, currentPage }
}
