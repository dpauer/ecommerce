import PageHeader from "@/Components/DataDisplay/PageHeader"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { Category } from "@/types"
import { onSuccessHandler } from "@/utils/inertia"
import { useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"
import Card from "react-bootstrap/Card"
import CategoryForm from "./Components/CategoryForm"

export interface Props {
  category: Category
}
export default function ({ category }: Props): JSX.Element {
  const { data, setData, patch, errors } = useForm<{ name: string }>({
    name: category.name,
  })

  const onSubmitHandler: FormEventHandler = e => {
    e.preventDefault()

    patch(route("dashboard.categories.update", { category }), {
      onSuccess: onSuccessHandler("Category updated successfully!"),
    })
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
            label: "Edit",
            url: route("dashboard.categories.edit", { category }),
            active: true,
          },
        ]}
      />

      <PageHeader title="Edit Category" />

      <Card>
        <Card.Body>
          <CategoryForm
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
