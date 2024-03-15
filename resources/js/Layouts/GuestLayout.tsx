import { PropsWithChildren } from "react";
import Container from "react-bootstrap/Container";
import ECommerceNavbar from "./ECommerceNavbar";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <ECommerceNavbar />
            <Container>{children}</Container>
        </>
    );
}
