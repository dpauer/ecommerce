import { Link } from "@inertiajs/react";

export interface Props {
    url: string;
}
export default function EditButton({ url }: Props): JSX.Element {
    return (
        <Link href={url} className="btn btn-warning btn-sm">
            Edit
        </Link>
    );
}
