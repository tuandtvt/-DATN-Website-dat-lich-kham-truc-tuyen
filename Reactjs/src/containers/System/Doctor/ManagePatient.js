// // // // import React, { Component } from "react";
// // // // import { connect } from "react-redux";
// // // // import { FormattedMessage } from "react-intl";
// // // // import "./ManagePatient.scss";
// // // // import DatePicker from "../../../components/Input/DatePicker";
// // // // import {
// // // //   cancelBooking,
// // // //   getAllPatientForDoctor,
// // // //   confirmBooking,
// // // // } from "../../../services/userService";
// // // // import moment from "moment";
// // // // import { LANGUAGES } from "../../../utils";
// // // // import { toast } from "react-toastify";
// // // // import LoadingOverlay from "react-loading-overlay";
// // // // import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// // // // import { withRouter } from '../../../utils/withRouter';  //navigate

// // // // class ManagePatient extends Component {
// // // //   constructor(props) {
// // // //     super(props);
// // // //     this.state = {
// // // //       currentDate: moment(new Date()).startOf("day").valueOf(),
// // // //       dataPatient: [],
// // // //       isShowLoading: false,
// // // //       status: {}  // Thêm trạng thái để lưu trữ trạng thái của từng bệnh nhân
// // // //     };
// // // //   }

// // // //   async componentDidMount() {
// // // //     await this.getDataPatient();
// // // //   }

// // // //   getDataPatient = async () => {
// // // //     let { user } = this.props;
// // // //     let { currentDate } = this.state;
// // // //     let formatedDate = new Date(currentDate).getTime();
// // // //     if (user && user.id) {
// // // //       let res = await getAllPatientForDoctor({
// // // //         doctorId: user.id,
// // // //         date: formatedDate,
// // // //       });
// // // //       if (res && res.errCode === 0) {
// // // //         let status = {};
// // // //         res.data.forEach(patient => {
// // // //           status[patient.id] = patient.statusId === "S2" ? "confirmed" : patient.statusId === "S3" ? "cancelled" : "";
// // // //         });
// // // //         this.setState({
// // // //           dataPatient: res.data,
// // // //           status: status
// // // //         });
// // // //       }
// // // //     }
// // // //   };

// // // //   async componentDidUpdate(prevProps, prevState, snapshot) {
// // // //     if (this.props.language !== prevProps.language) {}
// // // //     if (this.props.user !== prevProps.user) {
// // // //       await this.getDataPatient();
// // // //     }
// // // //   }

// // // //   handleOnChangeDatePicker = (date) => {
// // // //     this.setState(
// // // //       {
// // // //         currentDate: date[0],
// // // //       },
// // // //       async () => {
// // // //         await this.getDataPatient();
// // // //       }
// // // //     );
// // // //   };

// // // //   handleBtnConfirm = async (item) => {
// // // //     let res = await confirmBooking(item);
// // // //     if (res && res.errCode === 0) {
// // // //       toast.success(this.props.language === "en" ? "Confirm appointment succeed!" : "Xác nhận cuộc hẹn thành công!");
// // // //       this.setState((prevState) => ({
// // // //         status: {
// // // //           ...prevState.status,
// // // //           [item.id]: "confirmed"
// // // //         }
// // // //       }));
// // // //     } else {
// // // //       toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
// // // //     }
// // // //   };

// // // //   handleBtnCancel = async (item) => {
// // // //     let res = await cancelBooking({
// // // //       doctorId: item.doctorId,
// // // //       patientId: item.patientId,
// // // //       timeType: item.timeType,
// // // //       date: item.date,
// // // //       statusId: item.statusId,
// // // //     });
// // // //     if (res && res.errCode === 0) {
// // // //       toast.success(this.props.language === "en" ? "Cancel appointment succeed!" : "Hủy cuộc hẹn thành công!");
// // // //       this.setState((prevState) => ({
// // // //         status: {
// // // //           ...prevState.status,
// // // //           [item.id]: "cancelled"
// // // //         }
// // // //       }));
// // // //     } else {
// // // //       toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
// // // //     }
// // // //   };

// // // //   render() {
// // // //     let { dataPatient, status } = this.state;
// // // //     let { language } = this.props;

