import React,{Component} from 'react';
import { FaAddressBook, FaUser } from 'react-icons/fa';
import { Input } from 'reactstrap';
import CartComponent from './CartComponent';

class CheckoutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { name : '', email : '', number : '', address:'', showAddress: false, showPayment: false  };
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handlePayNow = () => {

    }
    render() {
        return (
            <div className="container">
        
                <div className="row">
                
                    <div className="col-lg-6 col-12">
                        <form className="contact-form-wrap contact-form-bg" onSubmit={e => this.handleSubmit(e)}>
                        <h4>Checkout</h4>

                        <div className="row shadow2" style={{padding: '25px',borderRadius:'20px',marginBottom:'20px',backgroundColor:'#f7f7f7'}}>
                            <FaUser size={22} />
                            <div className="col-11 col-md-11" >
                                <h4>Account Info</h4>
                                <Input placeholder="Enter name" value={this.state.name} onChange={(e) => this.setState({name : e.target.value})}/>
                                <Input placeholder="Enter email" value={this.state.email} onChange={(e) => this.setState({email : e.target.value})}/>
                                <Input placeholder="Enter Phone number" value={this.state.number} onChange={(e) => this.setState({number : e.target.value})}/>
                                <button className="btn btn-block cart" onClick={() => this.setState({showAddress : true})}>Continue</button>
                            </div>
                        </div>
                        {this.state.showAddress && (

                            <div className="row shadow2" style={{padding: '25px',borderRadius:'20px',marginBottom:'20px',backgroundColor:'#f7f7f7'}}>
                                <FaAddressBook size={22} />

                                    <div className="col-11 col-md-11" >
                                        <h4>Address</h4>
                                        <Input placeholder="Enter address" value={this.state.address} onChange={(e) => this.setState({address : e.target.value})}/>
                                        <button className="btn btn-block cart" onClick={() => this.setState({showPayment : true})}>Continue</button>
                                    </div>
                                
                            </div>
                        )}

                        </form>
                    </div>

                    {/* Cart */}
                    <div className="col-lg-6 col-12">
                        <CartComponent 
                            details={{name : this.state.name,
                                 email : this.state.email,
                                 phoneno : this.state.number,
                                 showPay : this.state.showPayment
                            }}
                        />
                    </div>
                
                </div>
            </div>
        );
    }
}

export default CheckoutComponent;