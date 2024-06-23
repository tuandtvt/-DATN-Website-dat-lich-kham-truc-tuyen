// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
// import "../ManagePackage.scss";
// import MarkdownIt from "markdown-it";
// import MdEditor from "react-markdown-editor-lite";
// import "react-markdown-editor-lite/lib/index.css";
// import { LANGUAGES, CommonUtils } from "../../../../utils";
// import { createNewPackage, getAllDoctors } from "../../../../services/userService";
// import { toast } from "react-toastify";
// import Select from "react-select";

// const mdParser = new MarkdownIt(/* Markdown-it options */);

// class CreatePackage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       imageBase64: "",
//       descriptionHTML: "",
//       descriptionMarkdown: "",
//       listDoctors: [],
//       selectedDoctors: [],
//       priceId: "",
//       addressClinic: "",
//     };
//   }

//   async componentDidMount() {
//     let res = await getAllDoctors();
//     if (res && res.errCode === 0) {
//       let dataSelect = this.buildDataInputSelect(res.data);
//       this.setState({
//         listDoctors: dataSelect,
//       });
//     }
//   }

//   async componentDidUpdate(prevProps, prevState, snapshot) {
//     if (this.props.language !== prevProps.language) {
//       let dataSelect = this.buildDataInputSelect(this.state.listDoctors);
//       this.setState({
//         listDoctors: dataSelect,
//       });
//     }
//   }

//   buildDataInputSelect = (inputData) => {
//     let result = [];
//     let { language } = this.props;
//     if (inputData && inputData.length > 0) {
//       inputData.map((item) => {
//         let object = {};
//         let labelVi = `${item.lastName} ${item.firstName}`;
//         let labelEn = `${item.firstName} ${item.lastName}`;
//         object.label = language === LANGUAGES.VI ? labelVi : labelEn;
//         object.value = item.id;
//         result.push(object);
//       });
//     }
//     return result;
//   };

//   handleOnChangeInput = (event, id) => {
//     let stateCopy = { ...this.state };
//     stateCopy[id] = event.target.value;
//     this.setState({
//       ...stateCopy,
//     });
//   };

//   handleEditorChange = ({ html, text }) => {
//     this.setState({
//       descriptionHTML: html,
//       descriptionMarkdown: text,
//     });
//   };

//   handleOnChangeImage = async (event) => {
//     let data = event.target.files;
//     let file = data[0];
//     if (file) {
//       let base64 = await CommonUtils.getBase64(file);
//       this.setState({
//         imageBase64: base64,
//       });
//     }
//   };

//   checkValidateInput = () => {
//     let { language } = this.props;
//     let arrCheck = ["name", "imageBase64", "descriptionHTML", "descriptionMarkdown", "priceId", "addressClinic"];
//     let copyState = { ...this.state };
//     for (let i = 0; i < arrCheck.length; i++) {
//       if (!copyState[arrCheck[i]]) {
//         if (language === "en") {
//           toast.error("Missing required parameters!");
//         } else {
//           toast.error("Thiếu thông tin gói khám!");
//         }
//         return false;
//       }
//     }
//     return true;
//   };

//   handleSaveNewPackage = async () => {
//     let check = this.checkValidateInput();
//     if (!check) return;

//     let { language } = this.props;
//     let { selectedDoctors } = this.state;
//     let selectedDoctorIds = selectedDoctors.map((doctor) => doctor.value);
//     let res = await createNewPackage({
//       ...this.state,
//       doctorId: selectedDoctorIds,
//     });

//     if (res && res.errCode === 0) {
//       if (language === "en") {
//         toast.success("Add new package successfully!");
//       } else {
//         toast.success("Thêm gói khám thành công!");
//       }

//       this.setState({
//         name: "",
//         imageBase64: "",
//         descriptionHTML: "",
//         descriptionMarkdown: "",
//         selectedDoctors: [],
//         priceId: "",
//         addressClinic: ""
//       });
//     } else {
//       if (language === "en") {
//         toast.error("Something wrong!");
//       } else {
//         toast.error("Lỗi!");
//       }
//     }

//     setTimeout(function () {
//       window.location.href = '/admin-dashboard/manage-package';
//     }, 1000);
//   };

//   handleChangeSelect = (selectedOptions) => {
//     this.setState({ selectedDoctors: selectedOptions });
//   };

// //   render() {
// //     let { language } = this.props;
// //     let { selectedDoctors, listDoctors } = this.state;

// //     return (
// //       <div className="manage-package-container">
// //         <div className="ms-title"><FormattedMessage id="admin.manage-package.title-create" /></div>

