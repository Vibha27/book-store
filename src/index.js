import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import CartComponent from './components/CartComponent';
import reportWebVitals from './reportWebVitals';
import BookDetailComponent from './components/BookDetailComponent';
import CheckoutComponent from './components/CheckoutComponent';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path='/cart' component={CartComponent} />
              <Route exact path='/checkout' component={CheckoutComponent} />
              <Route path='/:id' component={BookDetailComponent} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
    );
  }
}


export default Root;

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
