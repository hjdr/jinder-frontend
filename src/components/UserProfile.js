import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Card, Row, Container, Col } from "react-bootstrap";
import Select from "react-select";
// import Img from "react-fix-image-orientation";
import { industryOptions } from "../data/IndustryData";
import { skillsOptions } from "../data/SkillsData";
import { Redirect } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import background from "../style/images/beaver.jpeg";

class UserProfile extends React.Component {
  state = {
    // for routing
    fireRedirect: false,

    //for profile details
    firstName: null,
    surname: null,
    industry: null,
    skills: null,
    bio: null,

    // for image upload

    images: []
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createProfile(this.state);
    this.setState({ firstName: null });
    this.setState({ surname: null });
    this.setState({ industry: null });
    this.setState({ skills: null });
    this.setState({ bio: null });
    this.setState({ images: [] });
    this.setState({ fireRedirect: true });
  };

  handleNameChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleIndustryChange = event => {
    this.setState({ industry: event.value });
  };

  handleSkillsChange = event => {
    const skills = [];
    event.forEach(skill => {
      skills.push(skill.value);
    });
    this.setState({ skills: skills.join() });
  };

  handleBioChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  updateImages = images => {
    this.setState({ images: images });
  };

  updateImageCheckStatus = status => {
    this.setState({ imageNeedsChecking: status });
  };

  clearPhotos = () => {
    sessionStorage.setItem("user_first_name", this.state.firstName);
    sessionStorage.setItem("user_surname", this.state.surname);
    sessionStorage.setItem("user_industry", this.state.industry);
    sessionStorage.setItem("user_bio", this.state.bio);
    sessionStorage.setItem("user_skills", this.state.skills);

    window.location.reload();
  };

  render() {
    const { fireRedirect } = this.state;
    if(sessionStorage.getItem('user_id') === null) {
      console.log(sessionStorage.getItem('user_id'))
      return (
        <div style={containerPrimary}>
          <Container>
            <Row style={RowStyle}>
              <Col style={colStyle}>
                <Card style={cardStyle}>
                  <Card.Header style={cardHeaderStyle} as="h5">
                    Hey, slow down eager beaver!
                  </Card.Header>
                  <Card.Body>
                    <Card.Text style={cardFontStyle}>
                    You must log in before you can start creating your beautiful profile
                    </Card.Text>
                    <Button style={buttonStyle} href="candidate-sign-up">
                      Sign Up
                    </Button>
                    <br></br>
                  </Card.Body>
                  <Card.Footer style={footerStyle}>
                    <Card.Link style={linkStyle} href="/login">
                      Got an account? Sign in here
                    </Card.Link>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      ) } else {
        console.log(sessionStorage.getItem('user_id'))
    return (
      <Container>
        <Row className="justify-content-center">
          <Card style={{ width: "26rem", marginTop: "2em" }}>
            <Card.Body>
              <p style={welcomeMessage}>
                Hey hot stuff. Start courting the market right away by filling in your
                details below...
              </p>

              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    onChange={this.handleNameChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                  <Form.Label>Surname:</Form.Label>
                  <Form.Control
                    type="text"
                    name="surname"
                    placeholder="Enter your surname"
                    onChange={this.handleNameChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicSkills">
                  <Form.Label>Industry:</Form.Label>
                  <React.Fragment>
                    <Select
                      isSingle
                      options={industryOptions}
                      className="basic-single-select"
                      classNamePrefix="select"
                      name="industry"
                      onChange={this.handleIndustryChange}
                      placeholder="Enter your industry"
                    />
                  </React.Fragment>
                </Form.Group>

                <Form.Group controlId="formBasicSkills">
                  <Form.Label>Job Skills:</Form.Label>
                  <Select
                    isMulti
                    name="skills"
                    options={skillsOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={this.handleSkillsChange}
                    placeholder="Enter your skills"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicBio">
                  <Form.Label>Bio:</Form.Label>
                  <Form.Control
                    type="text"
                    name="bio"
                    placeholder="Tell us something about yourself"
                    onChange={this.handleBioChange}
                  />
                </Form.Group>

                <ImageUpload
                  updateImages={this.updateImages}
                  updateImageCheckStatus={this.updateImageCheckStatus}
                  clearPhotos={this.clearPhotos}
                  images={this.state.images}
                ></ImageUpload>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>

              {fireRedirect && <Redirect to="/employer-profiles" />}
              
            </Card.Body>
          </Card>
        </Row>
      </Container>
    )};
  }
}

UserProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

const welcomeMessage = {
  color: "#FF5903",
  textAlign: "center",
  padding: "10px"
};

const containerPrimary = {
  backgroundImage: `url(${background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "800px",
  position: "center"
};

const RowStyle = {
  height: "700px"
};

const cardStyle = {
  width: "18rem",
  textAlign: "center",
  border: "none",
  margin: "auto",
  marginTop: "100px",
  backgroundColor: "#FFFFFF99"
};

const cardHeaderStyle = {
  background: "#FF5903",
  color: "#fff"
};

const buttonStyle = {
  background: "#FF5903",
  border: "none",
  marginBottom: "10px"
};

const linkStyle = {
  fontSize: 13
};

const colStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
};

const footerStyle = {
  backgroundColor: "#C0C0C0"
};

const cardFontStyle = {
  fontWeight: "bold"
};


export default UserProfile;
