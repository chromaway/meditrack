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
import ItemView from './ItemView';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            helloOpen: true,
            isOpen: false,
            viewId: false
        };

        this.onGetStartedClick=this.onGetStartedClick.bind(this);
        this.onViewClick=this.onViewClick.bind(this);
        this.onViewClose=this.onViewClose.bind(this);        
    }
    onGetStartedClick(id) {
        this.setState({helloOpen: false});
    }
    
    
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    onViewClick(id) {
        console.log("view click:", id)
        this.setState({viewId: id});
    }
    onViewClose() {
        this.setState({viewId: 0});
    }
    render() {
        return (
            <div>
                <Navbar color="inverse" light expand="md">
                <NavbarBrand href="/">
                  <img src="meditrack-162x60.png" height="30" className="d-inline-block align-top" alt=""/>
                </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#">Requests</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/chromaway/meditrack">Admin</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://explorer-testnet.chromia.com">Blockchain</NavLink>
                            </NavItem>
                
                        </Nav>
                    </Collapse>
                </Navbar>
                {this.state.helloOpen? 
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                 <h2>Welcome to Meditrack</h2>
                 <p>A tool for solidarity and effient allocation during an emergency.</p>
                                    <Button
                                        tag="button"
                                        color="secondary"
                                        size="large"
                                        onClick={this.onGetStartedClick}
                                    >
                                        Get started
                                    </Button>
                 </Col>
                 
                        </Row>
                    </Container>
                 </Jumbotron>
                 : <div></div>
                }
                
                <Card>
                  <div className="card-body">
                    <h2 className="card-title">My requests</h2>
                    <ItemView id={this.state.viewId}
                        isOpen={this.state.viewId}
                        onClose={this.onViewClose}/>
                    <OrdersList onViewClick = {this.onViewClick}/>
                  </div>
                </Card>
            </div>
        );
    }
}

export default App;

