import { PropsWithChildren } from "react"
import Container from "react-bootstrap/Container"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Nav from "./Nav"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav />
      <Container>
        <ToastContainer />
        {children}
      </Container>
    </>
  )
}
