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
import { Attribute, Category } from "@/types"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export interface Props {
  category: Category
  attribute: Attribute
}
export default function ({ category, attribute }: Props): JSX.Element {
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
            active: true,
          },
        ]}
      />

      <PageHeader
        title="Attribute"
        extra={
          <HSpace>
            <EditButton
              url={route("dashboard.categories.attributes.edit", {
                category,
                attribute,
              })}
            />
            <DeleteButton
              url={route("dashboard.categories.attributes.destroy", {
                category,
                attribute,
              })}
              modalTitle="Delete attribute"
              modalBody="Are you sure you want to delete this attribute?"
              successMessage="Attribute deleted successfully!"
            />
          </HSpace>
        }
      />

      <DetailsCard>
        <Row>
          <Col>
            <DetailItem label="Id:" value={attribute.id} />
          </Col>
          <Col>
            <DetailItem label="Type:" value={attribute.type} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DetailItem label="Name:" value={attribute.name} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DetailItem label="Created At:" value={attribute.created_at} />
          </Col>
          <Col>
            <DetailItem label="Updated At:" value={attribute.updated_at} />
          </Col>
        </Row>
      </DetailsCard>

      <DataTable
        routeName={route(
          "datatables.dashboard.categories.attributes.attribute-values.index",
          {
            category,
            attribute,
          },
        )}
        title={"Values"}
        columns={[
          formatStringColumn("id", {
            title: "#",
            style: { width: "10px" },
          }),
          formatStringColumn("value"),
          formatButtonShowColumn(
            "dashboard.categories.attributes.attribute-values.show",
            row => ({ category, attribute, attributeValue: row.id }),
            {
              title: (
                <CreateButton
                  url={route(
                    "dashboard.categories.attributes.attribute-values.create",
                    {
                      category,
                      attribute,
                    },
                  )}
                />
              ),
            },
          ),
        ]}
      />
    </>
  )
}
