import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { Category, Product } from "@/types"
import Accordion from "react-bootstrap/Accordion"
import AttributeValuesTable from "./Components/AttributeTable"

export interface Props {
  product: Product
  category: Category
}
export default function ({ product, category }: Props): JSX.Element {
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
            label: "Category",
            url: route("dashboard.products.categories.show", {
              product,
              category,
            }),
            active: true,
          },
        ]}
      />

      <Accordion>
        {category.attributes.map((attribute, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={idx}>
            <Accordion.Header>{attribute.name}</Accordion.Header>
            <Accordion.Body>
              <AttributeValuesTable
                product={product}
                category={category}
                attribute={attribute}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  )
}
