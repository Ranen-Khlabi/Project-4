import React, { Component } from "react";
import Books from "../../books/component/books";
import StudentForm from "./StudentForm";
import { getAllStudents, deleteStudentById} from "../api";
import { IoIosHeart } from "react-icons/io";


export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
        StudentLog: false,
        studentLogged: "",
        students:[],
        addedBooks: [],
        unaddedBooks: [],
        showAddedBooks: false
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
            console.log(response.data.students);
        })
        .catch(err => console.log(err));
    }

    checkBookAdd = (book, username) => {
        return book.students.find(
            student => username.toLowerCase() === student.name.toLowerCase()
        );
    };

    toggleShowBooks = e => {
        this.setState({
            showAddedBooks: !this.state.showAddedBooks
        });
    };

  //create method login
  StudentLog = name => {
    const students = this.state.students;

    // find the selected name that enter by student
    const selectedStudentsName = students.find(
      student => student.name.toLowerCase() === name.toLowerCase()
    );
    //check if the names found
    if (selectedStudentsName) {
        const addedBooks = [];
        const unaddedBooks = [];

        this.props.books.forEach(book => {
            if (this.checkBookAdd(book, name)) {
                addedBooks.push(book);
            } else {
                unaddedBooks.push(book);
            }
        });

      //create setStete if found return true
      this.setState({
        StudentLog: true,
        addedBooks,
        unaddedBooks,
        studentLogged: selectedStudentsName._id
      });
    } else {
      //if the name not found return nothing
      this.setState({
        StudentLog: false
      });
    }
  }

  // Create Delete function
  deleteStudent = () => {
    deleteStudentById(this.state.studentLogged)
        .then(response => {
            // Create Varible for control to Array for student 
                // & Create ForLoop to check all index 
                // if student ID = studentlog & delete one index
                const books = [...this.state.addedBooks]
                books.forEach(book => {
                    const index = book.students.findIndex(studentId => 
                    this.state.studentLogged === studentId
                    )
                    book.students.splice(index, 1)
                })

            this.setState({
                StudentLog: false,
                studentLogged: "",
                addedBooks: books
            })
        })
        .catch(error => {
            console.log(error)
        })
    }


  render() {
    const SelectedBooks = this.state.showAddedBooks ? ( <>
        <h2> Hello <IoIosHeart/> </h2>

        {/* Add Delete Button */}
        <button onClick={this.deleteStudent}>Delete</button>

      <Books 
      books={this.props.addedBooks} 
      setBooks={this.props.setBooks} 
      />
      </>
    ) : (
        <>
        <Books
        books={this.state.unaddedBooks}
        setBooks={this.props.setBooks}
        />
        </>
        );

        const btnText = this.state.showAddedBooks
            ? "Show Unadded Books"
            : "Show Added Books";

    return (
      <div>
        <StudentForm StudentLog = {this.StudentLog} />
        <button onClick={this.toggleShowBooks}>{btnText}</button>
                {SelectedBooks}
      </div>
    );
  }
}