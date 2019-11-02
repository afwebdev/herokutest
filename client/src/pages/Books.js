import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data, title: "", author: "", synopsis: "" }))
      .catch(err => console.log(err));
  };

  handleInput = data => {
    let { name, value } = data.target;
    this.setState({
      [name]: value
    });
  };

  submitBook = event => {
    event.preventDefault();
    let book = {
      title: this.state.title,
      author: this.state.author,
      synopsis: this.state.synopsis
    };
    API.saveBook(book).then(this.loadBooks());
  };

  deleteOneBook = event => {
    let id = event.target.getAttribute("name");
    API.deleteBook(id).then(this.loadBooks());
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input value={this.state.title} onChange={this.handleInput} name="title" placeholder="Title (required)" />
              <Input
                value={this.state.author}
                onChange={this.handleInput}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInput}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn onClick={this.submitBook}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      <DeleteBtn onClick={this.deleteOneBook} name={book._id} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
