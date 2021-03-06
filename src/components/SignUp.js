import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class SignUp extends React.Component {
  state = {
    email: null,
    password: null,
    passwordConfirmation: null,
    validated: false,
    emailInvalid: null,
    passwordInvalid: null,
    pcInvalid: null
  };

  componentDidMount = () => {
    sessionStorage.clear();
  };

  handleSubmit = event => {
    event.preventDefault();

    if (
      this.state.emailInvalid === false &&
      this.state.passwordInvalid === false &&
      this.state.pcInvalid === false
    ) {
      this.props.createUser(this.state);
      this.setState({ email: null });
      this.setState({ password: null });
      this.setState({ passwordConfirmation: null });
    }
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    if (target.name === "email") {
      if (this.validateEmail(target.value)) {
        this.setState({ emailInvalid: false });
      } else {
        this.setState({ emailInvalid: true });
      }
    }
    if (target.name === "password") {
      if (target.value.length < 6) {
        this.setState({ passwordInvalid: true });
      } else {
        this.setState({ passwordInvalid: false });
      }
    }
    if (target.name === "passwordConfirmation") {
      if (target.value.length < 6 || target.value !== this.state.password) {
        this.setState({ pcInvalid: true });
      } else {
        this.setState({ pcInvalid: false });
      }
    }
  };

  render() {
    return (
      <Container style={{ paddingTop: "150px" }}>
        <Row className="justify-content-center">
          <Card style={{ width: "26rem", marginTop: "2em" }}>
            <Card.Body>
              <Form noValidate onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    onChange={this.handleChange}
                    required
                    isInvalid={this.state.emailInvalid}
                  />
                  <Form.Control.Feedback type="invalid">
                    We need a valid email!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="At least 6 characters"
                    onChange={this.handleChange}
                    required
                    isInvalid={this.state.passwordInvalid}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPasswordConfirmation">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Please confirm your password"
                    onChange={this.handleChange}
                    required
                    isInvalid={this.state.pcInvalid}
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    Password confirmation must match
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ background: "#FF5903", border: "none" }}
                >
                  Sign me up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default SignUp;
