  import React, { Component } from "react";
  import { connect } from "react-redux";
  import { FormattedMessage } from "react-intl";
  import "./ManagePackage.scss";
  import MarkdownIt from "markdown-it";
  import MdEditor from "react-markdown-editor-lite";
  import "react-markdown-editor-lite/lib/index.css";
  import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
  import { createNewPackage } from "../../../services/userService";
  import { toast } from "react-toastify";
  import { filterPackage,deletePackage } from "../../../services/packageService";
  import {withRouter} from '../../../utils/withRouter';

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  class ManagePackage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        listPackage:[]
      };
    }

    async componentDidMount() {
      await this.getAllPackage()
    }

    getAllPackage = async()=>{
      let res = await filterPackage({})
      if(res && res.errCode===0 && res.data){
        let allPackage =res.data.reverse()
        this.setState({
          listPackage:allPackage
        })
        console.log("res",res)
      }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.language !== prevProps.language) {
      }
    }

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

    handleSaveNewPackage = async () => {
      let res = await createNewPackage(this.state);

      if (res && res.errCode === 0) {
        if(this.props.language=="en"){
          toast.success("Add new package succeeds!");
        }else{
          toast.success("Thêm chuyên khoa thành công!");
        }

        this.setState({
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
        });
      } else {
        if(this.props.language=="en"){
          toast.error("Something wrongs!");
        }else{
          toast.error("Lỗi!");
        }
        
      }
    };

    handleDeletePackage = async (packagesId)=>{
        let {language} = this.props;

        let res = await deletePackage({id:packagesId})
        if(res && res.errCode===0){
            if(language==="en"){
                toast.success("Deleted!");
            }else{
              toast.success("Đã xóa!");
            }

            await this.getAllPackage()
        }else{
          if(language==="en"){
              toast.error("Delete failed!");
          }else{
            toast.success("Xóa thất bại!");
          }

          await this.getAllPackage()
        }
    }

    
    handleReset =async ()=>{
      this.setState({
        name: "",
      });

      await this.getAllPackage()
    }

    onChangeInput = (event, id) => {
      let copyState = { ...this.state };

      copyState[id] = event.target.value;

      this.setState({
        ...copyState,
      });
    };

    handleFilterPackage = async ()=>{
      let {
        name
      } = this.state;

      let data={
        name:name
      }

      let res = await filterPackage(data)

      if(res && res.data){
        let allPackage =res.data.reverse()
        this.setState({
          listPackage:allPackage
        })
      }
    }

    render() {
      let {listPackage}=this.state;

      return (
        <div className="manage-specialty-container">
          <div className="ms-title"><FormattedMessage id="admin.manage-package.manage-package" /></div>
          <div class="row">
                <div class="col-12">
                          <h3><FormattedMessage id="medical-history.filters" /></h3>
                </div>
                <div class="col-3">
                    <div class="form-group">
                      <label for="exampleInputEmail1"> <FormattedMessage id="admin.manage-package.package-name" /></label>
                      <input value={this.state.name} onChange={(event)=>this.onChangeInput(event,"name")} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                    </div>
                  </div>
                <div class="col-12">
                    <button onClick={()=>this.handleFilterPackage()} type="button" class="btn btn-primary mr-5"><FormattedMessage id="medical-history.apply" /></button> 
                    <button  onClick={()=>this.handleReset()} type="button" class="btn btn-primary"><FormattedMessage id="medical-history.reset" /></button> 
                </div>
          </div>

          <div class="row">
              <div class="col-12 text-right mb-16">
                  <button type="submit" class="btn btn-primary pointer mr-5"
                  onClick={()=>{this.props.navigate(`/admin-dashboard/manage-package/create`, { replace: true });}}
                  ><i class="fas fa-plus-circle mr-5"></i><FormattedMessage id="manage-user.btn-create" /></button>
              </div>
          </div>

          <table class="table table-striped mt-30">
              <thead>
                  <tr>
                      <th scope="col">STT</th>
                      <th scope="col"><FormattedMessage id="admin.manage-package.image" /></th>
                      <th scope="col"><FormattedMessage id="admin.manage-package.name" /></th>
                      <th scope="col" class="text-right">&nbsp;</th>
                  </tr>
              </thead>
              <tbody>
                {
                  listPackage.map((packages,index)=>{
                    return(
                      <tr>
                          <td scope="row">{index+1}</td>
                          <td style={{backgroundImage: `url(${packages.image})`, width:"100px",height:"100px",backgroundSize: 'cover'}}></td>
                          <td>{packages.name}</td>
                          <td class="text-right" colspan="2">
                                <button
                                  className="btn-edit"
                                  onClick={()=>{this.props.navigate(`/admin-dashboard/manage-package/edit/${packages.id}`, { replace: true });}}
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button
                                  className="btn-delete"
                                  onClick={() => this.handleDeletePackage(packages.id)}
                                >
                                <i className="fas fa-trash"></i>
                              </button>
                          </td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>

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

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePackage));
