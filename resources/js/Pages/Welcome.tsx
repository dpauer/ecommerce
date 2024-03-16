import Nav from "@/Layouts/Nav";
import { Category, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

export default function Welcome({
    auth,
    categories,
}: PageProps<{ categories: Category[] }>) {
    return (
        <>
            <Head title="Welcome" />
            <Nav />
            <Container>
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
                                        href={route("categories.show", {
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
            </Container>
        </>
    );
}
