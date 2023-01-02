import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../../System/Doctor/DoctorExtraInfor';
import ProfileDoctor from '../../System/Doctor/Modal/ProfileDoctor';
import { getAllDetailSpecialtyById, getAllCodeService, getAllDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {
    constructor(props){
        super(props);
        this.state={
        arrDoctorId: [],
        dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            
            let res = await getAllDetailClinicById({
                id: id,
            });

            if(res && res.errCode === 0 ){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)

                        })
                    }
                }
    
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot){    
        if(this.props.language !== prevProps.language){
           
        }
    }

    render() {
       let {arrDoctorId, dataDetailClinic} = this.state;
       console.log('DN IT check state',this.state)
        let {language} =  this.props;
        return (
            <div className='detail-clinic-container'>
            <HomeHeader />
            <div className='detail-clinic-body'>
           
            <div className='description-clinic'>
            {dataDetailClinic && !_.isEmpty(dataDetailClinic)
            &&
                <>
                <div className='Namehospital'>{dataDetailClinic.name}</div>
                <div dangerouslySetInnerHTML={{__html:dataDetailClinic.descriptionHTML }}> 
                </div>
                </>
            }
            </div> 
           
            {arrDoctorId && arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
                return(
            <div className='each-doctor' key = {index}>
            <div className='content-left-dt'>
            <ProfileDoctor
                doctorId={item}
                isShowDescriptionDoctor ={true}
                isShowLinkDetail={true}
                isShowPrice={false}
            />
            </div>

            <div className='content-right-dt'>
            <div className='profile-doctor'>
            
            </div>
            <div className='doctor-schedule'>
            <DoctorSchedule
            doctorIdFromParent={item}
            />
            </div>
            
            <div className='doctor-extra-infor'>
            <DoctorExtraInfor
            doctorIdFromParent={item}
            />
            </div>

            </div>
            </div>   
            )
            })
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
