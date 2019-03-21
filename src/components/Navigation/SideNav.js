import React from "react";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import SearchBar from "./SearchBar";

class SideNav extends React.Component {
  state = { collapsed: false };
  componentDidMount() {
    if (this.props.user) {
      this.props.fetchChannels();
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.user !== this.props.user) {
      if (this.props.user) {
        this.props.fetchChannels();
      }
    }
  }
  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    if (!this.props.user) {
      return null;
    } else {
      return (
        <div class="card mb-sm-3 mb-md-0 contacts_card">
          <div class="col-md-4 col-xl-3 chat">
            <SearchBar />
            <div className="card-body contacts_body">
              <ul className="contacts">
                <li className="active">
                  <Link to="/create" className="nav-link heading">
                    <span className="nav-link-text ">Channels</span>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Link>
                  <div className="d-flex bd-highlight">
                    {/* <div className="img_cont"> */}
                    {/* <img src="#" className="rounded-circle user_img" /> 
                       <span className="online_icon" />
                    </div> */}
                    <div className="user_info">{channelLinks}</div>
                  </div>
                </li>
              </ul>
            </div>
            {/* <div className="card-footer" /> */}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    channels: state.channels.filteredChannels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);

{
  /* <div className="card-body contacts_body">
						<ul className="contacts">
						<li className="active">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="#" className="rounded-circle user_img">
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Maryam Naz</span>
									<p>Maryam is online</p>
								</div>
							</div>
						</li>
						
						</ul>
					</div>
					 */
}
