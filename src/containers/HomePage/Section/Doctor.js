import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';
import Slider from "react-slick";
import {LANGUAGES} from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

// import doctor1 from "../../../assets/images/doctor1.jpg";
// import doctor2 from "../../../assets/images/doctor2.jpg";
// import doctor3 from "../../../assets/images/doctor3.jpg";
// import doctor4 from "../../../assets/images/doctor4.jpg";
// import doctor5 from "../../../assets/images/doctor5.png";
// import doctor6 from "../../../assets/images/doctor6.png";
// import doctor7 from "../../../assets/images/doctor7.png";
// import doctor8 from "../../../assets/images/doctor8.png";
// import doctor9 from "../../../assets/images/doctor9.png";
// import doctor10 from "../../../assets/images/doctor10.png";


class Doctor extends Component { 


constructor(props){
  super(props)
    this.state = {
      arrDoctors:[]
    }
}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
      this.setState({
        arrDoctors: this.props.topDoctorsRedux
      })
    }
  }
  componentDidMount(){
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    if(this.props.history){
    this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
  }

    render() {
      let arrDoctors = this.state.arrDoctors;
      let {language} = this.props;
      return (
            <div className='section-doctor-all'>
            <div className='section-container'>
            <div className='section-header'>
             <span className='title-section'>
             <FormattedMessage id="homepage.outstandingdoctor"/>
             </span>
             <button className='btn-section'>
             <FormattedMessage id="homepage.search"/>
             </button>
            </div>
            <div className='section-body'>
               <Slider {...this.props.settings}>

              
               {arrDoctors && arrDoctors.length >0
               && arrDoctors.map((item,index) => {
                let imageBase64 = ''; 
                if(item.image){
                  imageBase64 = new Buffer (item.image, 'base64').toString('binary');
                   }
                let name_Vi = `${item.positionData.value_Vi}, ${item.lastName} ${item.firstName} `;
                let name_En = `${item.positionData.value_En}, ${item.firstName} ${item.lastName}  `;
                return(
                  <div className='section-all' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
               <div className='section-customize'>
               <div className='section-doctor'>
             <img className='image' 
              style={{backgroundImage: `url(${imageBase64})` }}

             />
             <div className='text-doctor'><b>{language ===LANGUAGES.VI ? name_Vi : name_En}</b></div>
           </div>
           <div className='text-doctor1'>Chuy??n khoa t??? t??? t???o</div>
           </div>
           </div>
                )
               })}
              {/* <div className='section-all'>
               <div className='section-customize'><div className='section-doctor'>
              <img className='image' src={doctor2}/>
             <div className='text-doctor'><b>B??c s?? Nguy???n V??n B</b></div>
             </div>
             <div className='text-doctor1'>S???c kho??? t??m th???n</div>
             </div>
              </div>
           
            <div className='section-all'>
             <div className='section-customize'>
           <div className='section-doctor'>
           <img className='image' src={doctor3}/>
             <div className='text-doctor'><b>B??c s?? Nguy???n V??n C</b></div>
           </div>
           <div className='text-doctor1'>Chuy??n khoa m???t</div>
           </div>
            </div>
           
          
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-doctor'>
           <img className='image' src={doctor4}/>
             <div className='text-doctor'><b>B??c s?? Nguy???n V??n D</b></div>
           </div>
           <div className='text-doctor1'>D??? ???ng mi???n d???ch - H?? h???p - Ph???i</div>
           </div>
           </div>
           
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-doctor'>
           <img className='image' src={doctor5}/>
             <div className='text-doctor'><b>B??c s?? Nguy???n V??n E</b></div>
           </div>
           <div className='text-doctor1'>Ti??u ho?? - B???nh vi??m gan</div>
           </div>
           </div>
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-doctor'>
           <img className='image' src={doctor6}/>
             <div className='text-doctor'><b>B??c s?? Nguy???n V??n F</b></div>
           </div>
           <div className='text-doctor1'>V?? sinh - Hi???m mu???n</div>
           </div>
           </div>
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-doctor'>
           <img className='image' src={doctor7}/>
             <div className='text-doctor'><b>B??c s?? Nguy???n V??n G</b></div>
           </div>
           <div className='text-doctor1'>S???n ph??? khoa</div>
           </div>
           
           </div>
          
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-doctor'>
           <img className='image' src={doctor8}/>
             <div className='text-doctor'><b>B??c s?? Nguy???n V??n H</b></div>
           </div>
           <div className='text-doctor1'>Tai m??i h???ng nhi khoa</div>
           </div>   
           </div>
              
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-doctor'>
           <img className='image' src={doctor9}/>
             <div className='text-doctor'><b>B??c s?? Nguy???n V??n J</b></div>
           </div>
           <div className='text-doctor1'>S???c kho??? t??m th???n - t?? v???n tr??? li???u t??m l??</div>
           </div>
           </div>
           
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-doctor'>
           <img className='image' src={doctor10}/>
          <div className='text-doctor'><b>B??c s?? Nguy???n V??n K</b></div>
           </div>
           <div className='text-doctor1'>Da li???u</div>
           </div>
           </div> */}

               </Slider>
            </div>
            </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
      loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
