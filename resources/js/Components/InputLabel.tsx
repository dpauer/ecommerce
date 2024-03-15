import { LabelHTMLAttributes } from "react";
import Form from "react-bootstrap/Form";

export default function InputLabel({
    value,
    className,
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <Form.Label {...props} className={className}>
            {value ? value : children}
        </Form.Label>
    );
}
