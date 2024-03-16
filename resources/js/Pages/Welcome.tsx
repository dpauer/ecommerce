import DataTable from "@/Components/DataDisplay/DataTable"
import { PaginatedData } from "@/Components/DataDisplay/DataTable/types"
import {
  formatButtonShowColumn,
  formatStringColumn,
} from "@/Components/DataDisplay/DataTable/utils"
import { Category, PageProps } from "@/types"

export default function Welcome({
  auth,
  categories,
}: PageProps<{ categories: PaginatedData<Category> }>) {
  return (
    <>
      <h1>Categories</h1>

      <DataTable
        columns={[
          formatStringColumn("id", {
            title: "#",
            style: { width: "10px" },
            sortable: true,
          }),
          formatStringColumn("name"),
          formatButtonShowColumn("categories.show", row => ({
            category: row.id,
          })),
        ]}
        paginatedData={categories}
      />
    </>
  )
}
