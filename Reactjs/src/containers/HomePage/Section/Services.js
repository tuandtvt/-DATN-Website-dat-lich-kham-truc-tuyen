import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Services.scss";

class Services extends Component {
  render() {
    return (
      <div className="content-down py-30">
        <div className="options">
          <a href="/list-specialty" className="option-child">
            <div className="icon-child">
              <i className="fas fa-hospital-alt"></i>
            </div>
            <div className="text-child">
              <FormattedMessage id="banner.child1" />
            </div>
          </a>

          <a href="/list-medical-facility" className="option-child">
            <div className="icon-child">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <div className="text-child">
              <FormattedMessage id="banner.child2" />
            </div>
          </a>

          <a href="/list-outstanding-doctor" className="option-child">
            <div className="icon-child">
              <i className="fas fa-procedures"></i>
            </div>
            <div className="text-child">
              <FormattedMessage id="banner.child3" />
            </div>
          </a>

          <a href="/list-package" className="option-child">
            <div className="icon-child">
              <i className="fas fa-flask"></i>
            </div>
            <div className="text-child">
              <FormattedMessage id="banner.child4" />
            </div>
          </a>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
