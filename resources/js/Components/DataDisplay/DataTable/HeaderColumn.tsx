import HSpace from "@/Components/Layout/HSpace"
import { isDefined } from "@/utils/misc"
import { ArrowDown, ArrowDownUp, ArrowUp } from "react-bootstrap-icons"
import { DataTableColumn } from "./types"

export interface Props extends DataTableColumn {
  sort?: {
    column: string
    direction: "asc" | "desc" | null
  }
  setSort: (arg0: { column: string; direction: "asc" | "desc" | null }) => void
}
export default function HeaderColumn({
  dataIndex,
  className,
  style,
  title,
  sortable = false,
  sort,
  setSort,
}: Props): JSX.Element {
  return (
    <th className={className} style={style}>
      <HSpace>
        {title}
        {sortable && (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (isDefined(dataIndex)) {
                let direction: "asc" | "desc" | null = "asc"
                switch (sort?.direction) {
                  case null:
                    direction = "asc"
                    break
                  case "asc":
                    direction = "desc"
                    break
                  case "desc":
                    direction = null
                    break
                }
                setSort({ column: dataIndex, direction })
              }
            }}
          >
            {sort?.column === dataIndex ? (
              <>
                {sort?.direction === "asc" && <ArrowDown />}
                {sort?.direction === "desc" && <ArrowUp />}
                {sort?.direction === null && <ArrowDownUp />}
              </>
            ) : (
              <ArrowDownUp />
            )}
          </span>
        )}
      </HSpace>
    </th>
  )
}
