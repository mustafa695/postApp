import React from 'react'
import { useState } from 'react';
import { Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/" style={{fontWeight:'700'}}>React App</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/">Home</Link>
              </NavItem>
              <NavItem>
              <Link className="nav-link" to="/post">Post</Link>
              </NavItem>
              <NavItem>
              <Link className="nav-link" to="/about">About</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    
    
    )
}

export default Header;