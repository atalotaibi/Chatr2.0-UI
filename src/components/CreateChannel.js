import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class CreateChannel extends Component {
  state = {
    name: "",
    imageUrl: ""
  };

  textChangeHandler = e => this.setState({ [e.target.name]: e.target.value });
  //   componentWillUnmount() {
  //     if (this.props.errors.length) this.props.resetErrors();
  //   }

  submitAuthor = event => {
    event.preventDefault();
    this.props.postChannel(this.state);
  };

  render() {
    // const errors = this.props.errors;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitAuthor}>
          {/* {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )} */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Channel's name: </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.textChangeHandler}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.textChangeHandler}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     errors: state.rootErrors.errors
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    postChannel: newChannel => dispatch(actionCreators.postChannel(newChannel))
    // setErrors: () => dispatch(actionCreators.setErrors())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateChannel);
