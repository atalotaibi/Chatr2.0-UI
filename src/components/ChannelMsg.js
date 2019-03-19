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
    setTimeout(
      () => this.props.fetchChannelDetail(this.props.match.params.channelID),
      3000
    );
    this.timer = setInterval(
      () => this.props.fetchChannelDetail(this.props.match.params.channelID),
      3000
    );
  }
  componentDidUpdate(prevProps) {
    this.scrollToBottom();
    if (
      this.props.match.params.channelID !== prevProps.match.params.channelID
    ) {
      clearInterval(this.timer);
      this.timer = setInterval(
        () => this.props.fetchChannelDetail(this.props.match.params.channelID),
        3000
      );
    }
  }
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
        <div className="MessageContainer">
          <div className="MessagesList">
            <table className="msg ml-3">{this.getView()}</table>
          </div>
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
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
    fetchChannelDetail: channelID =>
      dispatch(actionCreators.fetchChannelDetail(channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMsg);
