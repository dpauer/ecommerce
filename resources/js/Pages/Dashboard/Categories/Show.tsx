import Layout from "@/Layouts/Layout";
import { Attribute, Category, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

export default function ({
    category,
    attributes,
}: PageProps<{ category: Category; attributes: Attribute[] }>): JSX.Element {
    return (
        <Layout>
            <Row className="align-items-center justify-content-between">
                <Col className="col-auto">
                    <h1>Category</h1>
                </Col>
                <Col className="col-auto">
                    <Row className="g-2">
                        <Col className="col-auto">
                            <Button variant="warning">MODIFICA</Button>
                        </Col>
                        <Col className="col-auto">
                            <Button variant="danger">ELIMINA</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Card>
                <Card.Body>
                    <Card.Title>Details</Card.Title>
                    <Card.Body>
                        <Row>
                            <Col>
                                <b>Id:</b>
                                <span className="ml-3">{category.id}</span>
                            </Col>
                            <Col>
                                <b>Name:</b>
                                <span className="ml-3">{category.name}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <b>Created At:</b>
                                <span className="ml-3">
                                    {category.created_at}
                                </span>
                            </Col>
                            <Col>
                                <b>Updated At:</b>
                                <span className="ml-3">
                                    {category.updated_at}
                                </span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card.Body>
            </Card>
            <h3 className="mt-3">Attributes</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {attributes.map((attribute) => (
                        <tr key={attribute.id}>
                            <td>{attribute.id}</td>
                            <td>{attribute.type}</td>
                            <td>{attribute.name}</td>
                            <td>
                                <Link
                                    href={route(
                                        "dashboard.categories.attributes.show",
                                        {
                                            category,
                                            attribute,
                                        }
                                    )}
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
