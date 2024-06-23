import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "../ManagePackage";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CommonUtils } from "../../../../utils";
import { getAllDoctors, getAllCodeService } from "../../../../services/userService";
import { getDetailPackageById, udatePackageData } from "../../../../services/packageService";
import { toast } from "react-toastify";
import { withRouter } from '../../../../utils/withRouter';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      previewImgURL: "",
      isOpen: false,
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
    await this.getPackageDetail();
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

  getPackageDetail = async () => {
    let { packagesId } = this.props.params;
    let res = await getDetailPackageById({ id: packagesId });

    if (res && res.errCode === 0 && res.data) {
      let packageData = res.data[0]; // Assuming res.data is an array and we need the first element
      let imageUrl = null;
      if (packageData.image) {
        imageUrl = new Buffer(packageData.image, "base64").toString("binary");
      }

      // Find the selected price and doctors
      // let selectedPrice = this.state.listPrices.find(price => price.value === packageData.priceId);
      let selectedPrice = this.state.listPrices.filter(price => packageData.priceId.includes(price.value));
      let selectedDoctors = this.state.listDoctors.filter(doctor => packageData.doctorId.includes(doctor.value));

      this.setState({
        name: packageData.name,
        imageBase64: packageData.image,
        descriptionHTML: packageData.descriptionHTML,
        descriptionMarkdown: packageData.descriptionMarkdown,
        previewImgURL: imageUrl,
        selectedPrice,
        selectedDoctors,
      });
    } else {
      console.error("Error retrieving package data:", res);
    }
  }

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({ isOpen: true });
  };

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({ ...stateCopy });
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
      let objectUrl = URL.createObjectURL(file);

      this.setState({
        imageBase64: base64,
        previewImgURL: objectUrl
      });
    }
  };

  handleSaveNewPackage = async () => {
    let { packagesId } = this.props.params;
    let { language } = this.props;

    let res = await udatePackageData({
      id: packagesId,
      name: this.state.name,
      image: this.state.imageBase64,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      priceId: this.state.selectedPrice.value
    });

    if (res && res.errCode === 0) {
      if (language === "en") {
        toast.success("Update specialty succeed!");
      } else {
        toast.success("Cập nhật gói khám thành công!");
      }

      await this.getPackageDetail();
    } else {
      if (language === "en") {
        toast.error("Something wrongs!");
      } else {
        toast.error("Lỗi!");
      }

      await this.getPackageDetail();
    }

    setTimeout(() => { window.location.href = '/admin-dashboard/manage-package' }, 1000);
  };

  render() {
    let { language } = this.props;

    return (
      <div className="manage-package-container">
        <div className="ms-title"><FormattedMessage id="admin.manage-package.title-edit" /></div>

        <div className="add-package row">
          <div className="col-6 form-group">
            <label><FormattedMessage id="admin.manage-package.package-name" /></label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label><FormattedMessage id="admin.manage-package.package-avatar" /></label>
            <div
              className="preview-image"
              style={{
                backgroundImage: `url(${this.state.previewImgURL})`,
                width: "100px",
                height: "100px"
              }}
              onClick={() => this.openPreviewImage()}
            ></div>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className="col-6 form-group">
            <label><FormattedMessage id="admin.manage-package.package-price" /></label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectPrice}
              options={this.state.listPrices}
              className="react-select-container"
            />
          </div>
          <div className="col-6 form-group">
            <label><FormattedMessage id="admin.manage-package.package-doctors" /></label>
            <Select
              isMulti
              value={this.state.selectedDoctors}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              className="react-select-container"
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown} // Sử dụng descriptionMarkdown
            />
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary mt-10"
              onClick={() => this.handleSaveNewPackage()}
            >
              {language === "en" ? "Update" : "Cập nhật"}
            </button>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPackage));
