import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SubmitButton(): JSX.Element {
    return (
        <Form.Group className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form.Group>
    );
}
