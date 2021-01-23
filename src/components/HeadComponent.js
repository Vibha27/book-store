import React,{Component} from 'react';
import { Navbar,Nav,NavbarBrand,NavLink,Badge,Button,Input } from 'reactstrap';
import Icon from '@material-ui/core/Icon';
import { yellow } from '@material-ui/core/colors';

class HeadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
            
            <Navbar bg="dark" variant="dark">
                <NavbarBrand href="#home">Navbar</NavbarBrand>
                <Nav className="mr-auto">
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#pricing">Pricing</NavLink>
                </Nav>
                <Button variant="outline-info">
                    <Icon style={{ color: yellow[800] }} fontSize="small">addshoppingcarticon</Icon>
                    <Badge variant="light">9</Badge>
                </Button>
                
            </Navbar>
          </div>
        );
    }
}

export default HeadComponent;