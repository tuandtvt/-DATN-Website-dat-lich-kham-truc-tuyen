

import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor, saveBulkSchedulePackage } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
      listPackages: [],
      selectedPackage: {}
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
    this.props.fetchAllPackages(); // Fetch gói khám
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  buildDataPackageInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.name}`;
        let labelEn = `${item.name}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }

    if (prevProps.allPackages !== this.props.allPackages) { // Thêm phần này
      let dataSelect = this.buildDataPackageInputSelect(this.props.allPackages);
      this.setState({
        listPackages: dataSelect,
      });
    }
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  handleChangeSelectPackage = async (selectedOption) => {
    this.setState({ selectedPackage: selectedOption });
  };

  handleOnChangeDatePicker = (date) => {
    console.log("handleOnChangeDatePicker")
    this.setState({
      currentDate: date[0],
    });

    let todayDate = moment(moment()._d).format("YYYY/MM/DD");

    // console.log("todayDate",todayDate)
    // console.log("moment(date[0]).format("YYYY/MM/DD)",moment(date[0]).format("YYYY/MM/DD"))

    let rangTimeCopy;
    if(todayDate==moment(date[0]).format("YYYY/MM/DD")){
      //today
        rangTimeCopy = [...this.state.rangeTime];

        let currentHour = moment().format("HH");

        rangTimeCopy = rangTimeCopy.filter((time)=>+time.value>+currentHour)

        this.setState({
          rangeTime: rangTimeCopy,
        });
    }else{
        let data = this.props.allScheduleTime;
        if (data && data.length > 0) {
          data = data.map((item) => ({ ...item, isSelected: false }));
        }
        this.setState({
          rangeTime: data,
        });
    }

  };

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;

        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate, selectedPackage } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error(this.props.language === LANGUAGES.EN ? "Invalid date!" : "Ngày không hợp lệ!");
      return;
    }
    if (_.isEmpty(selectedDoctor) && _.isEmpty(selectedPackage)) {
      toast.error(this.props.language === LANGUAGES.EN ? "Invalid selected doctor or package!" : "Bác sĩ hoặc gói khám chọn không hợp lệ!");
      return;
    }

    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          if (!_.isEmpty(selectedDoctor)) {
            object.doctorId = selectedDoctor.value;
          } else {
            object.packagesId = selectedPackage.value;
          }
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error(this.props.language === LANGUAGES.EN ? "Invalid selected time!" : "Thời gian chọn không hợp lệ!");
        return;
      }
    }

    let res;
    if (!_.isEmpty(selectedDoctor)) {
      res = await saveBulkScheduleDoctor({
        arrSchedule: result,
        doctorId: selectedDoctor.value,
        date: formatedDate,
      });
    } else {
      res = await saveBulkSchedulePackage({
        arrSchedule: result,
        packagesId: selectedPackage.value,
        date: formatedDate,
      });
    }
    
    if (res && res.errCode === 0) {
      toast.success(this.props.language === LANGUAGES.EN ? "Save info succeed!" : "Lưu thông tin thành công!");
    } else {
      toast.error(this.props.language === LANGUAGES.EN ? "Error!" : "Lỗi!");
    }
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title4" />
        </div>
        <div className="container">
          <div className="row">
            {/* <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div> */}
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-package" />
              </label>
              <Select
                value={this.state.selectedPackage}
                onChange={this.handleChangeSelectPackage}
                options={this.state.listPackages}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
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
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
    allPackages: state.admin.allPackages, // Thêm dòng này
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    fetchAllPackages: () => dispatch(actions.fetchAllPackages()), // Thêm dòng này
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
