import React, { Component } from "react";

// Components
import MsgRow from "./MsgRow";

import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import MessageForm from "./MessageForm";

class ChannelMsg extends Component {
  timer = "";
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
    this.timer = setInterval(
      () =>
        this.props.fetchChannelDetail(
          this.props.match.params.channelID,
          this.getLatestTimestamp()
        ),
      3000
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("[ChannelMsg.js] componentDidUpdate prevState: ", prevState);
    console.log("[ChannelMsg.js] componentDidUpdate prevProps: ", prevProps);
    let channel = this.props.channel;
    if (channel.length !== prevProps.channel.length) {
      this.scrollToBottom();
    }
    if (
      this.props.match.params.channelID !== prevProps.match.params.channelID
    ) {
      this.scrollToBottom();
      this.props.resetChannel();
      clearInterval(this.timer);
      this.timer = setInterval(
        () =>
          this.props.fetchChannelDetail(
            this.props.match.params.channelID,
            this.getLatestTimestamp()
          ),
        3000
      );
    }
  }

  getLatestTimestamp = () => {
    let channel = this.props.channel;
    if (channel.length) return channel[channel.length - 1].timestamp;
    return "";
  };

  getView = () => {
    let msg = "";
    if (!this.props.user) {
      return null;
    } else {
      if (this.props.channel) {
        msg = this.props.channel.map(msg => <MsgRow key={msg.id} msg={msg} />);
      }
    }
    return <tbody>{msg}</tbody>;
  };
  render() {
    const channelID = this.props.match.params.channelID;
    return (
      <div>
        <div className="MessageContainer text-break">
          <div className="MessagesList">
            <table className="msg ml-3">{this.getView()}</table>
          </div>
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <div className="footer1">
          <MessageForm channelID={channelID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    channel: state.channel.channel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChannelDetail: (channelID, timestamp) =>
      dispatch(actionCreators.fetchChannelDetail(channelID, timestamp)),
    resetChannel: () => dispatch({ type: "RESET_CHANNEL" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMsg);
