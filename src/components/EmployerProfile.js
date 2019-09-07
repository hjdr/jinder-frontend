import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Img from "react-fix-image-orientation";
import { Redirect } from "react-router-dom";

class EmployerProfile extends React.Component {
  state = {
    // for routing
    fireRedirect: false,

    //for profile details
    firstName: null,
    surname: null,
    bio: null,
    companyUrl: null,

    // for image upload

    images: []
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createEmployerProfile(this.state);
    this.setState({ firstName: null });
    this.setState({ surname: null });
    this.setState({ bio: null });
    this.setState({ companyUrl: null });
    this.setState({ images: [] });
    this.setState({ fireRedirect: true });
  };

  handleFieldChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  // Image Upload functions

  renderUploadImagesButton = () => {
    return (
      <Form.Control
        name="images"
        type="file"
        ref={field => (this.ImagesField = field)}
        multiple={true}
        accept="image/*"
        onChange={e => this.handleImagesChange(e)}
      ></Form.Control>
    );
  };

  renderSelectedImagesFiles = () => {
    let fileDOMs = this.state.images.map((el, index) => {
      if (el._destroy) {
        // we use _destroy to mark the removed photo
        return null;
      }

      return (
        <li key={index}>
          <div className="photo">
            <Img
              width={150}
              src={el.id ? el.url : URL.createObjectURL(el)}
              style={{ alignSelf: "center" }}
            />
          </div>
          <div className="file-name">{el.name}</div>
        </li>
      );
    });

    return <ul className="selected-images">{fileDOMs}</ul>;
  };

  handleImagesChange() {
    let files = this.ImagesField.files;
    let { images } = this.state;
    for (let i = 0; i < files.length; i++) {
      images.push(files.item(i));
    }

    this.setState({ images: images });
  }

  render() {
    const { fireRedirect } = this.state;

    return (
      <div>
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
              onChange={this.handleFieldChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicSurname">
            <Form.Label>Surname:</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              placeholder="Enter your surname"
              onChange={this.handleFieldChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicBio">
            <Form.Label>Company Bio:</Form.Label>
            <Form.Control
              type="text"
              name="bio"
              placeholder="Enter your company bio"
              onChange={this.handleFieldChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCompanyUrl">
            <Form.Label>Company Website:</Form.Label>
            <Form.Control
              type="text"
              name="companyUrl"
              placeholder="Enter your company website url"
              onChange={this.handleFieldChange}
            />
          </Form.Group>

          <Form.Group controlId="formImages">
            <Form.Label>Upload images:</Form.Label>
            {this.renderUploadImagesButton()}
            {this.renderSelectedImagesFiles()}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {fireRedirect && <Redirect to="/candidate-profiles" />}
      </div>
    );
  }
}

EmployerProfile.propTypes = {
  createEmployerProfile: PropTypes.func.isRequired
};

const welcomeMessage = {
  color: "#FF5903",
  textAlign: "center",
  padding: "10px"
};

export default EmployerProfile;