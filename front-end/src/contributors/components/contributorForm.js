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

        // Call the method of the contributor login in the parent
        // and pass it the name of the contributor to be logged in
        if ( this.props.contributorLogin){
            this.props.contributorLogin(contributorName);}
            else if (this.props.addnewcontributor){
            this.props.addnewOrg(contributorName);}
          };

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label>Your Name: </label>
                    <input
                        value={this.state.name}
                        onChange={this.changeHandler}
                        type="text" 
                        className="name" 
                        name="name"
                        placeholder = "Type your Name... " 
                        autocomplete="off" required>
                    </input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}