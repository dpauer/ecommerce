import { isDefined } from "@/utils/misc"
import BPagination from "react-bootstrap/Pagination"
import { PaginatedData } from "./types"

function paginate({ current, max }: { current: number; max: number }) {
  if (!current || !max) return null

  let prev = current === 1 ? null : current - 1,
    next = current === max ? null : current + 1,
    items: Array<string | number> = [1]

  if (current === 1 && max === 1) return { current, prev, next, items }
  if (current > 4) items.push("…")

  let r = 2,
    r1 = current - r,
    r2 = current + r

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i)

  if (r2 + 1 < max) items.push("…")
  if (r2 < max) items.push(max)

  return { current, prev, next, items }
}

export interface Props {
  paginatedData?: PaginatedData
  page: number
  setPage: (arg0: number) => void
}
export default function Pagination({
  paginatedData,
  page,
  setPage,
}: Props): JSX.Element {
  if (!isDefined(paginatedData)) {
    return (
      <BPagination>
        <BPagination.First disabled />
        <BPagination.Prev disabled />
        <BPagination.Next disabled />
        <BPagination.Last disabled />
      </BPagination>
    )
  }

  const pagination = paginate({
    current: paginatedData.current_page,
    max: paginatedData.last_page,
  })
  if (!isDefined(pagination)) {
    return <></>
  }

  return (
    <BPagination>
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

      {pagination.items.map((el, idx) => {
        if (typeof el === "string") {
          return (
            <BPagination.Ellipsis
              key={idx}
              disabled
              className="d-none d-md-block"
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
