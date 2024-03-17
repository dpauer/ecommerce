import Spinner from "react-bootstrap/Spinner"

export interface Props {
  colSpan: number
}
export default function LoadingRow({ colSpan }: Props): JSX.Element {
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
          <Spinner animation="grow" />
          Loading...
        </div>
      </td>
    </tr>
  )
}
