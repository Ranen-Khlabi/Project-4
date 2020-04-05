import React, { Component } from "react";
import { createBook } from "./api"

export default class BookForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            photo: "",
            description: "",
            link: ""
        };
    }

    // Set state with new value when an input field is changed
    chnageHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitHanler = e => {
        // Prevent page reload when the form is submitted
        e.preventDefault();

        // Get the input values from the state
        const { title, description, photo, link } = this.state;

        // Get contributor Id from props
        const contributor = this.props.contributorId;

        // Create new Book object with the data from inputs
        const book = { title, description, photo, link, contributor };

        // Make POST request to the API with a new book object
        createBook({ book })
            .then(res => {
                // Add new Book to the Contributor state
                this.props.addBook(res.data.book);
            })
            .catch(err => console.log(err));

        // Return all the state values to their defaults
        this.setState({
            title: "",
            photo: "",
            description: "",
            link: ""
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.submitHanler}>
                    <div>
                        <label>Title: </label>
                        <input
                            name="title"
                            value={this.state.title}
                            onChange={this.chnageHandler}
                            placeholder="The Book Title"
                        />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input
                            name="description"
                            value={this.state.description}
                            onChange={this.chnageHandler}
                            placeholder="The Description"
                        />
                    </div>
                    <div>
                        <label>Link: </label>
                        <input
                            name="place"
                            value={this.state.place}
                            onChange={this.chnageHandler}
                            placeholder="The link"
                        />
                    </div>
                    <div>
                        <label>Photo: </label>
                        <input
                            name="photo"
                            value={this.state.photo}
                            onChange={this.chnageHandler}
                            placeholder="Add Photo for book"
                        />
                    </div>

                    <button type="submit">Add Book</button>
                </form>
            </div>
        );
    }
}