import './App.css';
import BooksComponent from "./components/BooksComponent";
import HeadComponent from "./components/HeadComponent";
import Footer_v1 from './components/FooterComponent';

function App() {
      
  return (
    <div className="App">
      <HeadComponent />
      <BooksComponent />
      <Footer_v1 />
    </div>
  );
}

export default App;
