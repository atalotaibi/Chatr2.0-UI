import React, { Component } from "react";

class MsgRow extends Component {
  render() {
    const msg = this.props.msg;
    return (
      <div class="d-flex justify-content-end mb-4">
        <div class="msg_cotainer_send">
          {msg.username}
          {msg.message}
          <span class="msg_time_send">9:10 AM, Today</span>
        </div>
        <div class="img_cont_msg">
          <img src="#" class="rounded-circle user_img_msg" />
        </div>
      </div>
    );
  }
}

export default MsgRow;
