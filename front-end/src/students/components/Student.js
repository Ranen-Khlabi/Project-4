import React, { Component } from "react";
import Books from "../../books/component/books";
import StudentForm from "./StudentForm";
import { getAllStudents, deleteStudentById, loginStudent, logoutStudent} from "../api";
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
        showAddedBooks: false,
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


    checkBookAdd = (book, studentId) => {
        return book.students.find(
            student => student._id === studentId
        );
    };

    toggleShowBooks = e => {
        this.setState({
            showAddedBooks: !this.state.showAddedBooks
        });
    };

    // Get the name of the student by the ID
  getStudentname = studentId => {
    return this.state.students.find(student => student._id === studentId);
  };

  // Method to register a Student to a Book and add it to the list of their registered
  // and removing it from the list of unregistered books
  selectBook = bookId => {
    // Remove the book by id from the unadded books
    const unaddedBooks = this.state.unaddedBooks.filter(
      book => book._id !== bookId
    );
  

    // Get the new book that the student registered for
    const book = this.state.unaddedBooks.find(book => book._id === bookId);

    // Get the current students name and push it to the list of students
    // registered for the selected Book
    const student = this.getStudentname(this.state.studentLogged);
    book.students.push(student);

    const addedBooks = [...this.state.addedBooks, book];

    // Set the changes in both registered and unregistered student books
    this.setState({
      addedBooks,
      unaddedBooks
    });
  };

    // Method unregister to remove the book from the list of student added
  leaveBook = bookId => {
    // Remove the book by id from the added books
    const addedBooks = this.state.addedBooks.filter(
      book => book._id !== bookId
    );

    // Get the remove book that the student selected
    const book = this.state.addedBooks.find(book => book._id === bookId);

    // Get the current student name and push it to the list of students unregistered for the selected book
    const student = this.getStudentname(this.state.studentLogged);
    book.students.push(student);

    // After remove the student from the post of book, remove the book from the list registered books
    const unaddedBooks = [...this.state.unaddedBooks, book];

    // Set the changes in both registered and unregistered student books
    this.setState({
      unaddedBooks,
      addedBooks
    });
  };

  // Make Login Request for the student and check if they are authenticated
  authenticateStudent = async student => {
    try {
      const res = await loginStudent(student);
      this.setState({
        StudentLog: true,
        studentLogged: res.data.student.id,
        studentName: res.data.student.name
      });

      return true
    }
    catch (err) {
       console.log(err);
    }
  }

  //create method login
  StudentLog = async student => {
    // Try Login Request for the submitted Student data
    const loginSucess = await this.authenticateStudent(student);

    //check if the login is successfull
    if (loginSucess) {
        const addedBooks = [];
        const unaddedBooks = [];

        this.props.books.forEach(book => {
            if (this.checkBookAdd(book, this.state.studentLogged)) {
                addedBooks.push(book);
            } else {
                unaddedBooks.push(book);
            }
        });

      //create setStete if found return true
      this.setState({
        addedBooks,
        unaddedBooks
      });
    } else {
      //if the student not auth return nothing
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

        {/* Added book */}
      <Books 
      books={this.props.addedBooks} 
      setBooks={this.props.setBooks} 
      studentId={this.state.studentLogged}
      leaveBook={this.leaveBook}
      />
      </>
    ) : (
        <>

        {/* unadded book */}
        <Books
        books={this.state.unaddedBooks}
        setBooks={this.props.setBooks}
        studentId={this.state.studentLogged}
        selectBook={this.selectBook}
        />
        </>
        );

        const btnText = this.state.showAddedBooks
            ? "Show Unadded Books"
            : "Show Added Books";

    return (
      <div>
          {this.state.StudentLog ? (
          <>
              <button onClick={this.deleteStudent}>Delete Student</button>
              <button onClick={this.logout}>Logout</button>
          </>
      ) : (
        <StudentForm StudentLog = {this.StudentLog} />
      )}
        <button onClick={this.toggleShowBooks}>{btnText}</button>
                {SelectedBooks}
      </div>
    );
  }
}