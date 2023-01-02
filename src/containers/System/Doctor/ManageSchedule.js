import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES,dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";   
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props){
        super(props);

        this.state={
            listDoctors:[],
            selectedDoctor:{},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();

    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if( prevProps.allDoctors !== this.props.allDoctors){
         let dataSelect = this.buidDataInputSelect(this.props.allDoctors)
         this.setState({
             listDoctors: dataSelect
            
         })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            if(data && data.length > 0){
                data = data.map(item => ({ ...item, isSelected: false}))
            }
            this.setState({
                rangeTime: data
            })
        }
        

        // if(prevProps.language !== this.props.language){
        //  let dataSelect = this.buidDataInputSelect(this.props.allDoctors)
        //  this.setState({
        //      listDoctors: dataSelect
        //  })
        // }
     }

     buidDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item,index) => {
                let object = {};
                let label_Vi = ` ${item.lastName} ${item.firstName}`;
                let label_En = ` ${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? label_Vi : label_En;
                object.value = item.id;
                result.push(object)
            })
            
        }
        return result;
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor:selectedOption });
       
      };

      handeOnchangeDatePiker = (date) => {
        this.setState({
            currentDate: date[0],
        })
      }

      handleClickBtnTime = (time) => {
        let { rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
      }

      handleSaveSchedule = async () => {
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];
        if(!currentDate){
            toast.error("Chọn ngày không hợp lệ !");
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Chọn bác sĩ không hợp lệ !");
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let formatedDate = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();

        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map((schedule,index) => {
                    console.log('check schedule',schedule, index, selectedDoctor)
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.key;
                    result.push(object);

                })
            }else{
                toast.error("Chọn thời gian không hợp lệ !");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })

        if(res && res.errCode === 0){
            toast.success("Lưu lịch khám bác sĩ thành công");

        }else{
            toast.error("Lưu lịch khám bác sĩ thất bại");
            console.log("save Bulk schedule Doctor >>> ress", res)
        }
    }

    render() {
       
        let {rangeTime} = this.state;
        let {language} = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

        return (
            <div className='manage-schedule-container'>
            <div className='m-s-title'>
                <FormattedMessage id="manage-schedule.title"/>
            </div>
            <div className='container'>
            <div className='row'>
            <div className='col-6 form-group'>
            <label><FormattedMessage id="manage-schedule.selectdoctor"/></label>
            <Select
                    value={this.state.selectedDoctor}
                    onChange={this.handleChangeSelect}
                    options={this.state.listDoctors}
                />
            
            </div>
            <div className='col-6 form-group'>
            <label><FormattedMessage id="manage-schedule.selectday"/></label>
            <DatePicker
                onChange={this.handeOnchangeDatePiker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
            />
            </div>
            <div className='col-12 pick-hour-container'>
            {rangeTime && rangeTime.length > 0 &&
            rangeTime.map((item,index) => {
                return(
                    <button className={item.isSelected === true ? "btn1 active" : "btn1" }
                    key={index}
                    onClick={() => this.handleClickBtnTime(item)}
                    >
                    {language === LANGUAGES.VI ? item.value_Vi : item.value_En}
                    
                    </button>
                )
            })}
            </div>
            <div className='col12'>
            <button className='btn'
            onClick={() => this.handleSaveSchedule()}
            ><FormattedMessage id="manage-schedule.saveinformation"/></button>

            </div>
            </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
