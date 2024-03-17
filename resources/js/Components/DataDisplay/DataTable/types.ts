import { CSSProperties } from "react"

export interface PaginatedData<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: string
  last_page: string
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number
  total: number
}

export interface DataTableColumn<T> {
  title?: string | JSX.Element
  dataIndex?: keyof T
  render?: (row: T) => JSX.Element
  className?: string
  style?: CSSProperties
}

export interface DataTableProps<T> {
  title?: string
  columns: DataTableColumn<T>[]
  paginatedData: PaginatedData<T>
  filters: any
}
