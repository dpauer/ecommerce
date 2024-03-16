import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Dashboard() {
    return (
        <Layout>
            <Head title="Dashboard" />

            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Link href={route("dashboard.categories.index")}>
                                Categories
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Body>Products</Card.Body>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}
