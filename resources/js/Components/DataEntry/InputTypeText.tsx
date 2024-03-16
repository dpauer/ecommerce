import Form from "react-bootstrap/Form";

export interface Props {
    label: string;
    placeholder: string;
    name: string;
    data: any;
    setData: any;
    errors: any;
}
export default function InputTypeText({
    label,
    placeholder,
    name,
    data,
    setData,
    errors,
}: Props): JSX.Element {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="text"
                placeholder={placeholder}
                name={name}
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
                isInvalid={!!errors[name]}
                autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
                {errors[name]}
            </Form.Control.Feedback>
        </Form.Group>
    );
}
