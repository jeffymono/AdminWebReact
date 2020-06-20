import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown,Button  } from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
  render(){
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to='/RegisterCategory'>Registro de categorías</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/ListCategory'>
              Lista de categorías
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/Login'>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">More deets</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Dank memes
          </Nav.Link>
          <Button  
          size="sm"
          variant="outline-light"
          onClick={()=>{
              localStorage.clear()
              window.location.href = '/';
            }}>LOGOUT</Button >
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
  }
}
