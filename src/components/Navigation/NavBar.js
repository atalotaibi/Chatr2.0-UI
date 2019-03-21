import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faPhone,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";

// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";
import ChannelMsg from "../ChannelMsg";

class NavBar extends Component {
  render() {
    return (
      <div class="col-md-4 col-xl-3 chat">
        <SideNav />
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img src="#" className="rounded-circle user_img" />
                  <span className="online_icon" />
                </div>
                <div className="user_info">
                  <span>Chat with Maryam Naz</span>
                  <p>1767 Messages</p>
                </div>
                <div className="video_cam">
                  <span>
                    <FontAwesomeIcon icon={faVideo} />
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                </div>
              </div>
              <span id="action_menu_btn">
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>
              <div className="action_menu">
                <ul>
                  <AuthButton />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      // {/* <AuthButton /> */}
    );
  }
}

export default NavBar;

{
  /* <div className="col-md-8 col-xl-6 chat">
					<div className="card">
						<div className="card-header msg_head">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="#" className="rounded-circle user_img" />
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Chat with Maryam Naz</span>
									<p>1767 Messages</p>
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
						</div> */
}
