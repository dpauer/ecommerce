import { Link } from "@inertiajs/react";
import Button from "react-bootstrap/Button";

export interface Props {
    url: string;
}
export default function EditButton({ url }: Props): JSX.Element {
    // FIXME: fix this ts-ignore
    return (
        // @ts-ignore
        <Button variant="warning" as={Link} href={url}>
            Edit
        </Button>
    );
}