// // // //     return (
// // // //       <>
// // // //         <LoadingOverlay
// // // //           active={this.state.isShowLoading}
// // // //           spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
// // // //         >
// // // //           <div className="manage-patient-container">
// // // //             <div className="m-p-title font-weight-bold"><FormattedMessage id={"manage-patient.title"} /> </div>
// // // //             <div className="manage-patient-body row">
// // // //               <div className="col-4 form-group">
// // // //                 <label><FormattedMessage id={"manage-patient.choose-date"} /></label>
// // // //                 <DatePicker
// // // //                   onChange={this.handleOnChangeDatePicker}
// // // //                   className="form-control"
// // // //                   value={this.state.currentDate}
// // // //                 />
// // // //               </div>
// // // //               <div className="col-12 table-manage-patient">
// // // //                 <table>
// // // //                   <tbody>
// // // //                     <tr>
// // // //                       <th>#</th>
// // // //                       <th><FormattedMessage id={"manage-patient.examination-time"} /></th>
// // // //                       <th><FormattedMessage id={"manage-patient.patient-name"} /></th>
// // // //                       <th><FormattedMessage id={"manage-patient.address"} /></th>
// // // //                       <th><FormattedMessage id={"manage-patient.phone-number"} /></th>
// // // //                       <th><FormattedMessage id={"manage-patient.gender"} /></th>
// // // //                       <th><FormattedMessage id={"manage-patient.reason"} /></th>
// // // //                       <th><FormattedMessage id={"manage-patient.actions"} /></th>
// // // //                       <th><FormattedMessage id={"manage-patient.status"} /></th>
// // // //                     </tr>
// // // //                     {dataPatient && dataPatient.length > 0 ? (
// // // //                       dataPatient.map((item, index) => {
// // // //                         let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
// // // //                         let gender = language === LANGUAGES.VI ? (item.patientGender === "M" ? "Nam" : "Nữ") : (item.patientGender === "M" ? "Male" : "Female");
// // // //                         return (
// // // //                           <tr key={index}>
// // // //                             <td>{index + 1}</td>
// // // //                             <td>{time}</td>
// // // //                             <td>{item.patientName}</td>
// // // //                             <td>{item.patientAddress}</td>
// // // //                             <td>{item.patientPhoneNumber ? item.patientPhoneNumber : ""}</td>
// // // //                             <td>{gender}</td>
// // // //                             <td>{item.patientReason}</td>
// // // //                             <td>
// // // //                               <button
// // // //                                 className="btn btn-primary"
// // // //                                 onClick={() => this.handleBtnConfirm(item)}
// // // //                               >
// // // //                                 <FormattedMessage id={"manage-patient.send-prescriptions"} />
// // // //                               </button>
// // // //                               <button
// // // //                                 className="btn btn-danger"
// // // //                                 onClick={() => this.handleBtnCancel(item)}
// // // //                               >
// // // //                                 <FormattedMessage id={"manage-patient.cancel"} />
// // // //                               </button>
// // // //                             </td>
// // // //                             <td>
// // // //                               <div className="status-box">
// // // //                                 {status[item.id] === "confirmed" ? "✔" : status[item.id] === "cancelled" ? "○" : ""}
// // // //                               </div>
// // // //                             </td>
// // // //                           </tr>
// // // //                         );
// // // //                       })
// // // //                     ) : (
// // // //                       <tr>
// // // //                         <td colSpan="9" style={{ textAlign: "center" }}>
// // // //                           {language === LANGUAGES.VI ? "Không có bệnh nhân đặt lịch vào ngày này" : "No patients booked for this date"}
// // // //                         </td>
// // // //                       </tr>
// // // //                     )}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </LoadingOverlay>
// // // //       </>
// // // //     );
// // // //   }
// // // // }

// // // // const mapStateToProps = (state) => {
// // // //   return { language: state.app.language, user: state.user.userInfo };
// // // // };

// // // // const mapDispatchToProps = (dispatch) => {
// // // //   return {};
// // // // };

// // // // export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));


