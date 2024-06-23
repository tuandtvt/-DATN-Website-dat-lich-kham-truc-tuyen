import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfilePackage from "../ProfilePackage";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookPackageAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import LoadingOverlay from "react-loading-overlay";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import { withRouter } from "react-router";


class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      packagesId: "",
      genders: "",
      timeType: "",
      isShowLoading: false,
    };
  }

  async componentDidMount() {

    if (this.props.userInfo && this.props.userInfo.email) {
      this.setState({
        email:this.props.userInfo.email
      })
    }

    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.userInfo !== prevProps.userInfo) {
      if(this.props.userInfo && this.props.userInfo.email){
          this.setState({
            email:this.props.userInfo.email
          })
      }
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
  
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let packagesId = this.props.dataTime.packagesId;
        let timeType = this.props.dataTime.timeType;
        // console.log("zzz",packagesId,timeType)
        this.setState({
          packagesId: packagesId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return "";
  };

  handlePackageName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.name}`
          : `${dataTime.name}`;

      return name;
    }
    return "";
  };


  
  handleConfirmBooking = async () => {
    this.setState({ isShowLoading: true });
    let {language}=this.props;

    //validate input
    // !data.email || !data.packagesId || !data.timeType || !data.date
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let packageName = this.handlePackageName(this.props.dataTime);
    console.log(this.props);
    let res = await postPatientBookPackageAppointment({
      patientName: this.state.patientName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      packagesId: this.props.match.params.id,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      packageName: packageName,
    });
    // console.log("xxxx",res.errCode);
    // console.log("yyyy",res);

    if (res && res.errCode === 0) {
      this.setState({ isShowLoading: false });
      if(language==="en"){
        toast.success("Book a new appointment successfully, please check your email for confirmation!");
      }else{
        toast.success("Đặt lịch khám thành công, hãy kiểm tra email của bạn để xác nhận!");
      }
     
      this.props.closeBookingClose();
    } 
    else if(res && res.errCode === 3)
    {
      this.setState({ isShowLoading: false });
        if(language==="en"){
          toast.warn("The number of bookings has been exceeded at this time, please choose another time!");
        }else{
            toast.warn("Đã quá số lượng giới hạn đặt lịch vào thời gian này bạn vui lòng chọn khung thời gian khác!");
        }
    }
    else {
      this.setState({ isShowLoading: false });
      if(language==="en"){
          toast.error("Book a new appointment error!");
      }else{
          toast.error("Đặt lịch không thành công!");
      }
    }
  };
  render() {
    let { isOpenModal, closeBookingClose, dataTime } = this.props;

    let packagesId  = dataTime && !_.isEmpty(dataTime) ? dataTime.packagesId : "";

    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner={<BounceLoader color={"#86e7d4"} size={60} />}
      >
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="lg"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span className="right" onClick={closeBookingClose}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              {/* {JSON.stringify(dataTime)} */}
              <div className="package-infor">
                <ProfilePackage
                  packagesId={packagesId}
                  isShowDescriptionPackage={false}
                  dataTime={dataTime}
                  isShowLinkDetail={false}
                  isShowPrice={true}
                />
              </div>

              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.patientName" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.patientName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "patientName")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.email" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "email")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  />
                </div>
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "reason")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.birthday" />
                  </label>
                  <DatePicker
                    onChange={this.handleOnChangeDatePicker}
                    className="form-control"
                    value={this.state.birthday}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="patient.booking-modal.btnConfirm" />
              </button>
              <button
                className="btn-booking-cancel"
                onClick={closeBookingClose}
              >
                <FormattedMessage id="patient.booking-modal.btnCancel" />
              </button>
            </div>
          </div>
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, genders: state.admin.genders, isLoggedIn: state.user.isLoggedIn, userInfo: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingModal));
