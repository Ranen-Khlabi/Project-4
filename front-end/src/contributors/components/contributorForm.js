import React, { Component } from "react";

export default class ContributorForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        };
    }

    // Set state with the new value of the input field
    changeHandler = e => {
        this.setState({
            name: e.target.value
        });
    };

    // Get the name of the contributor from the form state
    submitHandler = e => {
        e.preventDefault();
        // The inputed name in a variable
        const contributorName = this.state.name;

        // Return the state to the original so the input field value is cleared
        this.setState({
            name: ""
        });

        console.log(contributorName);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label>Contributor Name: </label>
                    <input
                        value={this.state.name}
                        onChange={this.changeHandler}>
                    </input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}