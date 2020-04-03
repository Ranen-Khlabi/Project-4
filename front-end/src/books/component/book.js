import React from "react";



class Book extends React.Component {
    // Call parent method to delete book by ID
    deleteBook = () => {
        this.props.deleteBook(this.props.id)
    }


    render() {
        // Delete button that appears if the contributor that made the book
        // is logged in 
        const deleteButton = this.props.contributorLogged ? (
            <button onClick={this.deletePost}>Delete Book</button>
        ) : "";

        //Definition allStudents To show all students through it
        const allStudents = this.props.students.map((student, index) => (
            <p key={index}>{student.name}</p>
        ));
        return (
            <div className="book">
                <p>{this.props.title}</p>
                <p>{this.props.photo}</p>
                <p>{this.props.description}</p>
                <p>{this.props.link}</p>
                <p>{this.props.contributor.name}</p>

                {allStudents}
                {deleteButton}
            </div>
        );
    }
}

export default Book;