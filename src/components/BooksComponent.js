import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import {add,get, checkStoreExists} from '../services/database';
import { Table,Button,Input } from 'reactstrap';


class BooksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { pageSize : 10, pageIndex : 1 , books : []};
    }
    componentDidMount() {

        get(localBookArray => {
            this.setState(prevState => ({ books: localBookArray.slice(
                prevState.pageIndex * prevState.pageSize,
                prevState.pageIndex * prevState.pageSize + prevState.pageSize
            )}));
        })
        // if(this.state.books.length === 0) {
        //     // Fetching data from API
        //     const booksApi = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json';
        //     fetch(booksApi,{
        //         method: 'GET'
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log("Fetching from api for the first time",data);
        //         add(data) 
                
        //     })
        // }
        
    }
  
    componentDidUpdate(prevBookState) {
        if(this.state.pageIndex !== prevBookState.pageIndex) {
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
            // <
            // Math.floor(prevState.users.length / prevState.pageSize)
            //   ? prevState.pageIndex + 1
            //   : prevState.pageIndex
        }));

        
    }

    render() {
          
        return (
            <div className="container">
                <div>

                <Table striped responsive>
                        <thead>
                            <tr>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Ratings</th>
                            <th>Price</th>
                            <th>Add to Cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.books.map(data => (
                                <tr key={data.bookID}>
                                    <td>{data.title}</td>
                                    <td>{data.authors}</td>
                                    <td>
                                        <StarRatings
                                            rating={data.average_rating}
                                            starDimension="22px"
                                            starSpacing="1px"
                                            starRatedColor='rgb(255, 102, 51)'
                                            name={data.bookID}
                                        /></td>
                                    <td>{data.price}</td>
                                </tr>
                            ))}
                        </tbody>
                </Table>
                </div>
                <div>
                    <Button onClick={event => this.handlePrevPageClick(event)} className="m-2">
                    {"<"}
                    </Button>Page {this.state.pageIndex+1}
                    <Button onClick={event => this.handleNextPageClick(event)} className="m-2">
                    {">"}
                    </Button>
                </div>
            </div>
        );
    }
}

export default BooksComponent;