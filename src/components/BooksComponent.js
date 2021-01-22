import React, { Component } from 'react';
import {add,get, checkStoreExists} from '../services/database';
import { Table,Button,Input } from 'reactstrap';


class BooksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { pageSize : 10, pageIndex : 1 , books : []};
    }
    componentDidMount() {

        // if(recordLength === false) {
            // Fetching data from API
            const booksApi = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json';
            fetch(booksApi,{
                method: 'GET'
            })
            .then(res => res.json())
            .then(data => {
                console.log("Fetching from api for the first time",data);
                add(data) 
                
            })
        // }
        
    }
  
    render() {
        let count = 1;
        get(localBookArray => {
            if(count <= 10) {
                this.setState({ ...this.state, books: localBookArray.slice(0,10) });
                count += 1
            }
        })
          
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
                                    <td>{data.average_rating}</td>
                                    <td>{data.price}</td>
                                </tr>
                            ))}
                        </tbody>
                </Table>
                </div>
            </div>
        );
    }
}

export default BooksComponent;