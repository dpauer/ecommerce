import { CSSProperties } from "react"

export interface PaginatedData {
  total: number
  per_page: number
  current_page: number
  last_page: number
  from: number
  to: number
  data: any[]
}

export interface DataTableColumn {
  title?: string | JSX.Element
  dataIndex?: string
  render?: (row: any) => JSX.Element
  className?: string
  style?: CSSProperties
  sortable?: boolean
}

export interface DataTableProps {
  title?: string
  columns: DataTableColumn[]
  routeName: string
  forceRefresh?: boolean
  setForceRefresh?: (arg0: boolean) => void
}
