import DataTable from "@/Components/DataDisplay/DataTable"
import { PaginatedData } from "@/Components/DataDisplay/DataTable/types"
import {
  formatButtonShowColumn,
  formatStringColumn,
} from "@/Components/DataDisplay/DataTable/utils"
import { Category, PageProps } from "@/types"

export default function Welcome({
  paginatedData,
  filters,
}: PageProps<{ paginatedData: PaginatedData<Category>; filters: any }>) {
  return (
    <div className="mt-3">
      <DataTable
        title="Categories"
        columns={[
          formatStringColumn("id", {
            title: "#",
            style: { width: "10px" },
          }),
          formatStringColumn("name"),
          formatButtonShowColumn("categories.show", row => ({
            category: row.id,
          })),
        ]}
        paginatedData={paginatedData}
        filters={filters}
      />
    </div>
  )
}
