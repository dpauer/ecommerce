import PageHeader from "@/Components/DataDisplay/PageHeader";
import Breadcrumbs from "@/Components/Navigation/Breadcrumbs";
import Layout from "@/Layouts/Layout";
import { Category, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";

export default function ({
    categories,
}: PageProps<{ categories: Category[] }>): JSX.Element {
    return (
        <Layout>
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
                        active: true,
                    },
                ]}
            />

            <PageHeader title="Categories" />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Link
                                    href={route("dashboard.categories.show", {
                                        category,
                                    })}
                                >
                                    Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Layout>
    );
}
