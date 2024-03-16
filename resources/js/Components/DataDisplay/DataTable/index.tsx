import { isDefined } from "@/utils/misc"
import Pagination from "react-bootstrap/Pagination"
import Table from "react-bootstrap/Table"
import { DataTableProps } from "./types"

export default function DataTable<T>({
  columns,
  paginatedData,
}: DataTableProps<T>): JSX.Element {
  return (
    <>
      <Table striped bordered hover className="mt-1">
        <thead>
          <tr>
            {columns.map((el, colIdx) => (
              <th key={colIdx}>{el.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((el, colIdx) => {
                if (isDefined(el.dataIndex)) {
                  const value = row[el.dataIndex]
                  return (
                    <td key={colIdx}>
                      <>{value}</>
                    </td>
                  )
                }
                if (isDefined(el.render)) {
                  return (
                    <td key={colIdx}>
                      <>{el.render(row)}</>
                    </td>
                  )
                }
                return (
                  <td key={colIdx}>
                    <>-</>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  )
}
