import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

import MenuHomeHeader from "./MenuHomeHeader";
import HomeMenuSearchSpecialty from "./HomeMenuSearchSpecialty";
import HomeMenuSearchDoctor from "./HomeMenuSearchDoctor";
import { emitter } from "../../utils/emitter";
import { Alert } from "reactstrap";
import { useRoutes } from "react-router-domv6";
import { Link } from 'react-router-dom';

class HomeHeader extends Component {
  constructor() {
    super();

    this.state = {
      showMenuSearchSpecialty: false,
      previewImgURL:[]
    };
  }

  componentDidMount() {
    let imageBase64 = "";
    if (this.props && this.props.userInfo && this.props.userInfo.image) {
      imageBase64 = new Buffer(this.props.userInfo.image, "base64").toString("binary");
    }

    this.setState({
      previewImgURL: imageBase64,
    });
  }

  handleClickShowHomeMenuSearchSpecialty = () => {
    this.setState({
      showMenuSearchSpecialty: !this.state.showMenuSearchSpecialty,
    });
  };

  handleClickShowHomeMenuSearchDoctor = () => {
    this.setState({
      showMenuSearchDoctor: !this.state.showMenuSearchDoctor,
    });
  };

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfo !== this.props.userInfo) {
      let imageBase64 = "";
      if (this.props.userInfo.image) {
        imageBase64 = new Buffer(this.props.userInfo.image, "base64").toString("binary");
      }

      this.setState({
        previewImgURL: imageBase64,
      });
    }
  }

  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div
                className="header-logo"
                onClick={() => {
                  this.returnToHome();
                }}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <a href="/list-specialty">
                      <FormattedMessage id="homeheader.speciality" />
                    </a>
                  </b>
                </div>
                <div className="subs-title">
                  <a href="/list-specialty">
                    <FormattedMessage id="homeheader.searchdoctor" />
                  </a>
                </div>
              </div>

              <div className="child-content">
                <div>
                  <b>
                    <a href="/list-medical-facility">
                      <FormattedMessage id="homeheader.health-facility" />
                    </a>
                  </b>
                </div>
                <div className="subs-title">
                  <a href="/list-medical-facility">
                    <FormattedMessage id="homeheader.select-room" />
                  </a>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <a href="/list-oustanding-doctor">
                      <FormattedMessage id="homeheader.doctor" />
                    </a>
                  </b>
                </div>
                <div className="subs-title">
                  <a href="/list-oustanding-doctor">
                    <FormattedMessage id="homeheader.select-doctor" />
                  </a>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <a href="/list-package">
                      <FormattedMessage id="homeheader.fee" />
                    </a>
                  </b>
                </div>
                <div className="subs-title">
                  <a href="/list-package">
                    <FormattedMessage id="homeheader.check-health" />
                  </a>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
              <div
                className="avatar-profile mx-10"
                style={{
                  backgroundImage: `url(${this.state.previewImgURL ? this.state.previewImgURL : ""})`,
                }}
              ></div>
              <div className="menu-home-header">
                <MenuHomeHeader />
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up position-relative">
              <div className="position-absolute banner-text">
                <div className="title1">
                  <FormattedMessage id="banner.title1" />
                </div>
                {/* <div className="title2">
                  <FormattedMessage id="banner.title2" />
                </div> */}
              </div>
              <div
                className="search"
                onClick={() => this.handleClickShowHomeMenuSearchSpecialty()}
              >
                <i className="fas fa-search"></i>
                <FormattedMessage id="banner.search">
                  {(placeholder) => (
                    <input type="text" placeholder={placeholder} />
                  )}
                </FormattedMessage>
                {this.state.showMenuSearchSpecialty && (
                  <HomeMenuSearchSpecialty
                    showMenuSearchSpecialty={this.state.showMenuSearchSpecialty}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
