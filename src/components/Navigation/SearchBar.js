import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions";

class SearchBar extends Component {
  handleChange = event => {
    this.props.onSearch(event.target.value);
  };
  render() {
    return (
      <div className="card-header">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search..."
            name=""
            onChange={this.handleChange}
            className="form-control search"
          />
          <div className="input-group-prepend">
            <span className="input-group-text search_btn">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearch: query => dispatch(actionCreators.filterChannels(query))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
