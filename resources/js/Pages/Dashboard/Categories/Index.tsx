import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Category, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";

export default function ({
    categories,
}: PageProps<{ categories: Category[] }>): JSX.Element {
    return (
        <AuthenticatedLayout>
            <h1>Categories</h1>
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
        </AuthenticatedLayout>
    );
}
