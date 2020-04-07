import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import apiURL from "./apiConfig";
import Contributor from './contributors/components/Contributor';
import Student from './students/components/Student';
import Home from './Home.js';
import Register from './Register.js'


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

        <div className="main">
            <header>
                <h1> R-OnlineBooks </h1>
            </header>

        <Router>
        <nav className="link">
        <Link to="/"><img src="https://cdn4.iconfinder.com/data/icons/science-and-technology-3-10/65/103-512.png" height="100px"/></Link>
          <Link className="link" to="/Home">About us</Link> { '  ' }
          <Link className="link" to="/Register">Register</Link> { '  ' }
          <Link className="link" to="/Student">Search Book</Link> { '  ' }
          <Link className="link" to="/Contributor">Contributor?</Link>
        </nav>
  
        <div>
          <Route
            path="/Home"
            render={() => (
              <Home/>
            )}
          />

          <Route
            path="/Register"
            render={() => (
              <Register/>
            )}
          />

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
        </div>
    );
}
}


export default App;