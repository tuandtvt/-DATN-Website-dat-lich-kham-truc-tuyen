import React, { Component } from "react";
import { connect } from "react-redux";
import "./Package.scss";
import { FormattedMessage } from "react-intl";
import { getAllPackage } from "../../../services/userService";
import Slider from "react-slick";
import { withRouter } from "react-router";

class Package extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataPackage: [],
    };
  }

  async componentDidMount() {
    let res = await getAllPackage({limit:4});
    if (res && res.errCode === 0) {
      this.setState({
        dataPackage: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailPackage = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-package/${item.id}`);
    }
  };

  handleClickSeeMorePackage = () => {
    this.props.history.push(`/list-package`);
  };

  handleLoadMore=async () => {
    let total=this.state.dataPackage.length+4;
    let res = await getAllPackage({limit:total});
    if (res && res.errCode === 0) {
      this.setState({
        dataPackage: res.data ? res.data : [],
      });
    }
  }


  render() {
    let { dataPackage } = this.state;
    return (
      <div class="row">
        <div class="col-12">
          <div className="section-share section-medical-package">
            <div className="section-container">
              <div className="section-header">
                <span className="title-section">
                  <FormattedMessage id="homepage.medical-package" />
                </span>
                <button
                  className="btn-section"
                  onClick={() => this.handleClickSeeMorePackage()}
                >
                  <FormattedMessage id="homepage.more-infor" />
                </button>
              </div>

              <div class="row">
                {
                  dataPackage &&
                  dataPackage.length > 0 && dataPackage.map((item,index)=>{
                    return (
                      <div class="col-lg-3 col-auto my-10">
                          <div class="card-bs-custom pointer" onClick={() => this.handleViewDetailPackage(item)}>
                            <figure class="bg-cover bg-center" 
                              style={{
                                      backgroundImage: `url(${item.image})`,
                              }}></figure>
                              <div class="card-body">
                                  <h3 class="mb-5 font-weight-normal pointer package-name fs-15" >{item.name}</h3>
                              </div>
                          </div>
                      </div>
                    );
                  })
                }
              </div>
              <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-primary my-15" onClick={() => this.handleLoadMore()}>{this.props.language=="en" ? "Load more" : "Tải thêm"}</button>
              </div>
          
              {/* <div className="section-body">
                <Slider {...this.props.settings}>
                  {dataSpecialty &&
                    dataSpecialty.length > 0 &&
                    dataSpecialty.map((item, index) => {
                      return (
                        <div
                          className="section-customize specialty-child"
                          key={index}
                          onClick={() => this.handleViewDetailSpecialty(item)}
                        >
                          <div
                            className="bg-image section-specialty"
                            style={{
                              backgroundImage: `url(${item.image})`,
                            }}
                          ></div>
                          <div className="specialty-name">{item.name}</div>
                        </div>
                      );
                    })}
                </Slider>
              </div> */}
            </div>
          </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Package)
);
