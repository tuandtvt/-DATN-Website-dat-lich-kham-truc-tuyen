import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Services from "./Section/Services";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Love from "./Section/Love";
import Package from "./Section/Package";

class HomePage extends Component {
  render() {
    console.log("this.props.userInfo", this.props.userInfo);
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        {/* <Services /> */}
        <Specialty settings={settings} />
        <OutStandingDoctor settings={settings} />
        <Package settings={settings} />
        {/* <MedicalFacility settings={settings} /> */}
        {/* <HandBook settings={settings} /> */}
        {/* <About /> */}
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
