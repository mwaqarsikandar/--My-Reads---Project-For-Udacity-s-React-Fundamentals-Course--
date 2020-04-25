import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchBook extends Component {
  state = {
    inputVal: ""
  };

  shelfChange(book, f) {
    this.props.onShelfChange(book, f.target.value);
  }
  handleChange = f => {
    const input = f.target.value;
    this.setState({
      inputVal: input
    });
    this.props.onSearch(input);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.inputVal ? (
              this.props.books
                .filter(book => book.hasOwnProperty("imageLinks"))
                .map(book => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            onChange={f => this.shelfChange(book, f)}
                            defaultValue={book.shelf}
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="read">Read</option>
                            <option value="wantToRead">Want to Read</option>

                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))
            ) : (
              <div />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
