import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown,Button  } from 'react-bootstrap';
import {Link, Redirect,Switch,Route} from 'react-router-dom'
import RegisterCategory from './RegisterCategory'
import App from '../App'
import Login from './Login'
export default class NavBar extends Component {
  state={login:this.props.login}
  render(){
    console.log(this.state.login)
    if (this.state.login) {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/Home/RegisterCategory">
                  Registro de categorías
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Home/ListCategory">
                  Lista de categorías
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Login">
                  Something
                </NavDropdown.Item>
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
                onClick={() => {
                  localStorage.clear();
                  this.setState({login:false})
                }}
              >
                LOGOUT
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <div>
          {window.location.replace("/login")}
        </div>
      );
    }
  }
}