// // // import React, { Component } from "react";
// // // import { connect } from "react-redux";
// // // import { FormattedMessage } from "react-intl";
// // // import "./ManagePatient.scss";
// // // import DatePicker from "../../../components/Input/DatePicker";
// // // import {
// // //   cancelBooking,
// // //   getAllPatientForDoctor,
// // //   confirmBooking,
// // // } from "../../../services/userService";
// // // import moment from "moment";
// // // import { LANGUAGES } from "../../../utils";
// // // import { toast } from "react-toastify";
// // // import LoadingOverlay from "react-loading-overlay";
// // // import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// // // import { withRouter } from '../../../utils/withRouter';

// // // class ManagePatient extends Component {
// // //   constructor(props) {
// // //     super(props);
// // //     this.state = {
// // //       currentDate: moment(new Date()).startOf("day").valueOf(),
// // //       dataPatient: [],
// // //       isShowLoading: false,
// // //       status: {}
// // //     };
// // //   }

// // //   async componentDidMount() {
// // //     await this.getDataPatient();
// // //   }

// // //   getDataPatient = async () => {
// // //     let { user } = this.props;
// // //     let { currentDate } = this.state;
// // //     let formatedDate = new Date(currentDate).getTime();
// // //     if (user && user.id) {
// // //       let res = await getAllPatientForDoctor({
// // //         doctorId: user.id,
// // //         date: formatedDate,
// // //       });
// // //       if (res && res.errCode === 0) {
// // //         let status = {};
// // //         res.data.forEach(patient => {
// // //           let localStatus = localStorage.getItem(`patientStatus-${patient.id}`);
// // //           status[patient.id] = localStatus ? localStatus : (patient.statusId === "S2" ? "confirmed" : patient.statusId === "S3" ? "cancelled" : "");
// // //         });
// // //         this.setState({
// // //           dataPatient: res.data,
// // //           status: status
// // //         });
// // //       }
// // //     }
// // //   };

// // //   async componentDidUpdate(prevProps, prevState, snapshot) {
// // //     if (this.props.language !== prevProps.language) {}
// // //     if (this.props.user !== prevProps.user) {
// // //       await this.getDataPatient();
// // //     }
// // //   }

// // //   handleOnChangeDatePicker = (date) => {
// // //     this.setState(
// // //       {
// // //         currentDate: date[0],
// // //       },
// // //       async () => {
// // //         await this.getDataPatient();
// // //       }
// // //     );
// // //   };

// // //   handleBtnConfirm = async (item) => {
// // //     let res = await confirmBooking(item);
// // //     if (res && res.errCode === 0) {
// // //       toast.success(this.props.language === "en" ? "Confirm appointment succeed!" : "Xác nhận cuộc hẹn thành công!");
// // //       this.setState((prevState) => {
// // //         let newStatus = {
// // //           ...prevState.status,
// // //           [item.id]: "confirmed"
// // //         };
// // //         localStorage.setItem(`patientStatus-${item.id}`, "confirmed");
// // //         return {
// // //           status: newStatus
// // //         };
// // //       });
// // //     } else {
// // //       toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
// // //     }
// // //   };

// // //   handleBtnCancel = async (item) => {
// // //     let res = await cancelBooking({
// // //       doctorId: item.doctorId,
// // //       patientId: item.patientId,
// // //       timeType: item.timeType,
// // //       date: item.date,
// // //       statusId: item.statusId,
// // //     });
// // //     if (res && res.errCode === 0) {
// // //       toast.success(this.props.language === "en" ? "Cancel appointment succeed!" : "Hủy cuộc hẹn thành công!");
// // //       this.setState((prevState) => {
// // //         let newStatus = {
// // //           ...prevState.status,
// // //           [item.id]: "cancelled"
// // //         };
// // //         localStorage.setItem(`patientStatus-${item.id}`, "cancelled");
// // //         return {
// // //           status: newStatus
// // //         };
// // //       });
// // //     } else {
// // //       toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
// // //     }
// // //   };

// // //   render() {
// // //     let { dataPatient, status } = this.state;
// // //     let { language } = this.props;

