import DataTable from "@/Components/DataDisplay/DataTable"
import { PaginatedData } from "@/Components/DataDisplay/DataTable/types"
import {
  formatButtonShowColumn,
  formatStringColumn,
} from "@/Components/DataDisplay/DataTable/utils"
import PageHeader from "@/Components/DataDisplay/PageHeader"
import CreateButton from "@/Components/General/CreateButton"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { Category, PageProps } from "@/types"

export default function ({
  categories,
}: PageProps<{ categories: PaginatedData<Category> }>): JSX.Element {
  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            url: route("dashboard"),
            active: false,
          },
          {
            label: "Categories",
            url: route("dashboard.categories.index"),
            active: true,
          },
        ]}
      />

      <PageHeader
        title="Categories"
        extra={<CreateButton url={route("dashboard.categories.create")} />}
      />

      <DataTable
        columns={[
          formatStringColumn("id", {
            title: "#",
            style: { width: "10px" },
            sortable: true,
          }),
          formatStringColumn("name"),
          formatButtonShowColumn("dashboard.categories.show", row => ({
            category: row.id,
          })),
        ]}
        paginatedData={categories}
      />
    </>
  )
}
