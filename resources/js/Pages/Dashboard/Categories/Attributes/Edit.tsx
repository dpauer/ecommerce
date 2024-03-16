import PageHeader from "@/Components/DataDisplay/PageHeader";
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs";
import { Attribute, Category } from "@/types";
import { onSuccessHandler } from "@/utils/inertia";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Card from "react-bootstrap/Card";
import AttributeForm from "./Components/AttributeForm";

export interface Props {
    category: Category;
    attribute: Attribute;
}
export default function ({ category, attribute }: Props): JSX.Element {
    const { data, setData, patch, errors } = useForm<{
        type: string;
        name: string;
    }>({
        type: attribute.type,
        name: attribute.name,
    });

    const onSubmitHandler: FormEventHandler = (e) => {
        e.preventDefault();

        patch(
            route("dashboard.categories.attributes.update", {
                category,
                attribute,
            }),
            {
                onSuccess: onSuccessHandler("Attribute updated successfully!"),
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
                        label: "Edit",
                        url: route("dashboard.categories.attributes.edit", {
                            category,
                            attribute,
                        }),
                        active: true,
                    },
                ]}
            />
            <PageHeader title="Edit Attribute" />

            <Card>
                <Card.Body>
                    <AttributeForm
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
