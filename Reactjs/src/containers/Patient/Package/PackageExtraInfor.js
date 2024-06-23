import React, { Component } from "react";
import { connect } from "react-redux";
import "./PackageExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { getExtraInforPackageById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class PackageExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.packageIdFromParent) {
      let res = await getExtraInforPackageById(this.props.packageIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {}
    if (this.props.packageIdFromParent !== prevProps.packageIdFromParent) {
      let res = await getExtraInforPackageById(this.props.packageIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;

    return (
      <div className="package-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-package.text-address" />
          </div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
              <FormattedMessage id="patient.extra-infor-package.price" />
              {extraInfor &&
                extraInfor.pricePackageTypeData &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    className="currency"
                    value={extraInfor.pricePackageTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                )}
              {extraInfor &&
                extraInfor.pricePackageTypeData &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    className="currency"
                    value={extraInfor.pricePackageTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )}
              <span
                className="detail"
                onClick={() => this.showHideDetailInfor(true)}
              >
                <FormattedMessage id="patient.extra-infor-package.detail" />
              </span>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-infor-package.price" />
              </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-infor-package.price" />
                  </span>
                  <span className="right">
                    {extraInfor &&
                      extraInfor.pricePackageTypeData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          className="currency"
                          value={extraInfor.pricePackageTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      )}
                    {extraInfor &&
                      extraInfor.pricePackageTypeData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          className="currency"
                          value={extraInfor.pricePackageTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.extra-infor-package.payment" />
                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.VI
                  ? extraInfor.paymentTypeData.valueVi
                  : ""}
                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.EN
                  ? extraInfor.paymentTypeData.valueEn
                  : ""}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  <FormattedMessage id="patient.extra-infor-package.hide-price" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageExtraInfor);
