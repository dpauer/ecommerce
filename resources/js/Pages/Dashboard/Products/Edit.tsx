import PageHeader from "@/Components/DataDisplay/PageHeader"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { Product } from "@/types"
import { onSuccessHandler } from "@/utils/inertia"
import { useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"
import Card from "react-bootstrap/Card"
import ProductForm from "./Components/ProductForm"

export interface Props {
  product: Product
}
export default function ({ product }: Props): JSX.Element {
  const { data, setData, patch, errors } = useForm<{
    name: string
    description: string
    price: number
  }>({
    name: product.name,
    description: product.description,
    price: product.price,
  })

  const onSubmitHandler: FormEventHandler = e => {
    e.preventDefault()

    patch(route("dashboard.products.update", { product }), {
      onSuccess: onSuccessHandler("Product updated successfully!"),
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
            label: product.name,
            url: route("dashboard.products.show", { product }),
            active: false,
          },
          {
            label: "Edit",
            url: route("dashboard.products.edit", { product }),
            active: true,
          },
        ]}
      />

      <PageHeader title="Edit Product" />

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
