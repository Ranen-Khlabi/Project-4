import React from "react";
import BookForm from "./BookForm";



class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          editForm: false
        };
      }

    // Call parent method to delete book by ID
    deleteBook = () => {
        this.props.deleteBook(this.props.id)
    }

    // Update and write condition to switch either false or true
  updateBook = e => {
    this.setState({
      editForm: !this.state.editForm
    });
  };

  //can edeit book by contributor
  editBook = book => {
    this.props.editBook(id, book);
  };


    render() {
        // Delete button that appears if the contributor that made the book
        // is logged in 
        const buttons = this.props.contributorLogged ? (
            <div>
            <button onClick={this.deleteBook}>Delete Book</button>
            <button onClick={this.updateBook}>Edit</button>
            </div>
        ):( 
         ""
        );

        //Definition allStudents To show all students through it
        const allStudents = this.props.students.map((student, index) => (
            <p key={index}>{student.name}</p>
        ));

        return (
            <div className="book">

                <h2>{this.props.title}</h2>
                <p><img src={this.props.photo} alt={this.props.title}/></p>
                <h3>The Book descrip</h3>
                <p>{this.props.description}</p>
                <h3>The Book Link</h3>
                <p>{this.props.link}</p>
                <p>{this.props.contributor.name}</p>

                {allStudents}
                {buttons}
                
                {this.state.editForm ? (
                <BookForm 
                title={this.props.title}
                photo={this.props.photo}
                description={this.props.description}
                link={this.props.link}
                id={this.props.id}
                editBook={this.editBook}
                />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default Book;