// // //     return (
// // //       <>
// // //         <LoadingOverlay
// // //           active={this.state.isShowLoading}
// // //           spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
// // //         >
// // //           <div className="manage-patient-container">
// // //             <div className="m-p-title font-weight-bold"><FormattedMessage id={"manage-patient.title"} /> </div>
// // //             <div className="manage-patient-body row">
// // //               <div className="col-4 form-group">
// // //                 <label><FormattedMessage id={"manage-patient.choose-date"} /></label>
// // //                 <DatePicker
// // //                   onChange={this.handleOnChangeDatePicker}
// // //                   className="form-control"
// // //                   value={this.state.currentDate}
// // //                 />
// // //               </div>
// // //               <div className="col-12 table-manage-patient">
// // //                 <table>
// // //                   <tbody>
// // //                     <tr>
// // //                       <th>#</th>
// // //                       <th><FormattedMessage id={"manage-patient.examination-time"} /></th>
// // //                       <th><FormattedMessage id={"manage-patient.patient-name"} /></th>
// // //                       <th><FormattedMessage id={"manage-patient.address"} /></th>
// // //                       <th><FormattedMessage id={"manage-patient.phone-number"} /></th>
// // //                       <th><FormattedMessage id={"manage-patient.gender"} /></th>
// // //                       <th><FormattedMessage id={"manage-patient.reason"} /></th>
// // //                       <th><FormattedMessage id={"manage-patient.actions"} /></th>
// // //                     </tr>
// // //                     {dataPatient && dataPatient.length > 0 ? (
// // //                       dataPatient.map((item, index) => {
// // //                         let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
// // //                         let gender = language === LANGUAGES.VI ? (item.patientGender === "M" ? "Nam" : "Nữ") : (item.patientGender === "M" ? "Male" : "Female");
// // //                         return (
// // //                           <tr key={index} className={status[item.id] ? status[item.id] : ""}>
// // //                             <td>{index + 1}</td>
// // //                             <td>{time}</td>
// // //                             <td>{item.patientName}</td>
// // //                             <td>{item.patientAddress}</td>
// // //                             <td>{item.patientPhoneNumber ? item.patientPhoneNumber : ""}</td>
// // //                             <td>{gender}</td>
// // //                             <td>{item.patientReason}</td>
// // //                             <td>
// // //                               <button
// // //                                 className="btn btn-primary"
// // //                                 onClick={() => this.handleBtnConfirm(item)}
// // //                               >
// // //                                 <FormattedMessage id={"manage-patient.send-prescriptions"} />
// // //                               </button>
// // //                               <button
// // //                                 className="btn btn-danger"
// // //                                 onClick={() => this.handleBtnCancel(item)}
// // //                               >
// // //                                 <FormattedMessage id={"manage-patient.cancel"} />
// // //                               </button>
// // //                             </td>
// // //                           </tr>
// // //                         );
// // //                       })
// // //                     ) : (
// // //                       <tr>
// // //                         <td colSpan="8" style={{ textAlign: "center" }}>
// // //                           {language === LANGUAGES.VI ? "Không có bệnh nhân đặt lịch vào ngày này" : "No patients booked for this date"}
// // //                         </td>
// // //                       </tr>
// // //                     )}
// // //                   </tbody>
// // //                 </table>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </LoadingOverlay>
// // //       </>
// // //     );
// // //   }
// // // }

// // // const mapStateToProps = (state) => {
// // //   return { language: state.app.language, user: state.user.userInfo };
// // // };

// // // const mapDispatchToProps = (dispatch) => {
// // //   return {};
// // // };

// // // export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));


// // import React, { Component } from "react";
// // import { connect } from "react-redux";
// // import { FormattedMessage } from "react-intl";
// // import "./ManagePatient.scss";
// // import DatePicker from "../../../components/Input/DatePicker";
// // import {
// //   cancelBooking,
// //   getAllPatientForDoctor,
// //   confirmBooking,
// // } from "../../../services/userService";
// // import moment from "moment";
// // import { LANGUAGES } from "../../../utils";
// // import { toast } from "react-toastify";
// // import LoadingOverlay from "react-loading-overlay";
// // import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// // import { withRouter } from '../../../utils/withRouter';

// // class ManagePatient extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       currentDate: moment(new Date()).startOf("day").valueOf(),
// //       dataPatient: [],
// //       isShowLoading: false,
// //       status: {}  // Trạng thái lưu trạng thái của từng bệnh nhân
// //     };
// //   }

// //   async componentDidMount() {
// //     await this.getDataPatient();
// //   }

