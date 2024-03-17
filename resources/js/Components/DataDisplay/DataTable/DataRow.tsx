import { isDefined } from "@/utils/misc"
import { DataTableColumn } from "./types"

export interface Props {
  columns: DataTableColumn[]
  row: any
}
export default function DataRow({ columns, row }: Props): JSX.Element {
  return (
    <tr>
      {columns.map((el, colIdx) => {
        if (isDefined(el.dataIndex)) {
          const value = row[el.dataIndex]
          return (
            <td key={colIdx} className={el.className} style={el.style}>
              <>{value}</>
            </td>
          )
        }
        if (isDefined(el.render)) {
          return (
            <td key={colIdx} className={el.className} style={el.style}>
              <>{el.render(row)}</>
            </td>
          )
        }
        return (
          <td key={colIdx} className={el.className} style={el.style}>
            <>-</>
          </td>
        )
      })}
    </tr>
  )
}
