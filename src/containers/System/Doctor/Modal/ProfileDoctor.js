import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props){
        super(props);
        this.state={
      dataProfile:{}
        }
    }
    async componentDidMount() {
       let data = await this.getInforDoctor(this.props.doctorId)
       this.setState({
        dataProfile:data
       })
    }

getInforDoctor = async (id) => {
    let result = {};
    if(id){
        let res = await getProfileDoctorById(id);
        if(res && res.errCode === 0){
        result = res.data;
    }
}return result;
}

    async componentDidUpdate(prevProps, prevState, snapshot){    
        if(this.props.language !== prevProps.language){
           
        }

    if(this.props.doctorId !== prevProps.doctorId){
    }
    }

    renderTimeBooking = (dataTime) => {
        console.log('')
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)){

            let time = language === LANGUAGES.VI ?
            dataTime.timeTypeData.value_Vi : dataTime.timeTypeData.value_En;

            let date = language === LANGUAGES.VI ? 
            moment.unix(+dataTime.date /1000).format('dddd - DD/MM/YYYY')
            :
            moment.unix(+dataTime.date /1000).locale('en').format('ddd -MM/DD/YYYY')
           
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.bookingmodal.freebooking"/></div>
                </>
            )
        }return<></>
        
    }
    render() {
        let {dataProfile} = this.state;
        let {language,isShowDescriptionDoctor, dataTime,
            doctorId, isShowPrice, isShowLinkDetail} = this.props;
      
        let name_Vi ='', name_En = '';
        if(dataProfile && dataProfile.positionData){
            name_Vi = `${dataProfile.positionData.value_Vi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
            name_En = `${dataProfile.positionData.value_En}, ${dataProfile.firstName} ${dataProfile.lastName}  `;
   
       }

        return (
          <div className='profile-doctor-container'>
           <div className='intro-doctor'>
                <div className='content-left'           
                style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image:'' })` }}>
                </div>

                <div className='content-right'>
                    <div className='up'>
                    {language === LANGUAGES.VI ? name_Vi: name_En}
                    </div>
                    <div className='down'> 

                {isShowDescriptionDoctor === true ?
                    <>
                    {dataProfile && dataProfile.Markdown &&  dataProfile.Markdown.description &&
                        <span>
                    {dataProfile.Markdown.description}
                        </span>}
                    </>
                    :
                    <>
                        {this.renderTimeBooking(dataTime)}
                    </>
                }
                    </div>
                </div>
            </div>
            {isShowLinkDetail === true && true && 
            <div className='view-detail-doctor'
            
            > 
            <Link to={`/detail-doctor/${doctorId}`}> Xem Thêm </Link>
            </div>
             }
            {isShowPrice === true && 
            <div className='price'>
            <FormattedMessage id="patient.bookingmodal.medicaprice"/> 
                {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                <NumberFormat className='currency' value={dataProfile.Doctor_Infor.priceTypeData.value_Vi }
                displayType={ 'text'}
                thousandSeparator={true} suffix={' VNĐ'}/>
                }

                {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                <NumberFormat className='currency' value={dataProfile.Doctor_Infor.priceTypeData.value_En }
                displayType={ 'text'}
                thousandSeparator={true} suffix={' USD'}/>
                }

                </div>
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
