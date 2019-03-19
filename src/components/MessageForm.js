import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../store/actions";

class MessageForm extends Component {
  state = {
    name: "",
    message: "",
    timestamp: ""
    // channel: ""
  };
  textChangeHandler = e => this.setState({ [e.target.name]: e.target.value });
  submitMessage = event => {
    event.preventDefault();
    this.props.postMessage(this.state, this.props.channelID);
    this.setState({
      message: ""
    });
  };

  render() {
    // const errors = this.props.errors;
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitMessage}>
          {/* {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )} */}
          <div className="input-group mb-3">
            {/* <div className="input-group-prepend">
              <span className="input-group-text">message</span>
            </div> */}
            <input
              type="text"
              className="form-control"
              name="message"
              value={this.state.message}
              onChange={this.textChangeHandler}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // errors: state.rootErrors.errors,
    channel: state.channel.channel
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postMessage: (message, channelID) =>
      dispatch(actionCreators.postMessage(message, channelID))
    // setErrors: () => dispatch(actionCreators.setErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
