import { EmojiFrown } from "react-bootstrap-icons"

export interface Props {
  colSpan: number
}
export default function ErrorRow({ colSpan }: Props): JSX.Element {
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
          <EmojiFrown />
          Something went wrong!
        </div>
      </td>
    </tr>
  )
}
