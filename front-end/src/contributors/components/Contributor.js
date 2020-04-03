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
            currentContributorBooks: []
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

    // Change the state of contributors books so can be rendered
    contributorLogin = name => {
        // get contributors array from state
        const { contributors } = this.state;

        // Find the selected contributor by the passed name
        const selectedContributor = contributors.find(
            con => con.name.toLowerCase() === name.toLowerCase()
        );

        // check if an contributor is found by name
        // update the current contributor to render its books
        if (selectedContributor) {
            // Get all books by the contributor with the passed name
            const contributorBooks = this.props.books.filter(
                book =>
                    book.contributor.name.toLowerCase() ===
                    selectedContributor.name.toLowerCase()
            );

            this.setState({
                currentContributorBooks: contributorBooks
            });
        } else {
            // If no contributor is found by name don't render any books
            this.setState({
                currentContributorBooks: []
            });
        }
    };

    // Pass the books array to parent (App) to keep it in the state
    setBooks = books => {
        this.props.setBooks(books);
    };

    render() {

        return (
            <div>
                <ContributorForm contributorLogin={this.contributorLogin} />
                <Books
                    books={this.state.currentContributorBooks}
                    setBooks={this.setBooks}
                />
            </div>
        );
    }
}