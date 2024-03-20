import DataTable from "@/Components/DataDisplay/DataTable"
import { formatStringColumn } from "@/Components/DataDisplay/DataTable/utils"
import { Attribute, Category, Product } from "@/types"
import { onSuccessHandler } from "@/utils/inertia"
import { isDefined } from "@/utils/misc"
import { useForm } from "@inertiajs/react"
import { useState } from "react"
import Form from "react-bootstrap/Form"

export interface Props {
  product: Product
  category: Category
  attribute: Attribute
}
export default function AttributeValuesTable({
  product,
  category,
  attribute,
}: Props): JSX.Element {
  const [forceRefresh, setForceRefresh] = useState(false)
  const { patch } = useForm()

  return (
    <DataTable
      forceRefresh={forceRefresh}
      setForceRefresh={setForceRefresh}
      routeName={route(
        "datatables.dashboard.products.categories.attributes.attribute-values.index",
        {
          product,
          category,
          attribute,
        },
      )}
      title="Attribute values"
      columns={[
        formatStringColumn("id", {
          title: "#",
          style: { width: "10px" },
        }),
        formatStringColumn("value"),
        {
          title: "Attach/Detach",
          render: row => {
            const attached = isDefined(row.product_id)
            return (
              <>
                <Form.Check
                  type="switch"
                  checked={attached}
                  label={attached ? "Attached" : "Detached"}
                  onChange={e => {
                    console.log("----")
                    console.log(e.target.checked)
                    const checked = e.target.checked
                    let routeName = route(
                      checked
                        ? "dashboard.products.categories.attributes.attribute-values.attach"
                        : "dashboard.products.categories.attributes.attribute-values.detach",
                      {
                        product,
                        category,
                        attribute,
                        attributeValue: row.id,
                      },
                    )
                    patch(routeName, {
                      preserveState: true,
                      preserveScroll: true,
                      onSuccess: () => {
                        console.log("in on success", e.target)
                        onSuccessHandler(
                          checked
                            ? "Attribute value attached successfully!"
                            : "Attribute value detached successfully!",
                        )()
                        setForceRefresh(true)
                      },
                    })
                  }}
                />
              </>
            )
          },
        },
      ]}
    />
  )
}
