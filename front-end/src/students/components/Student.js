import React, { Component } from "react";
import Books from "../../books/component/books";
import StudentForm from "./StudentForm";
import { getAllStudents} from "../api";


export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
        StudentLog: false,
        students:[],
    };
  }

  //get all students from API 
  componentDidMount() {
    getAllStudents()
        .then(response => {
            this.setState({
              //fetch the data from the arry in response 
              students: response.data.students
            });
            console.log(response.data.students)
        })
        //if there  any error 
        .catch(err => console.log(err));
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