import ShowButton from "@/Components/General/ShowButton"
import { CSSProperties } from "react"
import { DataTableColumn } from "./types"

export function formatStringColumn<T>(
  dataIndex: string,
  options?: { title?: string; style?: CSSProperties; sortable?: boolean },
): DataTableColumn<T> {
  const column = {
    title: options?.title ?? dataIndex,
    render: (row: any) => {
      return row[dataIndex]
    },
    style: options?.style,
    sortable: options?.sortable ?? false,
  }
  return column
}

export function formatButtonShowColumn<T>(
  routeName: string,
  getRouteParametersFunction: (row: any) => any,
  options?: { title?: string; style?: CSSProperties },
): DataTableColumn<T> {
  const column = {
    title: options?.title ?? "",
    render: (row: any) => {
      return (
        <ShowButton url={route(routeName, getRouteParametersFunction(row))} />
      )
    },
    style: options?.style ?? { width: "10px" },
  }
  return column
}
