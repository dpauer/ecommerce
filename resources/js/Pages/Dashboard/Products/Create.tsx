import PageHeader from "@/Components/DataDisplay/PageHeader"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { onSuccessHandler } from "@/utils/inertia"
import { useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"
import Card from "react-bootstrap/Card"
import ProductForm from "./Components/ProductForm"

export default function (): JSX.Element {
  const { data, setData, post, errors } = useForm<{
    name: string
    description: string
    price: number
  }>({
    name: "",
    description: "",
    price: 0.0,
  })

  const onSubmitHandler: FormEventHandler = e => {
    e.preventDefault()

    post(route("dashboard.products.store"), {
      onSuccess: onSuccessHandler("Product created successfully!"),
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
            label: "Products",
            url: route("dashboard.products.index"),
            active: false,
          },
          {
            label: "Create",
            url: route("dashboard.products.create"),
            active: true,
          },
        ]}
      />

      <PageHeader title="Create Product" />

      <Card>
        <Card.Body>
          <ProductForm
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
