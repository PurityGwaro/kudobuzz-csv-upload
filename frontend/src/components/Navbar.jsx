import {Navbar,Nav,Container} from 'react-bootstrap';

export default function ClientUI() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={
      {
        marginBottom: '10px',
      }
    }>
        <Container>
        <Navbar.Brand href="/">CSV UPLOAD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/">Profile</Nav.Link>
            <Nav.Link eventKey={2} href="/">
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
