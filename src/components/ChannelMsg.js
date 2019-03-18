import React, { Component } from "react";

// Components
import MsgRow from "./MsgRow";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";

class ChannelMsg extends Component {
  timer = "";
  componentDidMount() {
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
    let msg = "you have no messages.";
    if (!this.props.user) {
      return null;
    } else {
      console.log("hi");
      if (this.props.channel) {
        msg = this.props.channel.map(msg => <MsgRow key={msg.id} msg={msg} />);
      }
    }
    return <tbody>{msg}</tbody>;
  };
  render() {
    return <table className="msg ml-3">{this.getView()}</table>;
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
