import DataTable from "@/Components/DataDisplay/DataTable"
import { PaginatedData } from "@/Components/DataDisplay/DataTable/types"
import {
  formatButtonShowColumn,
  formatStringColumn,
} from "@/Components/DataDisplay/DataTable/utils"
import DetailItem from "@/Components/DataDisplay/DetailItem"
import DetailsCard from "@/Components/DataDisplay/DetailsCard"
import PageHeader from "@/Components/DataDisplay/PageHeader"
import PageSubHeader from "@/Components/DataDisplay/PageSubHeader"
import CreateButton from "@/Components/General/CreateButton"
import DeleteButton from "@/Components/General/DeleteButton"
import EditButton from "@/Components/General/EditButton"
import HSpace from "@/Components/Layout/HSpace"
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { Attribute, Category, PageProps } from "@/types"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export default function ({
  category,
  attributes,
}: PageProps<{
  category: Category
  attributes: PaginatedData<Attribute>
}>): JSX.Element {
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
            active: true,
          },
        ]}
      />

      <PageHeader
        title="Category"
        extra={
          <HSpace>
            <EditButton
              url={route("dashboard.categories.edit", {
                category,
              })}
            />
            <DeleteButton
              url={route("dashboard.categories.destroy", {
                category,
              })}
              modalTitle="Delete category"
              modalBody="Are you sure you want to delete this category?"
              successMessage="Category deleted successfully!"
            />
          </HSpace>
        }
      />

      <DetailsCard>
        <Row>
          <Col>
            <DetailItem label="Id:" value={category.id} />
          </Col>
          <Col>
            <DetailItem label="Name:" value={category.name} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DetailItem label="Created At:" value={category.created_at} />
          </Col>
          <Col>
            <DetailItem label="Updated At:" value={category.updated_at} />
          </Col>
        </Row>
      </DetailsCard>

      <PageSubHeader
        title="Attributes"
        extra={
          <CreateButton
            url={route("dashboard.categories.attributes.create", {
              category,
            })}
          />
        }
      />

      <DataTable
        columns={[
          formatStringColumn("id", {
            title: "#",
            style: { width: "10px" },
            sortable: true,
          }),
          formatStringColumn("name"),
          formatButtonShowColumn(
            "dashboard.categories.attributes.show",
            row => ({ category, attribute: row.id }),
          ),
        ]}
        paginatedData={attributes}
      />
    </>
  )
}
