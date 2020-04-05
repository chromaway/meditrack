import React, { Component } from 'react';
import {
    Card,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';

import OrdersList from './OrdersList';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="inverse" light expand="md">
                <NavbarBrand href="/">
                  <img src="meditrack-162x60.png" height="30" class="d-inline-block align-top" alt=""/>
                </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Requests</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">Admin</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://explorer.chromia.dev">Blockchain</NavLink>
                            </NavItem>
                
                        </Nav>
                    </Collapse>
                </Navbar>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Meditrack</h1>
                                <p>
                                    <Button
                                        tag="a"
                                        color="secondary"
                                        size="large"
                                        href="http://reactstrap.github.io"
                                        target="_blank"
                                    >
                                        Get started
                                    </Button>
                </p>
                
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <Card>
                  <div className="card-body">
                    <h2 className="card-title">My requests</h2>
                  
                    <OrdersList/>
                  </div>
                </Card>
            </div>
        );
    }
}

export default App;


                                // <p>
                                //     <Button
                                //         tag="a"
                                //         color="info"
                                //         size="large"
                                //         href="http://reactstrap.github.io"
                                //         target="_blank"
                                //     >
                                //         Other accent color
                                //     </Button>
                                // </p>
