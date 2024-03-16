import PageHeader from "@/Components/DataDisplay/PageHeader";
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs";
import { Attribute, AttributeValue, Category } from "@/types";
import { onSuccessHandler } from "@/utils/inertia";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Card from "react-bootstrap/Card";
import AttributeValueForm from "./Components/AttributeValueForm";

export interface Props {
    category: Category;
    attribute: Attribute;
    attributeValue: AttributeValue;
}
export default function ({
    category,
    attribute,
    attributeValue,
}: Props): JSX.Element {
    const { data, setData, patch, errors } = useForm<{
        value: string;
    }>({
        value: attributeValue.value,
    });

    const onSubmitHandler: FormEventHandler = (e) => {
        e.preventDefault();

        patch(
            route("dashboard.categories.attributes.attribute-values.update", {
                category,
                attribute,
                attributeValue,
            }),
            {
                onSuccess: onSuccessHandler(
                    "Attribute value update successfully!"
                ),
            }
        );
    };

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
                        label: "Edit Attribute Value",
                        url: route(
                            "dashboard.categories.attributes.attribute-values.edit",
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
            <PageHeader title="Edit Attribute Value" />

            <Card>
                <Card.Body>
                    <AttributeValueForm
                        onSubmitHandler={onSubmitHandler}
                        data={data}
                        setData={setData}
                        errors={errors}
                    />
                </Card.Body>
            </Card>
        </>
    );
}
