import React from "react";



class Book extends React.Component {
    render() {
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
            </div>
        );
    }
}

export default Book;