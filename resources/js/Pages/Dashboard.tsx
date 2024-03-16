import Breadcrumbs from "@/Components/Navigation/Breadcrumbs";
import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Dashboard() {
    return (
        <Layout>
            <Breadcrumbs
                items={[
                    {
                        label: "Dashboard",
                        url: route("dashboard"),
                        active: true,
                    },
                ]}
            />

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
