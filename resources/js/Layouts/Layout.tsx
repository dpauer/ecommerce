import { PropsWithChildren } from "react";
import Container from "react-bootstrap/Container";
import Nav from "./Nav";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Nav />
            <Container>{children}</Container>
        </>
    );
}
