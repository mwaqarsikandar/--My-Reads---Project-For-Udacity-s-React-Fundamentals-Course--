import React from "react";
import BookList from "./BookList";
import SearchBook from "./SearchBook";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  };

  toupdateState = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

  componentDidMount() {
    this.toupdateState();
  }
  shelfChange = (book, shelff) => {
    BooksAPI.update(book, shelff).then(book => this.toupdateState());
  };

  BookFind(id) {
    let shel = this.state.books.filter(book => book.id === id);

    return shel.length !== 0 ? shel[0].shelff : "none";
  }

  booksSearch = query => {
    query
      ? BooksAPI.search(query)
          .then(books => {
            if (books.error) {
              this.setState({
                searchBooks: []
              });
              return;
            }
            let newBook = books.map(book => {
              book.shelff = this.BookFind(book.id);
              return book;
            });
            this.setState({ searchBooks: newBook });
          })
          .catch(e => {
            console.log("Error");
          })
      : this.setState({
          searchBooks: []
        });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              books={this.state.books}
              onShelfChange={this.shelfChange}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBook
              books={this.state.searchBooks}
              onSearch={this.booksSearch}
              onShelfChange={this.shelfChange}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
