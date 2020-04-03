import React from "react";
import "./App.css";
// import Books from "./books/books";
import apiURL from "./apiConfig";
// import Contributor from './contributors/components/Contributor';
// import Student from './students/components/Student';



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
       <Contributor 
        books={this.state.books} 
        setBooks={this.setBooks}
        />
        <Student 
        books={this.state.books} 
        setBooks={this.setBooks}
        />
        
      </div>
    );
  }
}


export default App;