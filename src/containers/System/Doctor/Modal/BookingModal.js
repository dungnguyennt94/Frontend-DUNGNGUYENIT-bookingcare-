import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {
    constructor(props){
        super(props);
        this.state={
            fullname:'',
            phonenumber:'',
            email:'',
            address:'',
            reason:'',
            birthday:'',
            selectedGender:'',
            doctorId:'',
            genders:'',
            timeType:'',
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.props.getGenders();
    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if(data && data.length > 0){
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.value_Vi : item.value_En;
                object.value = item.key;
                result.push(object)
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot){    
        if(this.props.language !== prevProps.language){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.genders !== prevProps.genders){
           
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
            }  
            if(this.props.dataTime !== prevProps.dataTime){
                if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                   let doctorId = this.props.dataTime.doctorId;
                   let timeType = this.props.dataTime.timeType;
                   this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                   })
                }
            }      
        }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = {...this.state}
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handeOnchangeDatePiker = (date) => {
        this.setState ({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption});
    }

    buildTimeBooking = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){

            let time = language === LANGUAGES.VI ?
            dataTime.timeTypeData.value_Vi : dataTime.timeTypeData.value_En;

            let date = language === LANGUAGES.VI ? 
            moment.unix(+dataTime.date /1000).format('dddd - DD/MM/YYYY')
            :
            moment.unix(+dataTime.date /1000).locale('en').format('ddd -MM/DD/YYYY');
            return `${time} - ${date}`

        }return ''
        
    }

    buildDoctorName = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){
        let name = language === LANGUAGES.VI ?
         `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
        :
        `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return ''
        }
        

    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true
        })
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        
    
        let res = await postPatientBookAppointment({
            fullname:this.state.fullname,
            phonenumber:this.state.phonenumber,
            email:this.state.email,
            address:this.state.address,
            reason: this.state.reason,
            date:this.props.dataTime.date,
            birthday:date,
            selectedGender:this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        this.setState({
            isShowLoading: false
        })
        if(res && res.errCode === 0){
            toast.success('?????t l???ch th??nh c??ng !')
            this.props.closeBookingModal();
        }else{
            toast.error('?????t l???ch th???t b???i !')

        }

    }

    render() {
       let {isOpenModal, closeBookingModal, dataTime} = this.props;
       let doctorId = '';
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId
        }
    
        return (
            <LoadingOverlay
            active={this.state.isShowLoading}
            spinner
            text='Loading ...'
            >

          <div>
            <Modal isOpen={isOpenModal} className={'booking-modal-container'}
            size ='lg' centered >
            <div className='booking-modal-content'>

                <div className='booking-modal-header'>
                <span className='left'>
                <FormattedMessage id="patient.bookingmodal.title"/>
                </span>

                <span className='right'
                onClick={closeBookingModal}
                >
                    <i className='fas fa-times'/>
                </span>
                </div>

                    <div className='booking-modal-body'>
                    {/* {JSON.stringify(dataTime)} */}
                    <div className='doctor-infor'>
                    <ProfileDoctor
                    doctorId={doctorId}
                    dataTime={dataTime}
                    isShowDescriptionDoctor ={false}
                    isShowLinkDetail={false}
                    isShowPrice={true}
                     />
                    </div>

                    <div className='row'>
                    <div className='col-12 form-group'>
                    <label> <FormattedMessage id="patient.bookingmodal.fullname"/> </label>
                    <input className='form-control'
                    value={this.state.fullname}
                    onChange={(event) => this.handleOnchangeInput(event,'fullname')}
                    ></input>
                    </div>

                    <div className='col-12 form-group'>
                    <label> <FormattedMessage id="patient.bookingmodal.phonenumber"/> </label>
                    <input className='form-control'
                    value={this.state.phonenumber}
                    onChange={(event) => this.handleOnchangeInput(event,'phonenumber')}
                    ></input>
                    </div>

                    <div className='col-12 form-group'>
                    <label> <FormattedMessage id="patient.bookingmodal.address"/> </label>
                    <input className='form-control'
                    value={this.state.address}
                    onChange={(event) => this.handleOnchangeInput(event,'address')}
                    ></input>
                    </div>

                    <div className='col-12 form-group'>
                    <label> <FormattedMessage id="patient.bookingmodal.email"/> </label>
                    <input className='form-control'
                    value={this.state.email}
                    onChange={(event) => this.handleOnchangeInput(event,'email')}
                    ></input>
                    </div>

                    <div className='col-12 form-group'>
                    <label> <FormattedMessage id="patient.bookingmodal.medicalreasons"/> </label>
                    <input className='form-control'></input>
                    </div>

                    <div className='col-12 form-group'>
                    <label> <FormattedMessage id="patient.bookingmodal.b???thday"/> </label>
                    <DatePicker
                    onChange={this.handeOnchangeDatePiker}
                    className="form-control"
                    value={this.state.birthday}
                    
                    />
                    </div>

                    <div className='col-12 form-group'>
                    <label> <FormattedMessage id="patient.bookingmodal.gender"/> </label>
                    <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                    />
                    </div>

                    </div>

                </div>
                <div className='booking-modal-footer'>
                <button className='btn-booking-confirm'
                onClick={() => this.handleConfirmBooking()}
                > <FormattedMessage id="patient.bookingmodal.confirm"/> </button>
                <button className='btn-booking-cancle'
                onClick={closeBookingModal}
                > <FormattedMessage id="patient.bookingmodal.cancle"/> </button>
                </div>

            </div>
            </Modal>
          </div>
          </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
