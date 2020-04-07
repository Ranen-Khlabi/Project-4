import React, { Component } from "react";
import Books from "../../books/component/books";
import ContributorForm from "./ContributorForm";
import BookForm from "../../books/component/BookForm";
import { getAllContributors, deleteContributor, contributorLogin, contributorLogout } from "../api";
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


    // Try to Login contributor with the submitted data
    authenticateContributor = async contributor => {
        try{
            const res = await contributorLogin(contributor);
            this.setState({
                contributorLogged: true,
                contributorId: res.data.contributor.id
            });

            return true
        }
        catch(err) {
            console.log(err);
        }
    }

    // Change the state of contributors books so can be rendered
    contributorLogin = async contributor => {
        // Try Login Request for the submitted contributor data
        const loginSucess = await this.authenticateContributor(contributor);

        // update the current contributor to render its books
        if (loginSucess) {
            // Get all books by the contributor with the passed name
            const contributorBooks = this.props.books.filter(
                book =>
                book.contributor._id === this.state.contributorId
            );

            // Since an contributor is authenticated by name the state
            // will hold its books
            this.setState({
                currentContributorBooks: contributorBooks
            });
        } else {
            // If no contributor is found by name don't render any books
            this.setState({
                currentContributorBooks: [],
                contributorLogged: false,
                contributorId: ""
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

    // Delet contributor
    deleteContr=()=>{
        deleteContributor(this.state.contributorId)
        .then(response=>{
            this.setState({
                contributorLogged: false,
                currentContributorBooks: [],
                contributorId: ""
            })
        })
        .catch(error => {
            console.log(error);})
        }


    render() {

        return (
            <div>
                { this.state.contributorLogged
                    ? <button onClick={this.logout}>Logout</button>
                    : <ContributorForm contributorLogin={this.contributorLogin} />
                }
                
                <br/>

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