// //   getDataPatient = async () => {
// //     let { user } = this.props;
// //     let { currentDate } = this.state;
// //     let formatedDate = new Date(currentDate).getTime();
// //     if (user && user.id) {
// //       let res = await getAllPatientForDoctor({
// //         doctorId: user.id,
// //         date: formatedDate,
// //       });
// //       if (res && res.errCode === 0) {
// //         let status = {};
// //         res.data.forEach(patient => {
// //           let localStatus = localStorage.getItem(`patientStatus-${patient.id}`);
// //           status[patient.id] = localStatus || ""; // Không gán trạng thái nào nếu chưa xác nhận hoặc hủy
// //         });
// //         this.setState({
// //           dataPatient: res.data,
// //           status: status
// //         });
// //       }
// //     }
// //   };

// //   async componentDidUpdate(prevProps, prevState, snapshot) {
// //     if (this.props.language !== prevProps.language) {}
// //     if (this.props.user !== prevProps.user) {
// //       await this.getDataPatient();
// //     }
// //   }

// //   handleOnChangeDatePicker = (date) => {
// //     this.setState(
// //       {
// //         currentDate: date[0],
// //       },
// //       async () => {
// //         await this.getDataPatient();
// //       }
// //     );
// //   };

// //   handleBtnConfirm = async (item) => {
// //     let res = await confirmBooking(item);
// //     if (res && res.errCode === 0) {
// //       toast.success(this.props.language === "en" ? "Confirm appointment succeed!" : "Xác nhận cuộc hẹn thành công!");
// //       this.setState((prevState) => {
// //         let newStatus = {
// //           ...prevState.status,
// //           [item.id]: "confirmed"
// //         };
// //         localStorage.setItem(`patientStatus-${item.id}`, "confirmed");
// //         return {
// //           status: newStatus
// //         };
// //       });
// //     } else {
// //       toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
// //     }
// //   };

// //   handleBtnCancel = async (item) => {
// //     let res = await cancelBooking({
// //       doctorId: item.doctorId,
// //       patientId: item.patientId,
// //       timeType: item.timeType,
// //       date: item.date,
// //       statusId: item.statusId,
// //     });
// //     if (res && res.errCode === 0) {
// //       toast.success(this.props.language === "en" ? "Cancel appointment succeed!" : "Hủy cuộc hẹn thành công!");
// //       this.setState((prevState) => {
// //         let newStatus = {
// //           ...prevState.status,
// //           [item.id]: "cancelled"
// //         };
// //         localStorage.setItem(`patientStatus-${item.id}`, "cancelled");
// //         return {
// //           status: newStatus
// //         };
// //       });
// //     } else {
// //       toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
// //     }
// //   };

// //   render() {
// //     let { dataPatient, status } = this.state;
// //     let { language } = this.props;

// //     return (
// //       <>
// //         <LoadingOverlay
// //           active={this.state.isShowLoading}
// //           spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
// //         >
// //           <div className="manage-patient-container">
// //             <div className="m-p-title font-weight-bold"><FormattedMessage id={"manage-patient.title"} /> </div>
// //             <div className="manage-patient-body row">
// //               <div className="col-4 form-group">
// //                 <label><FormattedMessage id={"manage-patient.choose-date"} /></label>
// //                 <DatePicker
// //                   onChange={this.handleOnChangeDatePicker}
// //                   className="form-control"
// //                   value={this.state.currentDate}
// //                 />
// //               </div>
// //               <div className="col-12 table-manage-patient">
// //                 <table>
// //                   <tbody>
// //                     <tr>
// //                       <th>#</th>
// //                       <th><FormattedMessage id={"manage-patient.examination-time"} /></th>
// //                       <th><FormattedMessage id={"manage-patient.patient-name"} /></th>
// //                       <th><FormattedMessage id={"manage-patient.address"} /></th>
// //                       <th><FormattedMessage id={"manage-patient.phone-number"} /></th>
// //                       <th><FormattedMessage id={"manage-patient.gender"} /></th>
// //                       <th><FormattedMessage id={"manage-patient.reason"} /></th>
// //                       <th><FormattedMessage id={"manage-patient.actions"} /></th>
// //                     </tr>
// //                     {dataPatient && dataPatient.length > 0 ? (
// //                       dataPatient.map((item, index) => {
// //                         let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
// //                         let gender = language === LANGUAGES.VI ? (item.patientGender === "M" ? "Nam" : "Nữ") : (item.patientGender === "M" ? "Male" : "Female");
// //                         return (
// //                           <tr key={index} className={status[item.id] ? status[item.id] : ""}>
// //                             <td>{index + 1}</td>
// //                             <td>{time}</td>
// //                             <td>{item.patientName}</td>
// //                             <td>{item.patientAddress}</td>
// //                             <td>{item.patientPhoneNumber ? item.patientPhoneNumber : ""}</td>
// //                             <td>{gender}</td>
// //                             <td>{item.patientReason}</td>
// //                             <td>
// //                               <button
// //                                 className="btn btn-primary mp-btn-confirm"
// //                                 onClick={() => this.handleBtnConfirm(item)}
// //                               >
// //                                 <FormattedMessage id={"manage-patient.send-prescriptions"} />
// //                               </button>
// //                               <button
// //                                 className="btn btn-danger mp-btn-cancel"
// //                                 onClick={() => this.handleBtnCancel(item)}
// //                               >
// //                                 <FormattedMessage id={"manage-patient.cancel"} />
// //                               </button>
// //                             </td>
// //                           </tr>
// //                         );
// //                       })
// //                     ) : (
// //                       <tr>
// //                         <td colSpan="8" style={{ textAlign: "center" }}>
// //                           {language === LANGUAGES.VI ? "Không có bệnh nhân đặt lịch vào ngày này" : "No patients booked for this date"}
// //                         </td>
// //                       </tr>
// //                     )}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           </div>
// //         </LoadingOverlay>
// //       </>
// //     );
// //   }
// // }

