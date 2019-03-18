import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
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
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />

          <Route path="/channels/:channelID" component={ChannelMsg} />

          <Route path="/create" component={CreateChannel} />
          <Route path="/channels/:channelID/send/" component={MessageForm} />

          <Route path="/(login|signup)" component={RegistrationForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
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
