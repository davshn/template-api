export interface pagination {
  limit: number
  offset: number
}

export interface dataList {
  count: number
  rows: any[]
}

export interface pagingDataList{
  totalItems: number
  data: any[]
  totalPages: number
  currentPage: number
}
