import PageHeader from "@/Components/DataDisplay/PageHeader";
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs";
import { Category } from "@/types";
import { onSuccessHandler } from "@/utils/inertia";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Card from "react-bootstrap/Card";
import AttributeForm from "./Components/AttributeForm";

export interface Props {
    category: Category;
}
export default function ({ category }: Props): JSX.Element {
    const { data, setData, post, errors } = useForm<{
        type: string;
        name: string;
    }>({
        type: "",
        name: "",
    });

    const onSubmitHandler: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("dashboard.categories.attributes.store", { category }), {
            onSuccess: onSuccessHandler("Attribute created successfully!"),
        });
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
                        label: "Create Attribute",
                        url: route("dashboard.categories.attributes.create", {
                            category,
                        }),
                        active: true,
                    },
                ]}
            />
            <PageHeader title="Create Attribute" />

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
