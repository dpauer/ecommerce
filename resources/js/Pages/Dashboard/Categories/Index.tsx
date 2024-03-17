import DataTable from "@/Components/DataDisplay/DataTable"
import {
  formatButtonShowColumn,
  formatStringColumn,
} from "@/Components/DataDisplay/DataTable/utils"
import CreateButton from "@/Components/General/CreateButton"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"

export default function (): JSX.Element {
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

      <DataTable
        routeName={route("datatables.dashboard.categories.index")}
        title="Categories"
        columns={[
          formatStringColumn("id", {
            title: "#",
            style: { width: "10px" },
          }),
          formatStringColumn("name"),
          formatButtonShowColumn(
            "dashboard.categories.show",
            row => ({
              category: row.id,
            }),
            {
              title: (
                <CreateButton url={route("dashboard.categories.create")} />
              ),
            },
          ),
        ]}
        // paginatedData={paginatedData}
        // filters={filters}
      />
    </>
  )
}
