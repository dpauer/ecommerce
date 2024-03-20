import { isDefined } from "@/utils/misc"
import axios from "axios"
import { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import DataRow from "./DataRow"
import ErrorRow from "./ErrorRow"
import HeaderColumn from "./HeaderColumn"
import LoadingRow from "./LoadingRow"
import NoDataRow from "./NoDataRow"
import Pagination from "./Pagination"
import { DataTableProps, PaginatedData } from "./types"

export default function DataTable<T>({
  title,
  columns,
  routeName,
  forceRefresh = false,
  setForceRefresh = () => {},
}: DataTableProps): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [paginatedData, setPaginatedData] = useState<PaginatedData>()
  const [search, setSearch] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [sort, setSort] = useState<{
    column: string
    direction: "asc" | "desc" | null
  }>()

  const handleGetData = () => {
    setLoading(true)
    axios
      .post(routeName, { search, page, sort })
      .then(res => res.data)
      .then(data => {
        setPaginatedData(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetData()
  }, [search, page, sort])

  useEffect(() => {
    if (forceRefresh) {
      handleGetData()
      setForceRefresh(false)
    }
  }, [forceRefresh])

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
          }}
        />
      </div>
      <Table striped hover bordered className="mt-1">
        <thead>
          <tr>
            {columns.map((el, colIdx) => {
              return (
                <HeaderColumn
                  key={colIdx}
                  {...el}
                  sort={sort}
                  setSort={setSort}
                />
              )
            })}
          </tr>
        </thead>
        <tbody>
          {loading && <LoadingRow colSpan={columns.length} />}
          {isDefined(paginatedData) ? (
            <>
              {paginatedData.total < 1 ? (
                <NoDataRow colSpan={columns.length} />
              ) : (
                paginatedData.data.map((row, rowIdx) => (
                  <DataRow key={rowIdx} columns={columns} row={row} />
                ))
              )}
            </>
          ) : (
            <ErrorRow colSpan={columns.length} />
          )}
        </tbody>
      </Table>

      <Pagination paginatedData={paginatedData} page={page} setPage={setPage} />
    </>
  )
}
