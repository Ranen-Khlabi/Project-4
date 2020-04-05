import React, { Component } from "react";
import Books from "../../books/component/books";
import ContributorForm from "./ContributorForm";
import BookForm from "../../books/component/BookForm";
import { getAllContributors, deleteContributor } from "../api";
import { IoMdCloseCircleOutline, IoIosHeart } from "react-icons/io";


export default class Contributor extends Component {
    constructor(props) {
        super(props);

        // By default theres no Contributor logged in, so no books will render
        this.state = {
            contributors: [],
            currentContributorBooks: [],
            contributorLogged: false,
            contributorId: ""
        };
    }

    deleteContr=(id)=>{
        deleteContributor(id)
        .then(response=>{
            this.setState({
                contributorLogged: false
            })
        })
        .catch(error => {
            console.log(error);})
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

            // Since an contributor is authenticated by name the state
            // will hold its books and logged state is true
            this.setState({
                currentContributorBooks: contributorBooks,
                contributorLogged: true,
                contributorId: selectedContributor._id
            });
        } else {
            // If no contributor is found by name don't render any books
            this.setState({
                currentContributorBooks: [],
                contributorLogged: false
            });
        }
    };

    // Pass the books array to parent (App) to keep it in the state
    setBooks = books => {
        this.props.setBooks(books);
    };

    // Set new contributor books array
    setContributorBooks = books => {
        this.setState({
            currentContributorBooks: books
        });
    }

    // Add new book to the contributor books state
    addBook = book => {
        this.setState({
            currentContributorBooks: [
                ...this.state.currentContributorBooks,
                book
            ]
        });
    };


    render() {

        return (
            <div>
                <ContributorForm contributorLogin={this.contributorLogin} />
                <br/>
                {/* Render add book form only when an contributor is logged in */}

                {/* Add delete button for contributor */}
                {this.state.contributorLogged ? ( <>
                <h2> Hello <IoIosHeart/></h2>
                <button onClick={this.deleteContr}>Delete Account <IoMdCloseCircleOutline/></button>

                <BookForm
                    contributorId={this.state.contributorId}
                    addBook={this.addBook}
                />
                </>
                ) : (
                    ""
                )}
                <Books
                    books={this.state.currentContributorBooks}
                    setBooks={this.setBooks}
                    contributorLogged={this.state.contributorLogged}
                    setContributorBooks={this.setContributorBooks}
                />
            </div>
        );
    }
}