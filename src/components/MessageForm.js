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
    // event.preventDefault();
    if (event.key === "Enter") {
      this.props.postMessage(this.state, this.props.channelID);
      this.setState({
        message: ""
      });
    }
  };

  render() {
    // const errors = this.props.errors;
    return (
      <div className="wrap-message">
        <div className="message">
          <input
            placeholder="Enter Your Masseage"
            className="form-control"
            name="message"
            value={this.state.message}
            onChange={this.textChangeHandler}
            onKeyPress={this.submitMessage}
          />
        </div>
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