// // const mapStateToProps = (state) => {
// //   return { language: state.app.language, user: state.user.userInfo };
// // };

// // const mapDispatchToProps = (dispatch) => {
// //   return {};
// // };

// // export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));


// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
// import "./ManagePatient.scss";
// import DatePicker from "../../../components/Input/DatePicker";
// import {
//   cancelBooking,
//   getAllPatientForDoctor,
//   confirmBooking,
// } from "../../../services/userService";
// import moment from "moment";
// import { LANGUAGES } from "../../../utils";
// import { toast } from "react-toastify";
// import LoadingOverlay from "react-loading-overlay";
// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// import { withRouter } from '../../../utils/withRouter';

// class ManagePatient extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentDate: moment(new Date()).startOf("day").valueOf(),
//       dataPatient: [],
//       isShowLoading: false,
//       status: {}  // Trạng thái lưu trạng thái của từng bệnh nhân
//     };
//   }

//   async componentDidMount() {
//     await this.getDataPatient();
//   }

//   getDataPatient = async () => {
//     let { user } = this.props;
//     let { currentDate } = this.state;
//     let formatedDate = new Date(currentDate).getTime();
//     if (user && user.id) {
//       let res = await getAllPatientForDoctor({
//         doctorId: user.id,
//         date: formatedDate,
//       });
//       if (res && res.errCode === 0) {
//         let status = {};
//         res.data.forEach(patient => {
//           let localStatus = localStorage.getItem(`patientStatus-${patient.id}`);
//           status[patient.id] = localStatus || ""; // Không gán trạng thái nào nếu chưa xác nhận hoặc hủy
//         });
//         this.setState({
//           dataPatient: res.data,
//           status: status
//         });
//       }
//     }
//   };

//   async componentDidUpdate(prevProps, prevState, snapshot) {
//     if (this.props.language !== prevProps.language) {}
//     if (this.props.user !== prevProps.user) {
//       await this.getDataPatient();
//     }
//   }

//   handleOnChangeDatePicker = (date) => {
//     this.setState(
//       {
//         currentDate: date[0],
//       },
//       async () => {
//         await this.getDataPatient();
//       }
//     );
//   };

//   handleBtnConfirm = async (item) => {
//     let res = await confirmBooking(item);
//     if (res && res.errCode === 0) {
//       toast.success(this.props.language === "en" ? "Confirm appointment succeed!" : "Xác nhận cuộc hẹn thành công!");
//       this.setState((prevState) => {
//         let newStatus = {
//           ...prevState.status,
//           [item.id]: "confirmed"
//         };
//         localStorage.setItem(`patientStatus-${item.id}`, "confirmed");
//         return {
//           status: newStatus
//         };
//       });
//     } else {
//       toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
//     }
//   };

