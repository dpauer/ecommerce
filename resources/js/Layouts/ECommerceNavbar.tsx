import { User } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function (): JSX.Element {
    const auth = usePage().props.auth as { user: User };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} href="/">
                    E-Commerce
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {auth.user ? (
                            <>
                                <Nav.Link as={Link} href={route("dashboard")}>
                                    Dashboard
                                </Nav.Link>
                                <NavDropdown
                                    title={auth.user.name}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        as={Link}
                                        href={route("profile.edit")}
                                    >
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => {
                                            router.post(route("logout"));
                                        }}
                                    >
                                        Log Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} href={route("login")}>
                                    Log in
                                </Nav.Link>
                                <Nav.Link as={Link} href={route("register")}>
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
