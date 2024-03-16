import PageHeader from "@/Components/DataDisplay/PageHeader";
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs";
import { onSuccessHandler } from "@/utils/inertia";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Card from "react-bootstrap/Card";
import CategoryForm from "./Components/CategoryForm";

export default function (): JSX.Element {
    const { data, setData, post, errors } = useForm<{ name: string }>({
        name: "",
    });

    const onSubmitHandler: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("dashboard.categories.store"), {
            onSuccess: onSuccessHandler("Category created successfully!"),
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
                        label: "Create",
                        url: route("dashboard.categories.create"),
                        active: true,
                    },
                ]}
            />

            <PageHeader title="Create Category" />

            <Card>
                <Card.Body>
                    <CategoryForm
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
