import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AuthContext from "../../context/AuthContext";
import logo from "../../images/Holidaze logo.svg";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

export default function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function signout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <LinkContainer to="/" exact="true">
          <Nav.Link>
            <Navbar.Brand>
              <img src={logo} alt="Holidaze logo" />
            </Navbar.Brand>
          </Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {auth ? (
              <>
                <LinkContainer to="/" exact="true">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/accommodations">
                  <Nav.Link>Accommodations</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
                <NavDropdown title="Admin" id="collasible-nav-dropdown">
                  <LinkContainer to="/admin/messages">
                    <Nav.Link className="dropdown-item">Messages</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/admin/enquires">
                    <Nav.Link className="dropdown-item">Enquires</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/admin/add">
                    <Nav.Link className="dropdown-item">Add New</Nav.Link>
                  </LinkContainer>
                </NavDropdown>
                <Button className="mx-auto" onClick={signout}>Sign out</Button>
              </>
            ) : (
              <>
                <LinkContainer to="/">
                  <Nav.Link exact="true">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/accommodations">
                  <Nav.Link>Accommodations</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signin">
                  <Nav.Link className="navbar-nav__signin btn mx-auto">Sign in</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
