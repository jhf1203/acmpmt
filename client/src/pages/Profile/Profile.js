import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

function Profile() {
  // Setting our component's initial state
  const [profile, setProfile] = useState([]);
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);

  // Load all profile and store them with setProfile
  useEffect(() => {
    loadProfile();
  }, []);

  // Loads all profile and sets them to profile
  function loadProfile() {
    API.getProfile()
      .then(res => {
        // console.log(res.data.profile);
        setProfile(res.data.profile);
      })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads profile from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadProfile())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload profile from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => {
          formEl.current.reset();
          loadProfile();
        })
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Card title="What Profile Should I Read?">
              <form ref={formEl}>
                <Input
                  onChange={handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="author"
                  placeholder="Author (required)"
                />
                <TextArea
                  onChange={handleInputChange}
                  name="synopsis"
                  placeholder="Synopsis (Optional)"
                />
                <FormBtn
                  disabled={!(formObject.author && formObject.title)}
                  onClick={handleFormSubmit}
                >
                  Submit Book
                </FormBtn>
              </form>
            </Card>
          </Col>
          <Col size="md-6 sm-12">
            <Card title="Profile On My List">
              {profile.length ? (
                <List>
                  {profile.map(book => (
                    <ListItem key={book._id}>
                      <Link to={"/profile/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default Profile;
