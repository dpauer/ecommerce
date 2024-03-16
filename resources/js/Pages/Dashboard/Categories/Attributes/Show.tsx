import DetailItem from "@/Components/DataDisplay/DetailItem";
import DetailsCard from "@/Components/DataDisplay/DetailsCard";
import PageHeader from "@/Components/DataDisplay/PageHeader";
import PageSubHeader from "@/Components/DataDisplay/PageSubHeader";
import DeleteButton from "@/Components/General/DeleteButton";
import EditButton from "@/Components/General/EditButton";
import HSpace from "@/Components/Layout/HSpace";
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs";
import { Attribute, AttributeValue, Category, PageProps } from "@/types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

export default function ({
    category,
    attribute,
    attributeValues,
}: PageProps<{
    category: Category;
    attribute: Attribute;
    attributeValues: AttributeValue[];
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
                            url={route(
                                "dashboard.categories.attributes.destroy",
                                {
                                    category,
                                    attribute,
                                }
                            )}
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
                        <DetailItem
                            label="Created At:"
                            value={attribute.created_at}
                        />
                    </Col>
                    <Col>
                        <DetailItem
                            label="Updated At:"
                            value={attribute.updated_at}
                        />
                    </Col>
                </Row>
            </DetailsCard>

            <PageSubHeader
                title="Values"
                extra={
                    <>
                        <button>create</button>
                    </>
                }
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {attributeValues.map((attributeValue) => (
                        <tr key={attributeValue.id}>
                            <td>{attributeValue.id}</td>
                            <td>{attributeValue.value}</td>
                            <td>
                                <button>view</button>
                                <button>update</button>
                                <button>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
