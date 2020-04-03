import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import apiURL from "./apiConfig";
import Contributor from './contributors/components/Contributor';
import Student from './students/components/Student';



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
        <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Student">Student</Link>
          <Link to="/Contributor">Contributor</Link>
        </nav>
  
        <div>
          <Route
            path="/Student"
            render={() => (
              <Student
              books={this.state.books} 
              setPosts={this.setBooks}
              />
            )}
          />
  
          <Route
            path="/Contributor"
            render={() => (
              <Contributor
              books={this.state.books} 
              setBooks={this.setBooks}
              />
            )}
          />
        </div>
        </Router>
    );
}
}


export default App;