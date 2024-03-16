import { isDefined } from "@/utils/misc"
import { Link } from "@inertiajs/react"
import Pagination from "react-bootstrap/Pagination"
import Table from "react-bootstrap/Table"
import { DataTableProps } from "./types"

export default function DataTable<T>({
  columns,
  paginatedData,
}: DataTableProps<T>): JSX.Element {
  return (
    <>
      <Table striped hover bordered className="mt-1">
        <thead>
          <tr>
            {columns.map((el, colIdx) => (
              <th key={colIdx} className={el.className} style={el.style}>
                {el.title}
              </th>
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
          ))}
        </tbody>
      </Table>
      <Pagination className="d-flex justify-content-end">
        <Pagination.First as={Link} href={paginatedData.first_page_url} />
        {isDefined(paginatedData.prev_page_url) ? (
          <Pagination.Prev as={Link} href={paginatedData.prev_page_url} />
        ) : (
          <Pagination.Prev disabled />
        )}
        {paginatedData.links.slice(1, -1).map((el, idx) => {
          if (isDefined(el.url)) {
            return (
              <Pagination.Item
                key={idx}
                className="d-none d-md-block"
                active={el.active}
                as={Link}
                href={el.url}
              >
                {el.label}
              </Pagination.Item>
            )
          }
          return (
            <Pagination.Item key={idx} className="d-none d-md-block" disabled>
              {el.label}
            </Pagination.Item>
          )
        })}
        {isDefined(paginatedData.next_page_url) ? (
          <Pagination.Next as={Link} href={paginatedData.next_page_url} />
        ) : (
          <Pagination.Next disabled />
        )}
        <Pagination.Last as={Link} href={paginatedData.last_page_url} />
      </Pagination>
    </>
  )
}
