import React from "react";
import Book from "./book";
import { getAllBooks, deleteBookById, editBookById } from "./api";




class Books extends React.Component {
  componentDidMount() {
    getAllBooks()
      .then((response) => {
        this.props.setBooks(response.data.book);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //edit book by id
editBook = (id, book) => {
  const indexOfBookToUpdate = this.props.books.findIndex(
    book => book._id === id
  );
  // assign indexOfBookToUpdate to oldBook
  const oldBook = this.props.books[indexOfBookToUpdate];
  const { title, description, photo, link } = book;
  
  const newArray = [...this.props.books];
  // use splice to set the change
  newArray.splice(indexOfBookToUpdate, 1, {
    ...oldBook,
    title,
    link,
    photo,
    description
  });
  //props the method and take parmeter newArray to use
  this.props.setContributorBooks(newArray);
};

  // Delete book by ID
  deleteBook = id => {
    deleteBookById(id)
        .then(response => {
            // Filter books to execlude the book with the passed id
            const newBooks = this.props.books.filter(book => book._id !== id);

            // Set the value of the new contributors books array
            this.props.setContributorBooks(newBooks);
        })
        .catch(err => console.log(err));
}

// Get the book by it's id from the books list passed in props
getBookById = bookId => {
  return this.props.books.find(book => book._id === bookId);
};

// Method to register a student to Book by ID
selectBook = bookId => {
  // Get the current book that the student is registering for
  const book = this.getBookById(bookId);

  // Add the new registered studrnt to the book list of students
  const updatedStudentsList = [...book.students, this.props.studentId];

  // Make an API request to update list of book students
  editBookById(bookId, { students: updatedStudentsList })
    .then(res => {
      // Pass the updated Book ID to parent to set its state
      this.props.selectBook(bookId);
    })
    .catch(err => console.log(err));
};
// Method to unregister a Student to Book by ID
leaveBook = bookId => {
  // Get the current book that the book is registering for
  const book = this.getBookById(bookId);

  // remove the new registered student from the book list of students
  const updatedStudentsList = book.students.filter(
    studentId => studentId === this.props.studentId
  );

  // Make an API request to update list of book students
  editBookById(bookId, { students: updatedStudentsList })
    .then(res => {
      // Pass the updated Book ID to parent to set its state
      this.props.leaveBook(bookId);
    })
    .catch(err => console.log(err));
};



  render() {
    let allbooks = <p>Enter your name to see the books you have listed!</p>;

    if (this.props.books.length > 0) {
        allbooks = this.props.books.map((book, index) => {
        return (
           <Book
            title={book.title}
            photo={book.photo}
            description={book.description}
            link={<a href={book.link}>click here to show book</a>}
            contributor={book.contributor}
            students={book.students}
            id={book._id}
            key={index}
            contributorLogged={this.props.contributorLogged}
            deleteBook={this.deleteBook} 
            editBook={this.editBook}
            selectBook={this.props.selectBook ? this.selectBook : null}
            leaveBook={this.props.leaveBook ? this.leaveBook : null}
            />
        );
    }); 
  }
    return(
      <>
        {allbooks}
      </>
    );
  }
}



export default Books;