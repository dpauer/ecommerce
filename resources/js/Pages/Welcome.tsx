import DataTable from "@/Components/DataDisplay/DataTable"
import {
  formatButtonShowColumn,
  formatStringColumn,
} from "@/Components/DataDisplay/DataTable/utils"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"

export default function Welcome() {
  return (
    <div className="mt-3">
      <Breadcrumbs
        items={[
          {
            label: "Home",
            url: "/",
            active: true,
          },
        ]}
      />
      <DataTable
        routeName={route("datatables.categories.index")}
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
      />
    </div>
  )
}
