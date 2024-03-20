import PageHeader from "@/Components/DataDisplay/PageHeader"
import SubmitButton from "@/Components/DataEntry/SubmitButton"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { Category, Product } from "@/types"
import { onSuccessHandler } from "@/utils/inertia"
import { useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

export interface Props {
  product: Product
  categories: Category[]
}
export default function ({ product, categories }: Props): JSX.Element {
  const { data, setData, errors, post } = useForm<{ category_id: number }>()

  const onSubmitHandler: FormEventHandler = e => {
    e.preventDefault()

    post(route("dashboard.products.categories.attach", { product }), {
      onSuccess: onSuccessHandler("Category attached successfully!"),
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
            label: "Attach category",
            url: route("dashboard.products.categories.show-attach", {
              product,
            }),
            active: true,
          },
        ]}
      />

      <PageHeader title="Attach Category" />

      <Card>
        <Card.Body>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category_id"
                onChange={e => {
                  setData("category_id", Number(e.target.value))
                }}
                isInvalid={!!errors["category_id"]}
              >
                <option>Select category to attach...</option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category_id}
              </Form.Control.Feedback>
            </Form.Group>

            <SubmitButton />
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