// //         <div className="add-new-package row">
// //           <div className="col-6 form-group">
// //             <label><FormattedMessage id="admin.manage-package.package-name" /></label>
// //             <input
// //               className="form-control"
// //               type="text"
// //               value={this.state.name}
// //               onChange={(event) => this.handleOnChangeInput(event, "name")}
// //             />
// //           </div>
// //           <div className="col-6 form-group">
// //             <label><FormattedMessage id="admin.manage-package.package-avatar" /></label>
// //             <input
// //               className="form-control-file"
// //               type="file"
// //               onChange={(event) => this.handleOnChangeImage(event)}
// //             />
// //           </div>
// //           <div className="col-12 form-group">
// //             <label><FormattedMessage id="admin.manage-package.package-doctors" /></label>
// //             <Select
// //               isMulti
// //               value={selectedDoctors}
// //               onChange={this.handleChangeSelect}
// //               options={listDoctors}
// //               className="react-select-container"
// //             />
// //           </div>
// //           <div className="col-12">
// //             <MdEditor
// //               style={{ height: "300px" }}
// //               renderHTML={(text) => mdParser.render(text)}
// //               onChange={this.handleEditorChange}
// //               value={this.state.descriptionMarkdown}
// //             />
// //           </div>
// //           <div className="col-12">
// //             <button
// //               className="btn btn-primary mt-10"
// //               onClick={() => this.handleSaveNewPackage()}
// //             >
// //               {language === "en" ? "Create" : "Thêm"}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }
// // }
// render() {
//   let { language } = this.props;
//   let { selectedDoctors, listDoctors } = this.state;

//   return (
//     <div className="manage-package-container">
//       <div className="ms-title"><FormattedMessage id="admin.manage-package.title-create" /></div>

//       <div className="add-new-package row">
//         <div className="col-6 form-group">
//           <label><FormattedMessage id="admin.manage-package.package-name" /></label>
//           <input
//             className="form-control"
//             type="text"
//             value={this.state.name}
//             onChange={(event) => this.handleOnChangeInput(event, 'name')}
//           />
//         </div>
//         <div className="col-6 form-group">
//           <label><FormattedMessage id="admin.manage-package.package-avatar" /></label>
//           <input
//             className="form-control-file"
//             type="file"
//             onChange={(event) => this.handleOnChangeImage(event)}
//           />
//         </div>
//         <div className="col-6 form-group">
//           <label><FormattedMessage id="admin.manage-package.package-price" /></label>
//           <input
//             className="form-control"
//             type="text"
//             value={this.state.priceId}
//             onChange={(event) => this.handleOnChangeInput(event, 'priceId')}
//           />
//         </div>
//         <div className="col-6 form-group">
//           <label><FormattedMessage id="admin.manage-package.package-address" /></label>
//           <input
//             className="form-control"
//             type="text"
//             value={this.state.addressClinic}
//             onChange={(event) => this.handleOnChangeInput(event, 'addressClinic')}
//           />
//         </div>
//         <div className="col-12 form-group">
//           <label><FormattedMessage id="admin.manage-package.package-doctors" /></label>
//           <Select
//             isMulti
//             value={selectedDoctors}
//             onChange={this.handleChangeSelect}
//             options={listDoctors}
//             className="react-select-container"
//           />
//         </div>
//         <div className="col-12">
//           <MdEditor
//             style={{ height: '300px' }}
//             renderHTML={(text) => mdParser.render(text)}
//             onChange={this.handleEditorChange}
//             value={this.state.descriptionMarkdown}
//           />
//         </div>
//         <div className="col-12">
//           <button
//             className="btn btn-primary mt-10"
//             onClick={() => this.handleSaveNewPackage()}
//           >
//             {language === 'en' ? 'Create' : 'Thêm'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// }

