import DetailItem from "@/Components/DataDisplay/DetailItem";
import DetailsCard from "@/Components/DataDisplay/DetailsCard";
import PageHeader from "@/Components/DataDisplay/PageHeader";
import DeleteButton from "@/Components/General/DeleteButton";
import EditButton from "@/Components/General/EditButton";
import HSpace from "@/Components/Layout/HSpace";
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs";
import { Attribute, AttributeValue, Category, PageProps } from "@/types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function ({
    category,
    attribute,
    attributeValue,
}: PageProps<{
    category: Category;
    attribute: Attribute;
    attributeValue: AttributeValue;
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
                        active: false,
                    },
                    {
                        label: attributeValue.value,
                        url: route(
                            "dashboard.categories.attributes.attribute-values.show",
                            {
                                category,
                                attribute,
                                attributeValue,
                            }
                        ),
                        active: true,
                    },
                ]}
            />

            <PageHeader
                title="Attribute Value"
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
                        <DetailItem label="Id:" value={attributeValue.id} />
                    </Col>
                    <Col>
                        <DetailItem
                            label="Value:"
                            value={attributeValue.value}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DetailItem
                            label="Created At:"
                            value={attributeValue.created_at}
                        />
                    </Col>
                    <Col>
                        <DetailItem
                            label="Updated At:"
                            value={attributeValue.updated_at}
                        />
                    </Col>
                </Row>
            </DetailsCard>
        </>
    );
}
