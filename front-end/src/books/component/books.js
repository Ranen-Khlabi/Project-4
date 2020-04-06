import React from "react";
import Book from "./book";
import { getAllBooks, deleteBookById } from "./api";




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



  render() {
    let allbooks = <p>Enter your name to see the books you have listed!</p>;

    if (this.props.books.length > 0) {
        allbooks = this.props.books.map((book, index) => {
        return (
           <Book
            title={book.title}
            photo={ <img src={book.photo}/>}
            description={book.description}
            link={<a href={book.link}>click here to show book</a>}
            contributor={book.contributor}
            students={book.students}
            id={book._id}
            key={index}
            contributorLogged={this.props.contributorLogged}
            deleteBook={this.deleteBook} 
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