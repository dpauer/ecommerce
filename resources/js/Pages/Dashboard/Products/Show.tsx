import DataTable from "@/Components/DataDisplay/DataTable"
import {
  formatButtonShowColumn,
  formatStringColumn,
} from "@/Components/DataDisplay/DataTable/utils"
import DetailItem from "@/Components/DataDisplay/DetailItem"
import DetailsCard from "@/Components/DataDisplay/DetailsCard"
import PageHeader from "@/Components/DataDisplay/PageHeader"
import CreateButton from "@/Components/General/CreateButton"
import DeleteButton from "@/Components/General/DeleteButton"
import EditButton from "@/Components/General/EditButton"
import HSpace from "@/Components/Layout/HSpace"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { Product } from "@/types"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export interface Props {
  product: Product
}
export default function ({ product }: Props): JSX.Element {
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
            active: true,
          },
        ]}
      />

      <PageHeader
        title="Product"
        extra={
          <HSpace>
            <EditButton
              url={route("dashboard.products.edit", {
                product,
              })}
            />
            <DeleteButton
              url={route("dashboard.products.destroy", {
                product,
              })}
              modalTitle="Delete product"
              modalBody="Are you sure you want to delete this product?"
              successMessage="Product deleted successfully!"
            />
          </HSpace>
        }
      />

      <DetailsCard>
        <Row>
          <Col>
            <DetailItem label="Id:" value={product.id} />
          </Col>
          <Col>
            <DetailItem label="Price:" value={product.price} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DetailItem label="Name:" value={product.name} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DetailItem
              label="Description:"
              value={product.description}
              collapsable
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DetailItem label="Created At:" value={product.created_at} />
          </Col>
          <Col>
            <DetailItem label="Updated At:" value={product.updated_at} />
          </Col>
        </Row>
      </DetailsCard>

      <DataTable
        routeName={route("datatables.dashboard.products.categories.index", {
          product,
        })}
        title="Categories"
        columns={[
          formatStringColumn("id", {
            title: "#",
            style: { width: "10px" },
          }),
          formatStringColumn("name"),
          formatButtonShowColumn(
            "dashboard.products.categories.show",
            row => ({ product, category: row.id }),
            {
              title: (
                <CreateButton
                  title="Attach"
                  url={route("dashboard.products.categories.show-attach", {
                    product,
                  })}
                />
              ),
            },
          ),
        ]}
      />
    </>
  )
}
