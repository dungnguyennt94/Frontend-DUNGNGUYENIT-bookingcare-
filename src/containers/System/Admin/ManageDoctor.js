import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            //save to mark down table
          contentMarkdown: '',
          contentHTML:'',
          selectedOption: '',
          description:'',
          listDoctors:[],
          hasOldData: false,

          // save to doctor infor table
          listPrice:[],
          listPayment: [],
          listProvince:[],
          listClinic:[],
          listSpecialty:[],
          
          selectedPrice:'',
          selectedPayment:'',
          selectedProvince:'',
          selectedClinic:'',
          selectedSpecialty:'',

          nameClinic:'',
          addressClinic:'',
          note:'',
          clinicId:'',
          specialtyId:''

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getAllRequiredDoctorInfor();
    }

    buidDataInputSelect = (inputData, type) => {
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0){
            if(type === 'USERS'){
                inputData.map((item,index) => {
                    let object = {};
                    let label_Vi = ` ${item.lastName} ${item.firstName}`;
                    let label_En = ` ${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? label_Vi : label_En;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if(type ==='PRICE'){
                inputData.map((item,index) => {
                    let object = {};
                    let label_Vi = ` ${item.value_Vi} VNĐ` ;
                    let label_En = ` ${item.value_En} USD` ;
                    object.label = language === LANGUAGES.VI ? label_Vi : label_En;
                    object.value = item.key;
                    result.push(object)
                })

            }
            if(type === 'PAYMENT' || 'PROVINCE'){
                inputData.map((item,index) => {
                    let object = {};
                    let label_Vi = ` ${item.value_Vi}`;
                    let label_En = ` ${item.value_En}`;
                    object.label = language === LANGUAGES.VI ? label_Vi : label_En;
                    object.value = item.key;
                    result.push(object)
                })
            }
            if(type === 'SPECIALTY'){
                inputData.map((item,index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

            if(type === 'CLINIC'){
                inputData.map((item,index) => {
                    let object = {};

                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
              
        }
        return result;
    }
    

    componentDidUpdate(prevProps, prevState, snapshot){
       if( prevProps.allDoctors !== this.props.allDoctors){
        let dataSelect = this.buidDataInputSelect(this.props.allDoctors, 'USERS')
        this.setState({
            listDoctors: dataSelect,
            
           
        })
       }
       
       if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
        let {resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;

        let dataSelectedPrice = this.buidDataInputSelect(resPrice,'PRICE');
        let dataSelectedPayment = this.buidDataInputSelect(resPayment,'PAYMENT');
        let dataSelectedprovince = this.buidDataInputSelect(resProvince,'PROVINCE');
        let dataSelectedSpecialty = this.buidDataInputSelect(resSpecialty, 'SPECIALTY')
        let dataSelectedClinic = this.buidDataInputSelect(resClinic, 'CLINIC');

        this.setState({
          listPrice:dataSelectedPrice,
          listPayment: dataSelectedPayment,
          listProvince:dataSelectedprovince,
          listSpecialty: dataSelectedSpecialty,
          listClinic: dataSelectedClinic
        })
    }
    if(prevProps.language !== this.props.language){
        let dataSelect = this.buidDataInputSelect(this.props.allDoctors,'USERS')
        let {resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfor;

        let dataSelectedPrice = this.buidDataInputSelect(resPrice,'PRICE');
        let dataSelectedPayment = this.buidDataInputSelect(resPayment,'PAYMENT');
        let dataSelectedprovince = this.buidDataInputSelect(resProvince,'PROVINCE');
        this.setState({
            listDoctors: dataSelect,
            listPrice:dataSelectedPrice,
          listPayment: dataSelectedPayment,
          listProvince:dataSelectedprovince,
        })
       }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown:text,
            contentHTML: html,
        })
      }

    handleSaveContentMarkdown = () => {
        
        let {hasOldData } = this.state;
        
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            
            selectedPrice:this.state.selectedPrice.value,
            selectedPayment:this.state.selectedPayment.value,
            selectedProvince:this.state.selectedProvince.value,
            nameClinic:this.state.nameClinic,
            addressClinic:this.state.addressClinic,
            note:this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
        console.log('check state',this.state )
    }
     handleChangeSelect = async (selectedOption, name) => {
        this.setState({ selectedOption });
        let {listPrice, listPayment, listProvince, listSpecialty, listClinic} = this.state;

        let res = await getDetailInforDoctor(selectedOption.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown;

            let priceId = '', provinceId ='', paymentId='',clinicId='',
            nameClinic = '', addressClinic = '', note='', specialtyId ='',
            selectedPrice ='', selectedPayment = '', selectedProvince ='',
            selectedSpecialty = '', selectedClinic= '' ;

            if(res.data.Doctor_Infor){
                nameClinic = res.data.Doctor_Infor.nameClinic;
                addressClinic = res.data.Doctor_Infor.addressClinic;
                note = res.data.Doctor_Infor.note;

                priceId = res.data.Doctor_Infor.priceId;
                paymentId = res.data.Doctor_Infor.paymentId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                selectedPrice = listPrice.find((item => {
                    return item && item.value === priceId
                 }))

                 selectedPayment = listPayment.find((item => {
                    return item && item.value === paymentId
                 }))

                 selectedProvince = listProvince.find((item => {
                    return item && item.value === provinceId
                 }))
               
                 selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                 })

                 selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                 })
     
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData:true,
                // priceId: priceId,
                // provinceId: provinceId,
                // paymentId: paymentId,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic

            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic:''
            })
        }
      };

    handleChangeSelectDoctorInfor = async (selectedOption, name) =>{
        let stateName = name.name;
        let stateCopy = {...this.state};

        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }
    handleOnchangeText = (event, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
      }
      
    render() {  
        let {hasOldData, listSpecialty} = this.state; 
    return (
        <React.Fragment>
            <div className='manage-doctor-container'>
            <div className='manage-doctor-title'> <FormattedMessage id="admin.managedoctor.createinfordoctor"/>  </div>
            <div className='more-infor'>
            <div className='content-left'>
           
                <label> <FormattedMessage id="admin.managedoctor.selectdoctor"/> </label>
                <Select
                    value={this.state.selectedOption}
                    onChange={this.handleChangeSelect}
                    options={this.state.listDoctors}
                    placeholder={<FormattedMessage id="admin.managedoctor.selectdoctor."/>}
                />
            </div> 
            
            <div className='content-right'>
            <label> <FormattedMessage id="admin.managedoctor.introductioninformation"/> </label>
            <textarea className='form-control'
            onChange={ (event) => this.handleOnchangeText(event, 'description')}
            value={this.state.description}>
                    
                </textarea>
            </div>
           
            </div>

            <div className='more-infor-extra row'>
        <div className='col-4 form-group'>
        <label> <FormattedMessage id="admin.managedoctor.price"/> </label>
        <Select
            value={this.state.selectedPrice}
            onChange={this.handleChangeSelectDoctorInfor}
            options={this.state.listPrice}
            placeholder={<FormattedMessage id="admin.managedoctor.price"/>}
            name="selectedPrice"
        />
        </div>

        <div className='col-4 form-group'>
        <label> <FormattedMessage id="admin.managedoctor.payment"/> </label>
        <Select
            value={this.state.selectedPayment}
            onChange={this.handleChangeSelectDoctorInfor}
            options={this.state.listPayment}
            placeholder={<FormattedMessage id="admin.managedoctor.payment"/>}
            name="selectedPayment"
        />
        </div>

        <div className='col-4 form-group'>
        <label> <FormattedMessage id="admin.managedoctor.province"/> </label>
        <Select
            value={this.state.selectedProvince}
            onChange={this.handleChangeSelectDoctorInfor}
            options={this.state.listProvince}
            placeholder={<FormattedMessage id="admin.managedoctor.province"/>}
            name="selectedProvince"

        />
        </div>

        <div className='col-4 form-group'>
        <label> <FormattedMessage id="admin.managedoctor.nameclinic"/> </label>
        <input className='form-control'
            onChange={ (event) => this.handleOnchangeText(event, 'nameClinic')}
            value={this.state.nameClinic}
        ></input>
        </div>

        <div className='col-4 form-group'>
        <label> <FormattedMessage id="admin.managedoctor.addressclinic"/> </label>
        <input className='form-control'
            onChange={ (event) => this.handleOnchangeText(event, 'addressClinic')}
            value={this.state.addressClinic}
        ></input>
        </div>

        <div className='col-4 form-group'>
        <label> <FormattedMessage id="admin.managedoctor.note"/> </label>
        <input className='form-control'
            onChange={ (event) => this.handleOnchangeText(event, 'note')}
            value={this.state.note}
        ></input>
        </div>

            </div>
            <div className='row'>
            <div className='col-12 form-group'>
            <label> {<FormattedMessage id="admin.managedoctor.specialty"/>} </label>
            <Select
            value={this.state.selectedSpecialty}
            onChange={this.handleChangeSelectDoctorInfor}
            options={this.state.listSpecialty}
            placeholder={<FormattedMessage id="admin.managedoctor.specialty"/>}
            name="selectedSpecialty"

        />

            </div>

            <div className='col-12 form-group'>
            <label> {<FormattedMessage id="admin.managedoctor.selectclinic"/>} </label>
            <Select
            value={this.state.selectedClinic}
            onChange={this.handleChangeSelectDoctorInfor}
            options={this.state.listClinic}
            placeholder={<FormattedMessage id="admin.managedoctor.selectclinic"/>}
            name="selectedClinic"

        />

            </div>
            </div>

            <div className='manage-doctor-editor'>
            <MdEditor style={{ height: '400px' }}
             renderHTML={text => mdParser.render(text)} 
             onChange={this.handleEditorChange}
             value={this.state.contentMarkdown} />

            </div>
            
            <button
            onClick={() => this.handleSaveContentMarkdown()}
            className={hasOldData === true ? 'save-content-doctor': 'create-content-doctor'}>
             {hasOldData === true ?<span><FormattedMessage id="admin.managedoctor.saveinformation"/></span> : <span> <FormattedMessage id="admin.managedoctor.createinformation"/> </span>
             }
            </button>
           
            </div>
            
        </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
