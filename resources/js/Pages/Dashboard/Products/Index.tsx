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
            label: "Products",
            url: route("dashboard.products.index"),
            active: true,
          },
        ]}
      />

      <DataTable
        routeName={route("datatables.dashboard.products.index")}
        title="Products"
        columns={[
          formatStringColumn("id", {
            title: "#",
            style: { width: "10px" },
          }),
          formatStringColumn("name"),
          formatButtonShowColumn(
            "dashboard.products.show",
            row => ({
              product: row.id,
            }),
            {
              title: <CreateButton url={route("dashboard.products.create")} />,
            },
          ),
        ]}
      />
    </>
  )
}
