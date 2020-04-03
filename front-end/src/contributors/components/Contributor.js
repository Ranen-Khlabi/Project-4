import React, { Component } from "react";
import Books from "../../books/books";
import ContributorForm from "./ContributorForm";

export default class Contributor extends Component {
    constructor(props) {
        super(props);

        // By default theres no Contributor logged in, so no books will render
        this.state = {
            contributorLogged: false
        };
    }

    // Change the state to contributorLogged so books can be rendered
    contributorLogin = name => {
        this.setState({
            contributorLogged: true
        });
    };

    render() {
        // Books will only be rendered if there's an org logged in
        const books = this.state.contributorLogged ? (
            <Books 
            books={this.props.books} 
            setBooks={this.props.setBooks} />
        ) : (
            ""
        );

        return (
            <div>
                <ContributorForm contributorLogin={this.contributorLogin} />
                {books}
            </div>
        );
    }
}