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
        console.log('API ERROR:', error);
      });
  }

  // Delete book by ID
  deleteBook = id => {
    deleteBookById(id)
        .then(res => {
            // Filter books to execlude the book with the passed id
            const newBooks = this.props.books.filter(book => book._id !== id);

            // Set the value of the new contributors books array
            this.props.setContributorBooks(newBooks);
        })
        .catch(err => console.log(err));
}



  render() {
    let allbooks = <h4>No Books!</h4>;

    if (this.props.books.length > 0) {
        allbooks = this.props.books.map((book, index) => {
        return (
           <Book
            title={book.title}
            photo={ <img src={book.photo}></img>}
            description={book.description}
            link={<a href={ book.link}></a>}
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
        <h3>All Books</h3>
        {allbooks}
      </>
    );
  }
}



export default Books;