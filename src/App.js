import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faPhone,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import AuthButton from "./components/Navigation/AuthButton";
import SideNav from "./components/Navigation/SideNav";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreateChannel from "./components/CreateChannel";
import MessageForm from "./components/MessageForm";
import Welcome from "./components/Welcome";
import ChannelMsg from "./components/ChannelMsg";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import * as actionCreators from "./store/actions";

class App extends Component {
  componentDidMount() {
    main();
    this.props.checkForExpiredToken();
  }

  render() {
    return (
      <div>
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
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
        </div>
        <Switch>
          <Route path="/welcome" component={Welcome} />

          {/* <Route path="/channels/:channelID" component={ChannelMsg} /> */}

          <Route path="/create" component={CreateChannel} />
          <Route path="/channels/:channelID/send/" component={MessageForm} />

          <Route path="/(login|signup)" component={RegistrationForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
