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
  componentDidUpdate(prevProps) {
    this.scrollToBottom();
    if (
      this.props.match.params.channelID !== prevProps.match.params.channelID
    ) {
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
    // if (!this.props.user) {
    //   return null;
    // } else {
    //   if (this.props.channel) {
    //     this.props.channel.forEach(msg => {
    //       if (!!channel.lengh) {
    //         this.setState({ timestamp: msg.timestamp });
    //       }
    //     });
    //   }
    // }
  };
  getView = () => {
    let msg = "";
    if (!this.props.user) {
      return null;
    } else {
      if (this.props.channel) {
        console.log(this.props.channel.length);
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
    fetchChannelDetail: (channelID, timestamp) =>
      dispatch(actionCreators.fetchChannelDetail(channelID, timestamp))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMsg);
