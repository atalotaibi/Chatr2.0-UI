import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// FontAwesome

class ChannelNavLink extends Component {
  render() {
    const { channel } = this.props;
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={channel.name}
      >
        <NavLink className="nav-link" to={`/channels/${channel.id}`}>
          <span
            className=" text-break nav-link-text"
            style={{ overflowX: "hidden" }}
          >
            <img
              src={
                channel.image_url
                  ? channel.image_url
                  : "http://allaboutwindowsphone.com/images/appicons/252288.png"
              }
              className="chat-headAA"
              // alt={channel.name}
            />
            {channel.name.slice(0, 45)}
          </span>
        </NavLink>
      </li>
    );
  }
}

export default ChannelNavLink;
