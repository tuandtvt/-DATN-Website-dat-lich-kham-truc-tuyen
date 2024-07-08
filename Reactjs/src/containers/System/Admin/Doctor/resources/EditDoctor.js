import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../../ManageDoctor.scss";


import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import Select from "react-select";
import { getDetailInforDoctor } from "../../../../../services/userService";

import {withRouter} from '../../../../../utils/withRouter';  //navigate

import * as actions from "../../../../../store/actions";

import { CRUD_ACTIONS, LANGUAGES } from "../../../../../utils";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameDoctor:"",
      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      listPackage: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvice: "",
      selectedClinic: "",
      selectedSpecialty: "",
      selectedPackage: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
      packagesId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();

    let { doctorId } = this.props.params;

    this.handleChangeSelect()
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "PACKAGE") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );

      let { resPayment, resPrice, resPackage, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      // let dataSelectSpecialty = this.buildDataInputSelect(
      //   resSpecialty,
      //   "SPECIALTY"
      // );
      let dataSelectPackage = this.buildDataInputSelect(
        resPackage,
        "PACKAGE"
      );
      // let dataSelectPackage = this.buildDataInputSelect(resPackage, "PACKAGE");
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        // listSpecialty: dataSelectSpecialty,
        listPackage: dataSelectPackage,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince, resSpecialty, resPackage, resClinic } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );

      let dataSelectPackage = this.buildDataInputSelect(
        resPackage,
        "PACKAGE"
      );
      // let dataSelectPackage = this.buildDataInputSelect(resPackage, "PACKAGE");
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listPackage: dataSelectPackage,
        listClinic: dataSelectClinic,
      });

      this.handleChangeSelect()
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { doctorId } = this.props.params;
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorAction({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: doctorId,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice,
      selectedPayment: this.state.selectedPayment,
      selectedProvice: this.state.selectedProvice,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:this.state.selectedClinic,
      specialtyId: this.state.selectedSpecialty,
      packagesId: this.state.selectedPackage,
    });

    setTimeout(function(){ window.location.href = '/admin-dashboard/manage-doctor' }, 1000);
    
  };

  handleChangeSelect = async () => {
    let { doctorId } = this.props.params;
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic, listPackage } =
      this.state;

    let res = await getDetailInforDoctor(doctorId);

    if(res && res.errCode === 0) {
      console.log("res",res)
      let name=res.data.lastName+" "+res.data.firstName
      this.setState({
        nameDoctor:name
      })
    }
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        packagesId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvice = "",
        selectedSpecialty = "",
        selectedClinic = "",
        selectedPackage = "";

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;
        packagesId = res.data.Doctor_Infor.clinicId;
       

        selectedPayment = paymentId
        selectedPrice = priceId
        selectedProvice = provinceId
        selectedSpecialty = specialtyId
        selectedClinic = clinicId
        selectedPackage = packagesId
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvice: selectedProvice,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
        selectedPackage: selectedPackage,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvice: "",
        selectedSpecialty: "",
        selectedClinic: "",
        selectedPackage: "",
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeSelect = (event,type)=>{
    let copyState = {...this.state};
    copyState[type]=event.target.value;
    this.setState({
      ...copyState
    })
  }
  render() {
    let { hasOldData, listSpecialty } = this.state;
    // let arrUsers = this.state.usersRedux;

    // selectedPrice: "",
    // selectedPayment: "",
    // selectedProvice: "",
    // console.log("this.state.listPrice",this.state.listPrice)
    // console.log("this.state.listPackage",this.state.listPackage)
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
            <dv class="row">
              <div className="col-5 form-group">
                  <label>
                    <FormattedMessage id="admin.manage-doctor.doctor-name" />
                  </label>
                  <input
                    disabled
                    className="form-control"
                    onChange={(event) => this.handleOnChangeSelect(event, "nameDoctor")}
                    value={this.state.nameDoctor}
                  />
                </div>
                <div class="col-7 form-group">
                    <label>
                  <FormattedMessage id="admin.manage-doctor.intro" />
                  </label>
                  <textarea
                    className="form-control"
                    onChange={(event) =>
                      this.handleOnChangeText(event, "description")
                    }
                    value={this.state.description}
                  ></textarea>
                </div>
            </dv>
         
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <select class="form-control" id="exampleFormControlSelect1"
            value={this.state.selectedPrice}
            onChange={(event)=>this.handleOnChangeSelect(event,"selectedPrice")}
            >
              <option value="">{this.props.language=="en" ? "Choose price" : "Chọn giá"}</option>
              {
                this.state.listPrice.map((price)=>{
                  return(<option value={price.value}>{price.label}</option>)
                })
              }
            </select>
          </div>
          {/* <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>

            <select class="form-control" id="exampleFormControlSelect1"
            value={this.state.selectedPayment}
            onChange={(event)=>this.handleOnChangeSelect(event,"selectedPayment")}
            >
              <option value="">{this.props.language=="en" ? "Choose payment" : "Chọn phương thức thanh toán"}</option>
              {
                this.state.listPayment.map((payment)=>{
                  return(<option value={payment.value}>{payment.label}</option>)
                })
              }
            </select>
          </div> */}
          {/* <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>

            <select class="form-control" id="exampleFormControlSelect1"
            value={this.state.selectedProvice}
            onChange={(event)=>this.handleOnChangeSelect(event,"selectedProvice")}
            >
              <option value="">{this.props.language=="en" ? "Choose province" : "Chọn tỉnh"}</option>
              {
                this.state.listProvince.map((province)=>{
                  return(<option value={province.value}>{province.label}</option>)
                })
              }
            </select>
          </div> */}
          {/* <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div> */}
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          {/* <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div> */}
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.specialty" />
            </label>

            
            <select class="form-control" id="exampleFormControlSelect1"
            value={this.state.selectedSpecialty}
            onChange={(event)=>this.handleOnChangeSelect(event,"selectedSpecialty")}
            >
              <option value="">{this.props.language=="en" ? "Choose specialty" : "Chọn chuyên khoa"}</option>
              {
                this.state.listSpecialty.map((specialty)=>{
                  return(<option value={specialty.value}>{specialty.label}</option>)
                })
              }
            </select>
            

            {/* <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listSpecialty}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.specialty" />
              }
              name="selectedSpecialty"
            /> */}
          </div>
          {/* <div className="col-4 form-group">
            <label>
            {this.props.language=="en" ? "Package" : "Gói khám"}
            </label>

            <select class="form-control" id="exampleFormControlSelect1"
            value={this.state.selectedPackage}
            onChange={(event)=>this.handleOnChangeSelect(event,"selectedPackage")}
            >
              <option value="">{this.props.language=="en" ? "Choose package" : "Chọn gói khám"}</option>
              {
                this.state.listPackage.map((packages)=>{
                  return(<option value={packages.value}>{packages.label}</option>) 
                })
              }
            </select>
          </div> */}
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    // resPackage: state.admin.allRequiredDoctorInfor.resPackage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctorAction: (data) =>
      dispatch(actions.saveDetailDoctorAction(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditDoctor));
