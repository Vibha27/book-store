import React,{Component} from 'react';
import StarRatings from 'react-star-ratings';
import { FaRupeeSign } from 'react-icons/fa';
import {Link, withRouter} from 'react-router-dom';
import { addToCartDB } from '../services/database';

class BookDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { bookDetail : this.props.location.state };
    }
    handleAddToCart = (book) => {
        addToCartDB(book)
        this.props.history.push('/cart');
    }

    render() {
        let publicUrl = process.env.PUBLIC_URL+'/';
        return (
            <div className="row m-2">
                <div className="col-12 col-md-5">
                    <img src={`${publicUrl+'book.png'}`} width="80%" alt="book img"/>
                </div>
                <div className="col-12 col-md-5 ">
                    <p>Title - {this.state.bookDetail.title}</p>
                    <StarRatings
                        rating={this.state.bookDetail.average_rating}
                        starDimension="26px"
                        starSpacing="1px"
                        starRatedColor='rgb(255, 102, 51)'
                        name={this.state.bookDetail.authors}
                    />
                    <p>Author - {this.state.bookDetail.authors}</p>
                    <p>ISBN no - {this.state.bookDetail.isbn}</p>
                    <p>Language - {this.state.bookDetail.language_code}</p>
                    <p>Price - <FaRupeeSign/> {this.state.bookDetail.price}</p><br /><br />
                        <button  className="btn btn-block cart" 
                        onClick={() => this.handleAddToCart(this.state.bookDetail)}>Add to cart</button>{" "}
                    
                    <Link to="/Checkout">
                        <button className="buy btn btn-block">Buy</button>
                    </Link>
                </div>
            </div>            
        );
    }
}

export default withRouter(BookDetailComponent);