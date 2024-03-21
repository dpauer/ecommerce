import BPagination from "react-bootstrap/Pagination"

export interface Props {
  limit: number
  offset: number
  total: number
  pagination: { limit: number; offset: number }
  setPagination: (arg0: { limit: number; offset: number }) => void
}
export default function Pagination({
  limit,
  offset,
  total,
  pagination,
  setPagination,
}: Props): JSX.Element {
  const currentPage = Math.max(1, Math.floor(offset / limit))
  const totalPages = Math.floor(total / limit)
  const pages = paginate({ current: currentPage, max: totalPages })

  return (
    <BPagination>
      <BPagination.First
        disabled={currentPage < 2}
        onClick={() => {
          setPagination({ ...pagination, offset: 0 })
        }}
      />
      <BPagination.Prev
        disabled={currentPage < 2}
        onClick={() => {
          setPagination({
            ...pagination,
            offset: Number(Math.max(1, currentPage - 1)) * limit,
          })
        }}
      />
      {pages?.items.map((page, idx) => {
        if (typeof page === "string") {
          return (
            <BPagination.Ellipsis
              className="d-none d-md-block"
              key={idx}
              disabled
            />
          )
        }
        return (
          <BPagination.Item
            key={idx}
            className="d-none d-md-block"
            active={currentPage == page}
            onClick={() => {
              setPagination({ ...pagination, offset: Number(page) * limit })
            }}
          >
            {page}
          </BPagination.Item>
        )
      })}
      <BPagination.Next
        disabled={currentPage >= totalPages}
        onClick={() => {
          setPagination({
            ...pagination,
            offset: Number(Math.min(totalPages, currentPage + 1)) * limit,
          })
        }}
      />
      <BPagination.Last
        disabled={currentPage >= totalPages}
        onClick={() => {
          setPagination({ ...pagination, offset: totalPages * limit })
        }}
      />
    </BPagination>
  )
}

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
