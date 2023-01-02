import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { CommonUtils } from '../../../utils';
import { createNewClinic, createNewSpecialty } from '../../../services/userService';
import { toast } from "react-toastify";   
const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props){
        super(props);
        this.state={
        name:'',
        imageBase64:'',
        descriptionHTML:'',
        descriptionMarkdown:'',
        previewImgURL:'',
        address:''

        }
    }
    componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot){    
        if(this.props.language !== prevProps.language){
           
        }
    }
    handleOneChangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
        descriptionHTML: html,
        descriptionMarkdown:text
        })
      }

      handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
          let base64 = await CommonUtils.getBase64(file);
          this.setState({
            imageBase64: base64
          })
        }
      }
  
      handleSaveNewClinic = async () => {
        console.log('check state', this.state)
        let res = await createNewClinic(this.state)
        if(res && res.errCode === 0){
            toast.success('Thêm thông tin phòng khám thành công !')
            this.setState({
              name:'',
              imageBase64:'',
              descriptionHTML:'',
              descriptionMarkdown:'',
              address:''
              
            })
        }else{
            toast.error('Thêm thông tin phòng khám thất bại ! ')

        }
      }

      handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
          let base64 = await CommonUtils.getBase64(file);
          let objectUrl = URL.createObjectURL(file)
          this.setState({
            previewImgURL: objectUrl,
            imageBase64:base64
          })
        }
      }
      
      openPreviewImage =() => {
        if(!this.state.previewImgURL) return;
        this.setState({
          isOpen:true
        })
      }


    render() {
       
        return (
          <div className='manage-specialty-container'>
          <div className='ms-title'> Quản lí phòng khám </div>

        <div className='col-12 form-group'>
            <label> Tên phòng khám </label>
            <input className='form-control' type='text' value={this.state.name}
            onChange={ (event)=> this.handleOneChangeInput(event,'name')}
            ></input>
        </div>

        <div className='col-12 form-group'>
            <label> Địa chỉ phòng khám </label>
            <input className='form-control' type='text' value={this.state.address}
            onChange={ (event)=> this.handleOneChangeInput(event,'address')}
            ></input>
        </div>

        <div className='col-2 form-group'>
            <label> Ảnh phòng khám </label>
            <div className='preview-img-container'>
                  <input id='previewImg' type='file' hidden
                   onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label className='label-upload' htmlFor='previewImg'>Tải Ảnh Lên <i className='fas fa-upload'/> </label>
                  <div className='preview-image' 
                  style={{backgroundImage: `url(${this.state.previewImgURL})` }}
                  onClick={() => this.openPreviewImage()}
                  >
                  </div>
                  </div>
        </div>

        <div className='add-new-specialty'>
        <MdEditor style={{ height: '500px' }}
             renderHTML={text => mdParser.render(text)} 
             onChange={this.handleEditorChange}
             value={this.state.descriptionMarkdown}
             />
        </div>
            <div className='col-12'>
            <button className='btn-save-specialty'
            onClick={ () => this.handleSaveNewClinic()}
            > Save </button>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
