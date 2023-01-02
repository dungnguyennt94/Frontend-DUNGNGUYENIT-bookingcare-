import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props){
        super(props);
        this.state={
            currentDate:  moment(new Date()).startOf('day').valueOf(),
            dataPatient:[],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {
        
        this.getDataPatient()
    }
    getDataPatient = async () => {
        let {user} = this.props;
        let {currentDate} = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId : user.id,
            date: formatedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot){    
        if(this.props.language !== prevProps.language){
           
        }
    }

    handeOnchangeDatePiker = (date) => {
        this.setState({
            currentDate: date[0],
        }, async() => {
          
           await this.getDataPatient() 
        }
        )
      }

    handleBtnconfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
        }

    sendRemedy = async (dataChild) => {
        let {dataModal} = this.state;
        this.setState({
            isShowLoading: true,

        })
        
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId:dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        });
       if(res && res.errCode === 0){
        this.setState({
            isShowLoading: false
        })
        toast.success('Gữi hoá đơn thành công');
        this.closeRemedyModal();
        await this.getDataPatient();
       }
       else{
        toast.error('Gữi hoá đơn thất bại')
       }
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }
    render() {
       
       let {dataPatient, isOpenRemedyModal, dataModal} = this.state;
       let {language} = this.props;
        return (
            <>
            <LoadingOverlay
            active={this.state.isShowLoading}
            spinner
            text='Loading ...'
            >
 <div className='manage-patient-container'>
           <div className='m-p-title'>
            Quản lí bệnh nhân khám bệnh
           </div>
           <div className='manage-patient-body row'>
            <div className='col-4 form-group'>
            <label>
            </label>
            <DatePicker
                onChange={this.handeOnchangeDatePiker}
                className="form-control"
                value={this.state.currentDate}
            />
            </div>
            <div className='table-manage-patient'>
<table className='table'>
    <thead>
      <tr>
      <th>Số thứ tự</th>
      <th>Thời gian</th>
        <th>Địa chỉ</th>
        <th>Họ và tên</th>
        <th>Giới tính</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    
    {dataPatient && dataPatient.length > 0 ?
        dataPatient.map((item,index) => {
            let time = language === LANGUAGES.VI ? 
            item.timeTypeDataPatient.value_Vi : item.timeTypeDataPatient.value_En;
            let gender = language === LANGUAGES.VI ?
            item.patientData.genderData.value_Vi : item.patientData.genderData.value_En;

            return(
                <tr className="table-info" key ={index}>
                <td>{index+1}</td>
                <td>{time}</td>
                <td>{item.patientData.address}</td>
                <td>{item.patientData.firstName}</td>
                <td>{gender}</td>
                <td>
                <button className='mp-btn-confirm' onClick={ () => this.handleBtnconfirm(item)}>Xác nhận</button>
                {/* <button className='mp-btn-remedy' onClick={ () => this.handleBtnRemedy}>Gữi hoá đơn</button> */}
                </td>
                </tr>  
            )
        })
        :
        <tr className="table-info">
           <td colSpan={6} style={{textAlign:'center'}}> NO DATA </td>
        </tr>
        }
          
      
      
    </tbody>
  </table>
            </div>
           </div>
          </div>
          <RemedyModal
                isOpenModal={isOpenRemedyModal}
                dataModal={dataModal}
                closeRemedyModal = {this.closeRemedyModal}
                sendRemedy = {this.sendRemedy}
            />
            
            </LoadingOverlay>
          </>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
