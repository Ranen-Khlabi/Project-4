import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import apiURL from "./apiConfig";
import Contributor from './contributors/components/Contributor';
import ContributorForm from './contributors/components/ContributorForm';
import {addNewContributor} from './contributors/api'
import Student from './students/components/Student';
import StudentForm from './students/components/StudentForm';
import { addNewStudent } from './students/api';



class App extends React.Component {
    //Definition of an empty array
  constructor(props) {
    super(props);

    this.state = {
     books: [],
     students: []
    };
    console.log('API URL', apiURL);
  }

  setBooks = (books) => {
    this.setState({ books: books });
  }


  render() {
    return (

        <div>
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
        <ContributorForm/>
        <StudentForm/>
        </div>
    );
}
}


export default App;