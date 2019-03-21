import React, { Component } from "react";

// Components
import MsgRow from "./MsgRow";

import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import MessageForm from "./MessageForm";
import AuthButton from "./Navigation/AuthButton";

class ChannelMsg extends Component {
  timer = "";
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  componentDidMount() {
    this.scrollToBottom();
    // this.timer = setInterval(
    //   () =>
    this.props.fetchChannelDetail(
      this.props.match.params.channelID,
      this.getLatestTimestamp()
    );
    //   3000
    // );
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
        1000
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
    return msg;
  };
  render() {
    const channelID = this.props.match.params.channelID;
    return (
      <div>
        {/* <div className="card-body msg_card_body"> */}
        <div className="d-flex justify-content-end mb-4">
          {this.getView()}

          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
          <MessageForm channelID={channelID} />
        </div>
        {/* </div> */}
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

{
  /* <div className="col-md-8 col-xl-6 chat">
					<div className="card">
						<div className="card-header msg_head">
							<div className="d-flex bd-highlight">
								<div className="user_info">
									<span>Channel name</span>
								</div>
								<div className="video_cam">
									<span><i className="fas fa-video"></i></span>
									<span><i className="fas fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
							<div className="action_menu">
								<ul>
                <AuthButton />
								</ul>
							</div>
						</div>
						<div className="card-body msg_card_body">
							<div className="d-flex justify-content-start mb-4">
              {this.getView()}
								</div>
                <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
          <MessageForm channelID={channelID} />
							</div> */
}

{
  /* <div className="msg_cotainer">
									Hi, how are you samim?
									<span className="msg_time">8:40 AM, Today</span>
								</div>
							 */
}

{
  /* <div>
        <div classNameName="MessageContainer">
          <div classNameName="MessagesList">
            <table classNameName="msg ml-3">{this.getView()}</table>
          </div>
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
          <MessageForm channelID={channelID} />
        </div>
      </div> */
}
