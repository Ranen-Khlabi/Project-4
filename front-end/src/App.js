import React from "react";
import "./App.css";
import Books from "./books/books";
import apiURL from "./apiConfig";
class App extends React.Component {
    //Definition of an empty array
  constructor(props) {
    super(props);
    this.state = {
     books: []
    };
    console.log('API URL', apiURL);
  }
  setBooks = (books) => {
    this.setState({ books: books });
  }
  render() {
    return (
      <div className ="App">
      <Books
       books = {this.state.books}
       setBooks = {this.setBooks} 
       />
      </div>
    );
  }
}
export default App;