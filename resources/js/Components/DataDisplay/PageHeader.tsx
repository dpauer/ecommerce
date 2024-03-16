import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export interface Props {
    title: string;
    extra?: JSX.Element;
}
export default function PageHeader({ title, extra }: Props): JSX.Element {
    return (
        <Row className="align-items-center justify-content-between">
            <Col className="col-auto">
                <h1>{title}</h1>
            </Col>
            <Col className="col-auto">{extra}</Col>
        </Row>
    );
}
