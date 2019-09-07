import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Button, Form, FormControl } from "react-bootstrap";

// wait to integrate with harry ;)

class Filter extends React.Component {
  state = {
    keywords: []
  };

  handleChange = event => {
    let value = event.target.value;
    let keyword = value.trim().toLowerCase();
    this.setState({ keywords: [keyword, ...this.state.keywords] }, () => {
      this.props.filterCards(this.state.keywords);
    });
  };

  handleSubmit = event => {};

  render() {
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormControl
            type="text"
            placeholder="Filter by industry or skill"
            className="mr-sm-2"
            onChange={this.handleChange}
          />
          <Button variant="outline-success">+</Button>
        </Form>
      </div>
    );
  }
}

Filter.propTypes = {
  filterCards: PropTypes.func.isRequired
};

export default Filter;
