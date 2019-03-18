import React, { Component } from "react";

class MsgRow extends Component {
  render() {
    const msg = this.props.msg;
    return (
      <tr>
        <td>{msg.username}</td>
        <td>{msg.message}</td>
      </tr>
    );
  }
}

export default MsgRow;
