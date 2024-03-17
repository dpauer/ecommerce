import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export interface Props {
  title: string
  extra?: JSX.Element
}
export default function PageSubHeader({ title, extra }: Props): JSX.Element {
  return (
    <Row className="align-items-center justify-content-between mt-3">
      <Col className="col-auto">
        <h3>{title}</h3>
      </Col>
      <Col className="col-auto">{extra}</Col>
    </Row>
  )
}
