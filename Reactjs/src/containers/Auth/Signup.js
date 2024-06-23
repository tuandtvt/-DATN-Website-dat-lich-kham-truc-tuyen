import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Signup.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi, createNewUserService } from "../../services/userService";
// import { userLoginSuccess } from "../../store/actions";

import { toast } from "react-toastify";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      phonenumber: "",
      firstName: "",
      lastName: "",
      address: "",
      otp: "",
      isShowPassword: false,
      errMessage: "",
      isOtpSent: false,
      otpTimer: 60,
      isRequestingOtp: false,
    };
    this.otpInterval = null;
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleAddNewUser();
    }
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        if(this.props.language==="en"){
          toast.error("Sign up new account failed!");
        }else{
          toast.error("Đăng ký tài khoản thất bại!");
        }
      } else {
        if(this.props.language==="en"){
          toast.success("User created successfully!");
        }else{
          toast.success("Tạo mới người dùng thành công!");
        }
        this.setState({
          password: "",
          email: "",
          phonenumber: "",
          firstName: "",
          lastName: "",
          address: "",
          otp: "",
          isShowPassword: false,
          isOtpSent: false,
          otpTimer: 60,
          isRequestingOtp: false,
        });
        clearInterval(this.otpInterval);
        this.props.history.push("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "otp"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        // alert("Missing parameter: " + arrInput[i]);
        if(this.props.language==="en"){
          toast.error("Missing parameter: " + arrInput[i]);
        }else{
          toast.error("Chưa nhập đủ thông tin");
        }
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    if (this.state.otp !== "000000") {
      toast.error(this.props.language === "en" ? "Invalid OTP" : "Mã OTP không hợp lệ");
      return;
    }
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.createNewUser(this.state); 
    }
  };

  handleRequestOtp = () => {
    this.setState({ isRequestingOtp: true, isOtpSent: true, otpTimer: 60 });
    this.otpInterval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.otpTimer === 1) {
          clearInterval(this.otpInterval);
          return { otpTimer: 60, isRequestingOtp: false };
        }
        return { otpTimer: prevState.otpTimer - 1 };
      });
    }, 1000);
    // Simulate OTP request, for testing purposes we do nothing here
    toast.success(this.props.language === "en" ? "OTP sent!" : "Đã gửi mã OTP!");
  };

  render() {
    return (
      <div className="login-background">
        <div className="signup-container">
          <div className="login-content row">
            <div className="col-12 text-login"><FormattedMessage id={"login.sign-up"} /></div>
            <div className="col-12 form-group login-input">
              <label><FormattedMessage id={"Email"} />:</label>
              <input
                type="text"
                className="form-control"
                placeholder={this.props.language==="en" ? "Enter your email" : "Nhập email của bạn"}
                value={this.state.email}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "email")
                }
              />
            </div>
            <div className="col-12 form-group login-input">
              <label><FormattedMessage id={"login.password"} />:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder={this.props.language==="en" ? "Enter your password" : "Nhập mật khẩu của bạn"}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 form-group login-input">
              <label><FormattedMessage id={"login.firstname"} />:</label>
              <input
                type="text"
                className="form-control"
                placeholder={this.props.language==="en" ? "Enter your firstname" : "Nhập tên của bạn"}
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
              />
            </div>
            <div className="col-12 form-group login-input">
              <label><FormattedMessage id={"login.lastname"} />:</label>
              <input
                type="text"
                className="form-control"
                placeholder={this.props.language==="en" ? "Enter your lastname" : "Nhập họ của bạn"}
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
              />
            </div>
            {/* <div className="col-12 form-group login-input">
              <label><FormattedMessage id={"login.address"} />:</label>
              <input
                type="text"
                className="form-control"
                placeholder={this.props.language==="en" ? "Enter your address" : "Nhập địa chỉ của bạn"}
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div> */}
            <div className="col-12 form-group login-input">
              <label>OTP:</label>
              <input
                type="text"
                className="form-control"
                placeholder={this.props.language==="en" ? "Enter your OTP" : "Nhập mã OTP"}
                value={this.state.otp}
                onChange={(event) => this.handleOnChangeInput(event, "otp")}
              />
            </div>
            <div className="col-12 form-group">
              <button
                className="btn btn-primary"
                onClick={this.handleRequestOtp}
                disabled={this.state.isRequestingOtp}
              >
                {this.state.isRequestingOtp 
                  ? `${this.state.otpTimer}s` 
                  : this.props.language === "en" 
                    ? "Request OTP" 
                    : "Yêu cầu mã OTP"}
              </button>
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleAddNewUser();
                }}
              >
                <FormattedMessage id={"login.sign-up"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.otpInterval) {
      clearInterval(this.otpInterval);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
