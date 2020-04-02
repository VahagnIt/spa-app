import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";

const Header = props => {
  let navLinks = (
    <Nav.Link as={NavLink} to="/auth">
      Login
    </Nav.Link>
  );
  if (props.isLoggedIn) {
    navLinks = (
      <>
        <Nav.Link as={NavLink} to="/favorites">
          Favorites
        </Nav.Link>
        <Nav.Link as={NavLink} onClick={() => props.logout()} to="/auth">
          Log Out
        </Nav.Link>
      </>
    );
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to="/">
        Navbar
      </Navbar.Brand>
      <Nav className="ml-auto">{navLinks}</Nav>
    </Navbar>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}
export default connect(null, mapDispatchToProps)(Header);