//   handleBtnCancel = async (item) => {
//     let res = await cancelBooking({
//       doctorId: item.doctorId,
//       patientId: item.patientId,
//       timeType: item.timeType,
//       date: item.date,
//       statusId: item.statusId,
//     });
//     if (res && res.errCode === 0) {
//       toast.success(this.props.language === "en" ? "Cancel appointment succeed!" : "Hủy cuộc hẹn thành công!");
//       this.setState((prevState) => {
//         let newStatus = {
//           ...prevState.status,
//           [item.id]: "cancelled"
//         };
//         localStorage.setItem(`patientStatus-${item.id}`, "cancelled");
//         return {
//           status: newStatus
//         };
//       });
//     } else {
//       toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
//     }
//   };

//   render() {
//     let { dataPatient, status } = this.state;
//     let { language } = this.props;

//     return (
//       <>
//         <LoadingOverlay
//           active={this.state.isShowLoading}
//           spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
//         >
//           <div className="manage-patient-container">
//             <div className="m-p-title font-weight-bold"><FormattedMessage id={"manage-patient.title"} /> </div>
//             <div className="manage-patient-body row">
//               <div className="col-4 form-group">
//                 <label><FormattedMessage id={"manage-patient.choose-date"} /></label>
//                 <DatePicker
//                   onChange={this.handleOnChangeDatePicker}
//                   className="form-control"
//                   value={this.state.currentDate}
//                 />
//               </div>
//               <div className="col-12 table-manage-patient">
//                 <table>
//                   <tbody>
//                     <tr>
//                       <th>#</th>
//                       <th><FormattedMessage id={"manage-patient.examination-time"} /></th>
//                       <th><FormattedMessage id={"manage-patient.patient-name"} /></th>
//                       <th><FormattedMessage id={"manage-patient.address"} /></th>
//                       <th><FormattedMessage id={"manage-patient.phone-number"} /></th>
//                       <th><FormattedMessage id={"manage-patient.gender"} /></th>
//                       <th><FormattedMessage id={"manage-patient.reason"} /></th>
//                       <th><FormattedMessage id={"manage-patient.actions"} /></th>
//                     </tr>
//                     {dataPatient && dataPatient.length > 0 ? (
//                       dataPatient.map((item, index) => {
//                         let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
//                         let gender = language === LANGUAGES.VI ? (item.patientGender === "M" ? "Nam" : "Nữ") : (item.patientGender === "M" ? "Male" : "Female");
//                         return (
//                           <tr key={index} className={status[item.id] ? status[item.id] : ""}>
//                             <td>{index + 1}</td>
//                             <td>{time}</td>
//                             <td>{item.patientName}</td>
//                             <td>{item.patientAddress}</td>
//                             <td>{item.patientPhoneNumber ? item.patientPhoneNumber : ""}</td>
//                             <td>{gender}</td>
//                             <td>{item.patientReason}</td>
//                             <td>
//                               <button
//                                 className="btn btn-primary mp-btn-confirm"
//                                 onClick={() => this.handleBtnConfirm(item)}
//                               >
//                                 <FormattedMessage id={"manage-patient.send-prescriptions"} />
//                               </button>
//                               <button
//                                 className="btn btn-danger mp-btn-cancel"
//                                 onClick={() => this.handleBtnCancel(item)}
//                               >
//                                 <FormattedMessage id={"manage-patient.cancel"} />
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan="8" style={{ textAlign: "center" }}>
//                           {language === LANGUAGES.VI ? "Không có bệnh nhân đặt lịch vào ngày này" : "No patients booked for this date"}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </LoadingOverlay>
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return { language: state.app.language, user: state.user.userInfo };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));


