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



  render() {
    let allbooks = <p>Enter your name to see the books you have listed!</p>;

    if (this.props.books.length > 0) {
        allbooks = this.props.books.map((book, index) => {
        return (
           <Book
            title={book.title}
            photo={book.photo}
            description={book.description}
            link={book.link}
            contributor={book.contributor}
            students={book.students}
            id={book._id}
            key={index}
            contributorLogged={this.props.contributorLogged}
            deleteBook={this.deleteBook} 
            editBook={this.editBook}
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