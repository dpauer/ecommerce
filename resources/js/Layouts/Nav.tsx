import { User } from "@/types"
import { Link, router, usePage } from "@inertiajs/react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

export default function (): JSX.Element {
  const auth = usePage().props.auth as { user: User }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} href="/">
          E-Commerce
        </Navbar.Brand>
        <Navbar>
          <Nav>
            {auth.user ? (
              <>
                <Nav.Link as={Link} href={route("dashboard")}>
                  Dashboard
                </Nav.Link>
                <NavDropdown title={auth.user.name} align="end">
                  <NavDropdown.Item
                    onClick={() => {
                      router.post(route("logout"))
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
              </>
            )}
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  )
}
