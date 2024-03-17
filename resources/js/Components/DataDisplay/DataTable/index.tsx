import { isDefined } from "@/utils/misc"
import { Link, router } from "@inertiajs/react"
import { useState } from "react"
import Pagination from "react-bootstrap/Pagination"
import Table from "react-bootstrap/Table"
import { DataTableProps } from "./types"

export default function DataTable<T>({
  title,
  columns,
  paginatedData,
  filters,
}: DataTableProps<T>): JSX.Element {
  const [search, setSearch] = useState<any>(filters.search ?? "")

  return (
    <>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h3>{title}</h3>
        <input
          style={{ width: 200 }}
          className="form-control"
          type="search"
          placeholder="Search"
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            router.get(
              window.location.href,
              { search: e.target.value, page: 1 },
              { preserveState: true, preserveScroll: true, replace: true },
            )
          }}
        />
      </div>
      <Table striped hover bordered className="mt-1">
        <thead>
          <tr>
            {columns.map((el, colIdx) => {
              return (
                <th key={colIdx} className={el.className} style={el.style}>
                  {el.title}
                </th>
              )
            })}
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
        <Pagination.Prev
          as={paginatedData.prev_page_url ? Link : "span"}
          href={paginatedData.prev_page_url}
          disabled={!paginatedData.prev_page_url}
        />
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
        <Pagination.Next
          as={paginatedData.next_page_url ? Link : "span"}
          href={paginatedData.next_page_url}
          disabled={!paginatedData.next_page_url}
        />
        <Pagination.Last as={Link} href={paginatedData.last_page_url} />
      </Pagination>
    </>
  )
}
