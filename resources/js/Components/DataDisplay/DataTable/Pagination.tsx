import { isDefined } from "@/utils/misc"
import BPagination from "react-bootstrap/Pagination"
import { PaginatedData } from "./types"

// gpt stuff -------------------------------------------------------------------
function generatePagination(
  currentPage: number,
  totalPages: number,
  maxPagesToShow: number,
) {
  var pagination = []
  var ellipsis = "..."

  // Make sure maxPagesToShow is an odd number
  if (maxPagesToShow % 2 === 0) {
    maxPagesToShow++
  }

  // Calculate the range of pages to display around the current page
  var pagesOnEachSide = Math.floor(maxPagesToShow / 2)

  // Determine the start and end page numbers
  var startPage = Math.max(1, currentPage - pagesOnEachSide)
  var endPage = Math.min(totalPages, currentPage + pagesOnEachSide)

  // Adjust start and end page numbers if necessary
  if (endPage - startPage < maxPagesToShow - 1) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }
  }

  // Add page numbers
  for (var i = startPage; i <= endPage; i++) {
    pagination.push(i)
  }

  // Add ellipsis at the beginning if necessary
  if (startPage > 1) {
    pagination.unshift(ellipsis)
    pagination.unshift(1) // Add the first page
  }

  // Add ellipsis at the end if necessary
  if (endPage < totalPages) {
    pagination.push(ellipsis)
    pagination.push(totalPages) // Add the last page
  }

  return pagination
}
// gpt stuff -------------------------------------------------------------------

export interface Props<T> {
  paginatedData?: PaginatedData<T>
  page: number
  setPage: (arg0: number) => void
}
export default function Pagination<T>({
  paginatedData,
  page,
  setPage,
}: Props<T>): JSX.Element {
  if (!isDefined(paginatedData)) {
    return (
      <BPagination className="d-flex justify-content-end">
        <BPagination.First disabled />
        <BPagination.Prev disabled />
        <BPagination.Next disabled />
        <BPagination.Last disabled />
      </BPagination>
    )
  }

  const pagination = generatePagination(
    paginatedData.current_page,
    paginatedData.last_page,
    5,
  )

  return (
    <BPagination className="d-flex justify-content-end">
      <BPagination.First
        disabled={page < 2}
        onClick={() => {
          setPage(1)
        }}
      />
      <BPagination.Prev
        disabled={page < 2}
        onClick={() => {
          setPage(page - 1)
        }}
      />

      {pagination.map((el, idx) => {
        if (el === "...") {
          return (
            <BPagination.Ellipsis
              key={idx}
              className="d-none d-md-block"
              disabled
            />
          )
        }
        return (
          <BPagination.Item
            key={idx}
            className="d-none d-md-block"
            active={paginatedData.current_page == el}
            onClick={() => {
              setPage(Number(el))
            }}
          >
            {el}
          </BPagination.Item>
        )
      })}

      <BPagination.Next
        disabled={page >= paginatedData.last_page}
        onClick={() => {
          setPage(page + 1)
        }}
      />
      <BPagination.Last
        disabled={page >= paginatedData.last_page}
        onClick={() => {
          setPage(paginatedData.last_page)
        }}
      />
    </BPagination>
  )
}
