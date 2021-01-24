import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';
import { getCart, deleteBookFromCart, deleteAllBookFromCart } from '../services/database';
import { Table,Button } from 'reactstrap';
import { FaWindowClose, FaRupeeSign } from 'react-icons/fa';
import PaymentComponent from './PaymentComponent';

class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cartItems : [], 
            total : 0 ,
            showCheckout : false,
            details : this.props.details || {}
        };
    }
    componentDidMount() {
        getCart(books => {
            this.setState({
                cartItems : books,
                total : books.reduce((prev,next) => prev + next.price,0),
                showPay: false
            })
        })
        this.handleButton()
    }

    // delete from cart
    removeFromCart = (id,price) => {
        deleteBookFromCart(id);
        this.setState(prevState => ({
            cartItems : prevState.cartItems.filter(book => book.bookID !== id),
            total : prevState.total - price
        }))
    }

    // handle button on cart page 
    handleButton = () => {
        this.props.history.location.pathname === '/cart' && this.setState({showCheckout : true})
        console.log(this.props.history) 
    }
    // handle payment
    handlePay = () => {
        deleteAllBookFromCart()
    }

    // handle checkout button
    handleCheckout = () => {
        this.props.history.push("/Checkout")
    }

    render() {
        return (
            <div className="mt-5">
                <Scrollbars style={{ width: 'auto', height: 520 }} ref="scrollbars">
                          
                    <Table striped responsive>
                            <thead>
                                <tr>
                                <th>Book</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Remove</th>
                                </tr>
                            </thead>

                            <tbody>

                                {this.state.cartItems.map((data,i) => {

                                    return (
                                        <tr key={data.bookID}>
                                            <td>{data.title}</td>
                                            <td>{data.authors}</td>
                                            
                                            <td><FaRupeeSign />{data.price}</td>
                                            <td><Button
                                            key={i}
                                            className="btn btn-sm btn-danger"
                                            onClick={() => this.removeFromCart(data.bookID,data.price)}
                                            ><FaWindowClose /></Button></td>
                                        </tr>
                                    )
                                })}
                                
                            <tr>
                                <td><b>Total</b></td>
                                <td></td>
                                <td></td>
                                <td><b><FaRupeeSign /> {this.state.total}</b></td>
                            </tr>
                            </tbody>
                    </Table>
                </Scrollbars>
                {this.state.showCheckout ? (
                    <button className="btn btn-sm buy float-right" onClick={() => this.handleCheckout()} >Checkout</button>
                    
                ):(
                    <PaymentComponent userDetails = {this.state.details}
                    total = {this.state.total}
                    handlePay = {() => this.handlePay()}/>
                )}
                
                
            </div>
        );
    }
}

export default withRouter(CartComponent);