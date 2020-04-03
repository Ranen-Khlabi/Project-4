import React, { Component } from "react";
import Books from "../../books/component/books";
import StudentForm from "./StudentForm";


export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentLog: false
    };
  }

  StudentLog = name => {
    this.setState({
      StudentLog: true,
    });
  };


  render() {
    const books = this.state.StudentLog ? (
      <Books 
      books={this.props.books} 
      setBooks={this.props.setBooks} 
      />
    ) : (
      ""
    );

    return (
      <div>
        <StudentForm StudentLog = {this.StudentLog} />
        {books}
      </div>
    );
  }
}