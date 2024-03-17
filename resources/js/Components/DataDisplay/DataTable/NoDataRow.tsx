import { DatabaseSlash } from "react-bootstrap-icons"

export interface Props {
  colSpan: number
}
export default function NoDataRow({ colSpan }: Props): JSX.Element {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <DatabaseSlash />
          No data!
        </div>
      </td>
    </tr>
  )
}
