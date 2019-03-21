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
        <div>
          <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <div style={{ overflowY: "scroll" }}>
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
              >
                <Link to="/create" className="nav-link heading">
                  <span className="nav-link-text ">Channels</span>
                  <FontAwesomeIcon icon={faPlusCircle} />
                  <SearchBar style={{ overflowY: "fixed" }} />
                  {channelLinks}
                </Link>
              </li>
            </div>
          </ul>
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
