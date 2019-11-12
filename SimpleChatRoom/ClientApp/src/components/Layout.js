import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    componentWillMount() {
    }
    render() {
        const name = sessionStorage.getItem("user") == null ? '' : sessionStorage.getItem("user");
        const pic = sessionStorage.getItem("pic") == null ? '' : sessionStorage.getItem("pic");
    return (
      <div>
            <NavMenu user={name} src={pic}/>
        <Container>
          {this.props.children}
            </Container>
        </div>
    );
    }
}
