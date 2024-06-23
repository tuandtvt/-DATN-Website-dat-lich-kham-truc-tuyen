import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailPackage.scss";
import { getDetailInforPackage } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import PackageSchedule from "./PackageSchedule";
import PackageExtraInfor from "./PackageExtraInfor";

class DetailPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailPackage: {},
      currentPackageId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentPackageId: id,
      });
      let res = await getDetailInforPackage(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailPackage: res.data[0],
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { detailPackage } = this.state;
    let { language } = this.props;
    let name = "";
    if (detailPackage) {
      name = detailPackage.name;
    }
    console.log(detailPackage)
    console.log(detailPackage.image)
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="package-detail-container">
          <div className="intro-package">
            <div
              className="content-left"
              // style={{
              //   backgroundImage: `url(${
              //     detailPackage && detailPackage.image ? detailPackage.image : ""
              //   })`,
              // }}
              style={{
                backgroundImage: `url(${
                  detailPackage && detailPackage.image ? detailPackage.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">{name}</div>
              {/* <div className="down">
                {detailPackage &&
                  detailPackage.descriptionMarkdown && (
                    <span>{detailPackage.descriptionMarkdown}</span>
                  )}
              </div> */}
            </div>
          </div>
          <div className="schedule-package">
            <div className="content-left">
              <PackageSchedule packageIdFromParent={this.state.currentPackageId} />
            </div>
            <div className="content-right">
              <PackageExtraInfor packageIdFromParent={this.state.currentPackageId} />
            </div>
          </div>
          <div className="detail-infor-package">
            {detailPackage &&
              detailPackage.descriptionHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailPackage.descriptionHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-package"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPackage);
