import { PropsWithChildren } from "react";
import { Card } from "react-bootstrap";

export default function DetailsCard({
    title = "Details",
    children,
}: PropsWithChildren<{ title?: string }>): JSX.Element {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Body>{children}</Card.Body>
            </Card.Body>
        </Card>
    );
}
