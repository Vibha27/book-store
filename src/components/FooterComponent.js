import React, { Component } from 'react';
import { FaFacebook, FaTwitter, FaBook, FaInstagram } from 'react-icons/fa';
import { Link,withRouter } from 'react-router-dom';

class Footer_v1 extends Component {

  constructor(props) {
    super(props);
  }
    componentDidMount() {
    }

    render() {

        const inlineStyle = {
            backgroundColor: '#403a35'
        }
        console.log(this.props)
        return (
             <footer className="footer-area" style={{color:'white',zIndex:'0'}}>
              <div className="container">
                <div>
                  <div className="row">
                      <p className="title"><FaBook /> Book Store</p>
                
                    
                  </div>
                </div>
                <div>
                  <div className="row justify-content-center align-items-center">
                    
                    <div className="col-lg-3 col-sm-6 pr-2" style={{paddingTop:'30px'}}>
                      <div>
                        <ul>
                          {/* About us,contact,faq  */}
                             <li >About Us
                             </li>
                             <li>Support</li>
                              <li>
                                FAQs
                              </li>
                        
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 pr-2">
                      <div>
                       {/* term and condition, privacy policy, refund */}
                        <ul>
                            <li>Terms & condition</li>
                            <li>privacy & policy</li>
                            <li>refund policy</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 pr-2">
                      <div className="float-right social">
                        <span>FOLLOW US</span>
                        <ul>
                            <li>
                              <FaFacebook />
                            </li>
                            <li>
                              <FaTwitter />
                            </li><li>
                              <FaInstagram />
                            </li>
                        </ul>
                      </div>  
                    </div>
                  </div>
                </div>
                </div>
            </footer>

        )
    }
}


export default withRouter(Footer_v1);