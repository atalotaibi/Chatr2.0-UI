import React, { Component } from "react";
import { connect } from "react-redux";
class MsgRow extends Component {
  render() {
    const msg = this.props.msg;
    console.log(msg.timestamp);
    console.log(this.props.user);
    if (this.props.user.username === msg.username) {
      return (
        <div class="chat-bubble me">
          <div class="your-mouth-A" />
          <h4>{msg.username}</h4>
          <div class="content5">{msg.message}</div>
          <div class="time">{msg.timestamp.slice(11, 16)}</div>
        </div>
      );
    } else {
      return (
        <div class="chat-bubble you">
          <div class="your-mouth" />
          <h4>{msg.username}</h4>
          <div class="content5">{msg.message}</div>
          <div class="time">{msg.timestamp.slice(11, 16)}</div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(MsgRow);
