import PageHeader from "@/Components/DataDisplay/PageHeader";
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs";
import { Category, PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

export default function ({
    category,
}: PageProps<{ category: Category }>): JSX.Element {
    const { data, setData, patch, errors } = useForm<{ name: string }>({
        name: category.name,
    });

    const handleOnSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("dashboard.categories.update", { category }), {
            onSuccess: () => {
                console.log("success");
                toast("Category updated successfully!");
            },
            onError: (err) => {
                toast("Something went wrong!");
                console.log("failed");
                console.log(err);
            },
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
                        label: "Edit",
                        url: route("dashboard.categories.edit", { category }),
                        active: true,
                    },
                ]}
            />

            <PageHeader title="Edit Category" />

            <Card>
                <Card.Body>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-end">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
