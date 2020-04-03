import React, { Component } from "react";
import Books from "../../books/component/books";
import ContributorForm from "./ContributorForm";
import { getAllContributors } from "../api";


export default class Contributor extends Component {
    constructor(props) {
        super(props);

        // By default theres no Contributor logged in, so no books will render
        this.state = {
            contributors: [],
            contributorLogged: false
        };
    }

    componentDidMount() {
        // Get all Contributors from API and load them in the state
        getAllContributors()
            .then(response => {
                this.setState({
                    contributors: response.data.contributors
                });
            })
            .catch(err => console.log(err));
    }

    // Change the state to contributorLogged so books can be rendered
    contributorLogin = name => {
        // get contributors array from state
        const { contributors } = this.state;

        // Find the selected contributor by the passed name
        const selectedContributor = contributors.find(
            con => con.name.toLowerCase() === name.toLowerCase()
        );

        // check if an contributor is found by name, and change logged to true
        // to render books
        if (selectedContributor) {
            this.setState({
                contributorLogged: true
            });
        }
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