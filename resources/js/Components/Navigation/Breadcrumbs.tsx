import { Link } from "@inertiajs/react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export interface Props {
    items: { label: string; url: string; active: boolean }[];
}
export default function Breadcrumbs({ items }: Props): JSX.Element {
    return (
        <Breadcrumb className="mt-3">
            {items.map((el, idx) => (
                <Breadcrumb.Item
                    key={idx}
                    active={el.active}
                    linkAs={Link}
                    href={el.url}
                >
                    {el.label}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}