// const mapStateToProps = (state) => {
//   return { language: state.app.language };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CreatePackage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import '../ManagePackage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES, CommonUtils } from '../../../../utils';
import { createNewPackage, getAllDoctors, getAllCodeService } from '../../../../services/userService';
import { toast } from 'react-toastify';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class CreatePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      listDoctors: [],
      selectedDoctors: [],
      listPrices: [],
      selectedPrice: null,
    };
  }

  async componentDidMount() {
    let resDoctors = await getAllDoctors();
    let resPrices = await getAllCodeService('PRICE');
    if (resDoctors && resDoctors.errCode === 0) {
      let dataSelectDoctors = this.buildDataInputSelect(resDoctors.data, 'USER');
      this.setState({
        listDoctors: dataSelectDoctors,
      });
    }
    if (resPrices && resPrices.errCode === 0) {
      let dataSelectPrices = this.buildDataInputSelect(resPrices.data, 'PRICE');
      this.setState({
        listPrices: dataSelectPrices,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let dataSelectDoctors = this.buildDataInputSelect(this.state.listDoctors, 'USER');
      let dataSelectPrices = this.buildDataInputSelect(this.state.listPrices, 'PRICE');
      this.setState({
        listDoctors: dataSelectDoctors,
        listPrices: dataSelectPrices,
      });
    }
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item) => {
        let object = {};
        if (type === 'USER') {
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
        }
        if (type === 'PRICE') {
          object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
          object.value = item.keyMap;
        }
        result.push(object);
      });
    }
    return result;
  };

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  checkValidateInput = () => {
    let { language } = this.props;
    let arrCheck = ['name', 'imageBase64', 'descriptionHTML', 'descriptionMarkdown', 'selectedPrice'];
    let copyState = { ...this.state };
    for (let i = 0; i < arrCheck.length; i++) {
      if (!copyState[arrCheck[i]]) {
        if (language === 'en') {
          toast.error('Missing required parameters!');
        } else {
          toast.error('Thiếu thông tin gói khám!');
        }
        return false;
      }
    }
    return true;
  };

  // handleSaveNewPackage = async () => {
  //   let check = this.checkValidateInput();
  //   if (!check) return;

  //   let { language } = this.props;
  //   let { selectedDoctors, selectedPrice } = this.state;
  //   let selectedDoctorIds = selectedDoctors.map((doctor) => doctor.value);
  //   let res = await createNewPackage({
  //     ...this.state,
  //     doctorId: selectedDoctorIds,
  //     priceId: selectedPrice.value,
  //   });

  //   if (res && res.errCode === 0) {
  //     if (language === 'en') {
  //       toast.success('Add new package successfully!');
  //     } else {
  //       toast.success('Thêm gói khám thành công!');
  //     }

  //     this.setState({
  //       name: '',
  //       imageBase64: '',
  //       descriptionHTML: '',
  //       descriptionMarkdown: '',
  //       selectedDoctors: [],
  //       selectedPrice: null,
  //     });
  //   } else {
  //     if (language === 'en') {
  //       toast.error('Something wrong!');
  //     } else {
  //       toast.error('Lỗi!');
  //     }
  //   }

  //   setTimeout(function () {
  //     window.location.href = '/admin-dashboard/manage-package';
  //   }, 1000);
  // };

  handleSaveNewPackage = async () => {
    let check = this.checkValidateInput();
    if (!check) return;

    let { language } = this.props;
    let { selectedDoctors, selectedPrice } = this.state;
    let selectedDoctorIds = selectedDoctors.map((doctor) => doctor.value);

    // Log dữ liệu trước khi gửi yêu cầu API
    console.log('Selected Doctors:', selectedDoctors);
    console.log('Selected Doctor IDs:', selectedDoctorIds);
    console.log('Selected Price:', selectedPrice);

    let packageData = {
      ...this.state,
      doctorId: selectedDoctorIds,
      priceId: selectedPrice.value,
    };

    console.log('Package data to be sent:', packageData);

    try {
        let res = await createNewPackage(packageData);

        // Log kết quả trả về từ API
        console.log('Response from createNewPackage API:', res);

        if (res && res.errCode === 0) {
            if (language === 'en') {
                toast.success('Add new package successfully!');
            } else {
                toast.success('Thêm gói khám thành công!');
            }

            // Log trạng thái trước khi reset
            console.log('State before reset:', this.state);

            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                selectedDoctors: [],
                selectedPrice: null,
            }, () => {
                // Log trạng thái sau khi reset
                console.log('State after reset:', this.state);

                // Chuyển hướng sau khi reset thành công
                setTimeout(() => {
                    window.location.href = '/admin-dashboard/manage-package';
                }, 1000);
            });
        } else {
            if (language === 'en') {
                toast.error('Something wrong!');
            } else {
                toast.error('Lỗi!');
            }
            console.log('Error occurred:', res);
        }
    } catch (error) {
        console.error('API request failed:', error);
        if (language === 'en') {
            toast.error('Something went wrong with the API request!');
        } else {
            toast.error('Lỗi khi gọi API!');
        }
    }
};



  handleChangeSelect = (selectedOptions) => {
    this.setState({ selectedDoctors: selectedOptions });
  };

  handleChangeSelectPrice = (selectedOption) => {
    this.setState({ selectedPrice: selectedOption });
  };

  render() {
    let { language } = this.props;
    let { selectedDoctors, listDoctors, selectedPrice, listPrices } = this.state;

    return (
      <div className="manage-package-container">
        <div className="ms-title"><FormattedMessage id="admin.manage-package.title-create" /></div>

        <div className="add-new-package row">
          <div className="col-6 form-group">
            <label><FormattedMessage id="admin.manage-package.package-name" /></label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, 'name')}
            />
          </div>
          <div className="col-6 form-group">
            <label><FormattedMessage id="admin.manage-package.package-avatar" /></label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className="col-6 form-group">
            <label><FormattedMessage id="admin.manage-package.package-price" /></label>
            <Select
              value={selectedPrice}
              onChange={this.handleChangeSelectPrice}
              options={listPrices}
              className="react-select-container"
            />
          </div>
          <div className="col-12 form-group">
            <label><FormattedMessage id="admin.manage-package.package-doctors" /></label>
            <Select
              isMulti
              value={selectedDoctors}
              onChange={this.handleChangeSelect}
              options={listDoctors}
              className="react-select-container"
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: '300px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary mt-10"
              onClick={() => this.handleSaveNewPackage()}
            >
              {language === 'en' ? 'Create' : 'Thêm'}
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePackage);