import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  cancelBooking,
  getAllPatientForDoctor,
  confirmBooking,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { withRouter } from '../../../utils/withRouter';

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isShowLoading: false,
      status: {}  // Trạng thái lưu trạng thái của từng bệnh nhân
    };
  }

  async componentDidMount() {
    await this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    if (user && user.id) {
      let res = await getAllPatientForDoctor({
        doctorId: user.id,
        date: formatedDate,
      });
      if (res && res.errCode === 0) {
        let status = {};
        res.data.forEach(patient => {
          let localStatus = localStorage.getItem(`patientStatus-${patient.id}`);
          status[patient.id] = localStatus || ""; // Không gán trạng thái nào nếu chưa xác nhận hoặc hủy
        });
        this.setState({
          dataPatient: res.data,
          status: status
        });
      }
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {}
    if (this.props.user !== prevProps.user) {
      await this.getDataPatient();
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = async (item) => {
    // Kiểm tra nếu trạng thái đã là "confirmed" hoặc "cancelled"
    if (this.state.status[item.id] === "confirmed" || this.state.status[item.id] === "cancelled") {
      return;
    }
    let res = await confirmBooking(item);
    if (res && res.errCode === 0) {
      toast.success(this.props.language === "en" ? "Confirm appointment succeed!" : "Xác nhận cuộc hẹn thành công!");
      this.setState((prevState) => {
        let newStatus = {
          ...prevState.status,
          [item.id]: "confirmed"
        };
        localStorage.setItem(`patientStatus-${item.id}`, "confirmed");
        return {
          status: newStatus
        };
      });
    } else {
      toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
    }
  };

  handleBtnCancel = async (item) => {
    // Kiểm tra nếu trạng thái đã là "confirmed" hoặc "cancelled"
    if (this.state.status[item.id] === "confirmed" || this.state.status[item.id] === "cancelled") {
      return;
    }
    let res = await cancelBooking({
      doctorId: item.doctorId,
      patientId: item.patientId,
      timeType: item.timeType,
      date: item.date,
      statusId: item.statusId,
    });
    if (res && res.errCode === 0) {
      toast.success(this.props.language === "en" ? "Cancel appointment succeed!" : "Hủy cuộc hẹn thành công!");
      this.setState((prevState) => {
        let newStatus = {
          ...prevState.status,
          [item.id]: "cancelled"
        };
        localStorage.setItem(`patientStatus-${item.id}`, "cancelled");
        return {
          status: newStatus
        };
      });
    } else {
      toast.error(this.props.language === "en" ? "Something went wrong!" : "Lỗi!");
    }
  };

  render() {
    let { dataPatient, status } = this.state;
    let { language } = this.props;

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
        >
          <div className="manage-patient-container">
            <div className="m-p-title font-weight-bold"><FormattedMessage id={"manage-patient.title"} /> </div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label><FormattedMessage id={"manage-patient.choose-date"} /></label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table>
                  <tbody>
                    <tr>
                      <th>#</th>
                      <th><FormattedMessage id={"manage-patient.examination-time"} /></th>
                      <th><FormattedMessage id={"manage-patient.patient-name"} /></th>
                      <th><FormattedMessage id={"manage-patient.address"} /></th>
                      <th><FormattedMessage id={"manage-patient.phone-number"} /></th>
                      <th><FormattedMessage id={"manage-patient.gender"} /></th>
                      <th><FormattedMessage id={"manage-patient.reason"} /></th>
                      <th><FormattedMessage id={"manage-patient.actions"} /></th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                        let gender = language === LANGUAGES.VI ? (item.patientGender === "M" ? "Nam" : "Nữ") : (item.patientGender === "M" ? "Male" : "Female");
                        return (
                          <tr key={index} className={status[item.id] ? status[item.id] : ""}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientName}</td>
                            <td>{item.patientAddress}</td>
                            <td>{item.patientPhoneNumber ? item.patientPhoneNumber : ""}</td>
                            <td>{gender}</td>
                            <td>{item.patientReason}</td>
                            <td>
                              <button
                                className="btn btn-primary mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                                disabled={status[item.id] === "confirmed" || status[item.id] === "cancelled"}
                              >
                                <FormattedMessage id={"manage-patient.send-prescriptions"} />
                              </button>
                              <button
                                className="btn btn-danger mp-btn-cancel"
                                onClick={() => this.handleBtnCancel(item)}
                                disabled={status[item.id] === "confirmed" || status[item.id] === "cancelled"}
                              >
                                <FormattedMessage id={"manage-patient.cancel"} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" style={{ textAlign: "center" }}>
                          {language === LANGUAGES.VI ? "Không có bệnh nhân đặt lịch vào ngày này" : "No patients booked for this date"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, user: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));
