import React,{Component} from 'react';
import { Navbar,Nav,NavbarBrand,NavLink,Badge,Button, Input } from 'reactstrap';
import { FaShoppingBag, FaBook } from 'react-icons/fa';
import {getCart} from '../services/database';
import { Link } from 'react-router-dom';

class HeadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { count : 0 };
    }
    render() {
        getCart(entries => {
            this.setState({count : entries.length})
        })
        
        return (
            <div>
            <Navbar bg="dark" variant="dark">
                <NavbarBrand href="#home" className="title"><FaBook /> Book Store</NavbarBrand>
                <Nav className="m-auto col-6">
                    <Input placeholder="search book" className="search"/>
                </Nav>
                <Link to="/cart" style={{color:'rgb(255, 102, 51)'}}>
                        <FaShoppingBag size={34} /><sup style={{fontWeight:"bold"}}>{this.state.count}</sup>
                    
                </Link>
            </Navbar>
          </div>
        );
    }
}

export default HeadComponent;