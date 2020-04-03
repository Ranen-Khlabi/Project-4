import React, { Component } from "react";
import Books from "../../books/component/books";
import StudentForm from "./StudentForm";
import { getAllStudents} from "../api";


export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
        StudentLog: false,
        students:[]
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
    const students = this.state.students;

    // find the selected name that enter by student
    const selectedStudentsName = students.find(
      student => student.name.toLowerCase() === name.toLowerCase()
    );
    //check if the names found
    if (selectedStudentsName) {
      //create setStete if found return true
      this.setState({
        StudentLog: true
      });
    } else {
      //if the name not found return nothing
      this.setState({
        StudentLog: false
      });
    }
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