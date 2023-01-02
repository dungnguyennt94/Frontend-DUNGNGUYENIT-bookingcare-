import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './verifyEmail.scss';

class VerifyEmail extends Component {
    constructor(props){
        super(props);
        this.state={
      statusVerify: false,
      errCode: 0
        }
    }
    async componentDidMount() {
        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if(res && res.errCode === 0){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }else{
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
               
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot){    
        if(this.props.language !== prevProps.language){
           
        }
    }

    render() {
       let  {statusVerify, errCode} = this.state;
        return (
            <>
            <HomeHeader/>
            <div className='verify-container-email'>
            {statusVerify === false ? 
            <div> Loading Data ... !</div>
            :
            <div className='infor-booking'>
                {+errCode === 0 ?<div> Xác nhận đặt lịch khám bệnh thành công ! </div>
                :
                <div className='infor-bookking'> Lịch hẹn không tồn tại hoặc đã được xác nhận ! </div>}
            </div>
            }
            </div>
            </>
          
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
