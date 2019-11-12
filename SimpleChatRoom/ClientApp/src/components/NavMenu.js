import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../Css/NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
      this.state = {
        collapsed: true
    };
    }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }
    componentDidMount() {
    }
    clearSession() {
        sessionStorage.clear();
    }

    render() {
        
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Simple_ChatRoom</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink tag={Link} className="text-dark" onClick={this.clearSession} to="/Login">Logout</NavLink>
                </NavItem>
                 <NavItem style={{ padding: 8, color: "blue" }}>
                  {this.props.user}
                </NavItem>
                <NavItem>
                <img className="img-circle" src={this.props.src} alt="" className="img" style={{ height: '40px', width: '40px' }} />
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
NavMenu.propTypes = {
    src: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
}