import PageHeader from "@/Components/DataDisplay/PageHeader"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { Attribute, Category } from "@/types"
import { onSuccessHandler } from "@/utils/inertia"
import { useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"
import Card from "react-bootstrap/Card"
import AttributeValueForm from "./Components/AttributeValueForm"

export interface Props {
  category: Category
  attribute: Attribute
}
export default function ({ category, attribute }: Props): JSX.Element {
  const { data, setData, post, errors } = useForm<{
    value: string
  }>({
    value: "",
  })

  const onSubmitHandler: FormEventHandler = e => {
    e.preventDefault()

    post(
      route("dashboard.categories.attributes.attribute-values.store", {
        category,
        attribute,
      }),
      {
        onSuccess: onSuccessHandler("Attribute value created successfully!"),
      },
    )
  }

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
            active: false,
          },
          {
            label: category.name,
            url: route("dashboard.categories.show", { category }),
            active: false,
          },
          {
            label: attribute.name,
            url: route("dashboard.categories.attributes.show", {
              category,
              attribute,
            }),
            active: false,
          },
          {
            label: "Create Attribute",
            url: route("dashboard.categories.attributes.create", {
              category,
            }),
            active: true,
          },
        ]}
      />
      <PageHeader title="Create Attribute Value" />

      <Card>
        <Card.Body>
          <AttributeValueForm
            onSubmitHandler={onSubmitHandler}
            data={data}
            setData={setData}
            errors={errors}
          />
        </Card.Body>
      </Card>
    </>
  )
}
