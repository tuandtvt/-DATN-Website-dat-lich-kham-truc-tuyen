import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import localization from "moment/locale/vi";
import "./PackageSchedule.scss";
import { LANGUAGES } from "../../../utils";
import { getSchedulePackageByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
import { withRouter } from "react-router";

class PackageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
      today: ""
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    if (this.props.packageIdFromParent) {
      let res = await getSchedulePackageByDate(
        this.props.packageIdFromParent,
        allDays[0].value
      );
      let copy_allAvailableTime = [];
      let currentHour = moment().format("HH");
      if (res && res.data) {
        let copyRes = [...res.data];
        copy_allAvailableTime = copyRes.filter((element) => element.timeTypeData.value > currentHour);
        this.setState({
          allAvailableTime: copy_allAvailableTime ? copy_allAvailableTime : [],
        });
      }
      this.setState({
        today: allDays[0].value,
      });
    }
    if (allDays && allDays.length > 0) {
      this.setState({
        allDays: allDays,
      });
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, "days").locale("en").format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.packageIdFromParent !== prevProps.packageIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getSchedulePackageByDate(
        this.props.packageIdFromParent,
        allDays[0].value
      );
      let copy_allAvailableTime = [];
      let currentHour = moment().format("HH");
      if (res && res.data) {
        let copyRes = [...res.data];
        copy_allAvailableTime = copyRes.filter((element) => element.timeTypeData.value > currentHour);
        this.setState({
          allAvailableTime: copy_allAvailableTime ? copy_allAvailableTime : [],
        });
      }
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.packageIdFromParent && this.props.packageIdFromParent !== -1) {
      let packageId = this.props.packageIdFromParent;
      let date = event.target.value;
      let res = await getSchedulePackageByDate(packageId, date);
      if (res && res.errCode === 0) {
        let copy_allAvailableTime = [];
        let currentHour = moment().format("HH");
        if (res && res.data && date && currentHour) {
          if (date === this.state.today) {
            copy_allAvailableTime = [...res.data].filter((element) => element.timeTypeData.value > currentHour);
            if (copy_allAvailableTime) {
              this.setState({
                allAvailableTime: copy_allAvailableTime ? copy_allAvailableTime : [],
              });
            }
          } else {
            this.setState({
              allAvailableTime: res.data ? res.data : [],
            });
          }
        }
      }
    }
  };

  handleClickScheduleTime = (time) => {
    if (!this.props.isLoggedIn) this.props.history.push("/login");
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeBookingClose = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="package-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-availabel-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  &nbsp;
                  <FormattedMessage id="patient.detail-package.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          key={index}
                          className={
                            language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                          }
                          onClick={() => this.handleClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="patient.detail-package.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="patient.detail-package.book-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-package.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, isLoggedIn: state.user.isLoggedIn };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PackageSchedule));
