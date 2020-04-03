import React, { Component } from "react";

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

        // Create new Book object with the data from inputs
        const book = { title, description, photo, link };

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
                            placeholder="Book Title"
                        />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input
                            name="description"
                            value={this.state.description}
                            onChange={this.chnageHandler}
                            placeholder="Book Description"
                        />
                    </div>
                    <div>
                        <label>Link: </label>
                        <input
                            name="place"
                            value={this.state.place}
                            onChange={this.chnageHandler}
                            placeholder="Book link"
                        />
                    </div>
                    <div>
                        <label>Photo: </label>
                        <input
                            name="photo"
                            value={this.state.photo}
                            onChange={this.chnageHandler}
                            placeholder="Book Photo"
                        />
                    </div>

                    <button type="submit">Add Book</button>
                </form>
            </div>
        );
    }
}