import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from '../../System/Doctor/DoctorExtraInfor';
// import LikeAndShare from '../Doctor/SocialPlugin/LikeAndShare';
// import Comment from '../Doctor/SocialPlugin/Comment';

class DetailDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId:-1,
        }
    }
    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.data,
                    
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
       
      }
    render() {
        let{detailDoctor} = this.state;
        let {language}= this.props;
        let name_Vi='', name_En ='';
        if(detailDoctor && detailDoctor.positionData){
             name_Vi = `${detailDoctor.positionData.value_Vi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
             name_En = `${detailDoctor.positionData.value_En}, ${detailDoctor.firstName} ${detailDoctor.lastName}  `;
    
        }

        // let currentURL = process.env.REACT_APP_IS_LOCALHOST === true ?
        // "https://dungnguyenIT-bot-tv.herokuapp.com/": window.location.href;
       
        return (
            <> 
            <HomeHeader isshowBanner={false}/>
            <div className='doctor-detail-container'>
            <div className='intro-doctor'>
                <div className='content-left'           
                style={{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image:'' })` }}>
                </div>

                <div className='content-right'>
                    <div className='up'>
                    {language === LANGUAGES.VI ? name_Vi: name_En}
                    </div>
                    <div className='down'>
                        {detailDoctor && detailDoctor.Markdown &&  detailDoctor.Markdown.description &&
                        <span>
                            {detailDoctor.Markdown.description}
                        </span>}
                        <div className='like-share-plugin'>
                            {/* <LikeAndShare
                                // dataHref={currentURL}
                            /> */}
                        </div>
                    </div>
                </div>

            </div>

            <div className='schedule-doctor'>
            <div className='content-left'>
                <DoctorSchedule
                    doctorIdFromParent={this.state.currentDoctorId}
                />
            </div>
            <div className='content-right'>
                <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId}/>
            </div>
            </div>

            <div className='detail-infor-doctor'>
                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                && <div dangerouslySetInnerHTML={{__html:detailDoctor.Markdown.contentHTML }}>
                    
                </div>}
            </div>

            <div className='comment-doctor'>
                {/* <Comment
                    datHref={currentURL}
                    width = {"100%"}
                /> */}
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
