import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import {add,get, addToCartDB, getCart, getLowToHigh, getHighToLow } from '../services/database';
import { Table,DropdownToggle,Dropdown,DropdownMenu, DropdownItem } from 'reactstrap';


class BooksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { pageSize : 10, pageIndex : 0 , books : [], dropdownOpen: false, sortKey: 'high' };
    }
    componentDidMount() {

        get(localBookArray => {
            this.setState(prevState => ({ books: localBookArray.slice(
                prevState.pageIndex * prevState.pageSize,
                prevState.pageIndex * prevState.pageSize + prevState.pageSize
            )}));
        })

        // get items in cart
        getCart( book => {
            this.setState({ cartItems : book })
        })

        // if(this.state.books.length === 0) {
        //     // Fetching data from API
            // const booksApi = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json';
            // fetch(booksApi,{
            //     method: 'GET'
            // })
            // .then(res => res.json())
            // .then(data => {
            //     console.log("Fetching from api for the first time",data);
            //     add(data) 
                
            // })
        // }
        
    }
  
    componentDidUpdate(prevBookState) {

        if(this.state.pageIndex !== prevBookState.pageIndex && this.state.sortKey !== prevBookState.sortKey) {
            if(this.state.sortKey === 'low'){
                getLowToHigh(localBookArray => {
                    this.setState(prevState => ({ books: localBookArray.slice(
                        prevState.pageIndex * prevState.pageSize,
                        prevState.pageIndex * prevState.pageSize + prevState.pageSize
                    )}));
                })
            }else {
                getHighToLow(localBookArray => {
                    this.setState(prevState => ({ books: localBookArray.slice(
                        prevState.pageIndex * prevState.pageSize,
                        prevState.pageIndex * prevState.pageSize + prevState.pageSize
                    )}));
                })
            }
            
        }else if(this.state.sortKey !== prevBookState.sortKey) {
            if(this.state.sortKey === 'low'){
                getLowToHigh(localBookArray => {
                    this.setState(prevState => ({ books: localBookArray.slice(
                        prevState.pageIndex * prevState.pageSize,
                        prevState.pageIndex * prevState.pageSize + prevState.pageSize
                    )}));
                })
            }else {
                getHighToLow(localBookArray => {
                    this.setState(prevState => ({ books: localBookArray.slice(
                        prevState.pageIndex * prevState.pageSize,
                        prevState.pageIndex * prevState.pageSize + prevState.pageSize
                    )}));
                })
            }
            
        }else if(this.state.pageIndex !== prevBookState.pageIndex) {

                get(localBookArray => {
                    this.setState(prevState => ({ books: localBookArray.slice(
                        prevState.pageIndex * prevState.pageSize,
                        prevState.pageIndex * prevState.pageSize + prevState.pageSize
                    )}));
                })
            
        }
        
    }

    handlePrevPageClick = (event) => {
        this.setState(prevState => ({
          pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0
        }));
    }

    handleNextPageClick = (event) => {
        this.setState(prevState => ({
          pageIndex:
            prevState.pageIndex + 1
        }));

    }

    // Adding to cart
    addToCart = (index) => {
        addToCartDB(this.state.books.find(book => book.bookID === index))
        this.props.history.push('/cart');
    }

    // ratings sorting
    toggle = () => {
        this.setState(prevState => ({
         dropdownOpen : !prevState.dropdownOpen
        }))
    }

    // sort ascending
    sortPriceAscending = (key) => {
        console.log(key)
            this.setState({
            sortKey: key
            })
    }

    // sort descending
    sortPriceDescending = (key) => {

        console.log(key)
            this.setState({
            sortKey: key
        })
    }

    render() {
        let publicUrl = process.env.PUBLIC_URL+'/';
        const inlineStyle = {
            backgroundImage: 'url('+publicUrl+'book-cover2.png)',
        }

        return (
            <div className="container " >
                <div className="row justify-content-center align-items-center m-2">

                <Table hover responsive borderless className="table jarallax" style= { inlineStyle }>
                        <thead>
                            <tr className="row">
                            <th className="col-5 col-lg-5">Book</th>
                            <th className="col-3 col-lg-3">Author</th>
                            <th className="col-1 col-lg-2">
                                Ratings
                            </th>
                            <th className="col-2 col-lg-1">
                            <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
                                <DropdownToggle caret>
                                    Price
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => this.sortPriceAscending("low")}>Low to High</DropdownItem>
                                    <DropdownItem onClick={() => this.sortPriceDescending("high")}>High to Low</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            </th>
                            <th className="col-1 col-lg-1">Add to Cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.books.map((data,i) => {

                                const index = i + this.state.pageIndex * this.state.pageSize;
                                return (
                                    <tr key={data.bookID} className="row">
                                        <td className="col-5 col-lg-5">
                                            <Link to={{
                                                pathname :`/${data.bookID}`,
                                                state : data
                                            }} className="book-name">{data.title}</Link>
                                        </td>
                                        <td className="col-3 col-lg-3">{data.authors}</td>
                                        <td className="col-2 col-lg-2">
                                            <StarRatings
                                                rating={data.average_rating}
                                                starDimension="18px"
                                                starSpacing="0px"
                                                starRatedColor='rgb(255, 102, 51)'
                                                name={data.authors}
                                            /></td>
                                        <td className="col-1 col-lg-1"><FaRupeeSign /> {data.price}</td>
                                        <td className="col-1 col-lg-1">
                                            <button
                                            key={index}
                                            className="btn btn-sm cart"
                                            onClick={() => this.addToCart(data.bookID)}
                                            >Add</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                </Table>
                </div>
                <div>
                    <button onClick={event => this.handlePrevPageClick(event)} className="btn btn-sm cart m-2">
                    {"<"}
                    </button>Page {this.state.pageIndex+1}
                    <button onClick={event => this.handleNextPageClick(event)} className="btn btn-sm cart m-2">
                    {">"}
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(BooksComponent);