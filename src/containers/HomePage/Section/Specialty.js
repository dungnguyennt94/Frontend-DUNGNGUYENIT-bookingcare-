import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import {FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';

// import coxuongkhop from "../../../assets/images/imgcoxuongkhop.jpg";
// import thankinh from "../../../assets/images/imgthankinh.jpg";
// import tieuhoa from "../../../assets/images/imgtieuhoa.jpg";
// import timmach from "../../../assets/images/imgtimmach.jpg";
// import taimuihong from "../../../assets/images/imgtaimuihong.jpg";
// import cotsong from "../../../assets/images/imgcotsong.jpg";
// import yhoccotruyen from "../../../assets/images/imgyhoccotruyen.jpg";
// import chamcuu from "../../../assets/images/imgchamcuu.jpg";
// import sanphukhoa from "../../../assets/images/imgsanphukhoa.jpg";
// import sieuamthai from "../../../assets/images/imgsieuamthai.jpg";
// import nhikhoa from "../../../assets/images/imgnhikhoa.jpg";
// import dalieu from "../../../assets/images/imgdalieu.jpg";
// import benhviemgan from "../../../assets/images/imgbenhviemgan.jpg";
// import suckhoetamthan from "../../../assets/images/imgsuckhoetamthan.jpg";
// import diungmiendich from "../../../assets/images/imgdiungmiendich.jpg";
// import hohapphoi from "../../../assets/images/imghohapphoi.jpg";
// import ngoaithankinh from "../../../assets/images/imgngoaithankinh.jpg";
// import namhoc from "../../../assets/images/imgnamhoc.jpg";
// import chuyenkhoamat from "../../../assets/images/imgchuyenkhoamat.jpg";
// import thantietnieu from "../../../assets/images/imgthantietnieu.jpg";
// import noikhoa from "../../../assets/images/imgnoikhoa.jpg";
// import nhakhoa from "../../../assets/images/imgnhakhoa.jpg";
// import tieuduongnoitiet from "../../../assets/images/imgtieuduongnoitiet.jpg";
// import phuchoichucnang from "../../../assets/images/imgphuchoichucnang.jpg";
// import chupconghuongtu from "../../../assets/images/imgchupconghuongtu.jpg";
// import chupcatlopvitinh from "../../../assets/images/imgchupcatlopvitinh.jpg";
// import noisoitieuhoa from "../../../assets/images/imgnoisoitieuhoa.jpg";
// import chuppetct from "../../../assets/images/imgchuppetct.jpg";
// import ungbuou from "../../../assets/images/imgungbuou.jpg";
// import dalieuthammy from "../../../assets/images/imgdalieuthammy.jpg";
// import truyennhiem from "../../../assets/images/imgtruyennhiem.jpg";
// import bacsigiadinh from "../../../assets/images/imgbacsigiadinh.jpg";
// import taohinhhammat from "../../../assets/images/imgtaohinhhammat.jpg";
// import tuvantrilieutamli from "../../../assets/images/imgtuvantrilieutamli.jpg";
// import vosinhhiemmuon from "../../../assets/images/imgvosinhhiemmuon.jpg";
// import chanthuongchinhhinh from "../../../assets/images/imgchanthuongchinhhinh.jpg";


class Specialty extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSpecialty: [],
    }
  }
    async componentDidMount (){
      let res = await getAllSpecialty();
      console.log('DN IT check res', res)
      if(res && res.errCode === 0){
        this.setState({
          dataSpecialty: res.data ? res.data : []
        })
      }
     }

     handleViewDetailSpecialty = (item) =>{
      if(this.props.history){
        this.props.history.push(`/detail-specialty/${item.id}`)
     }
    }
    render() {
      let {dataSpecialty} = this.state;
        
        return ( 
           <div className='section-specialty-all'>
           <div className='section-container'>
           <div className='section-header'>
            <span className='title-section'><FormattedMessage id="homepage.popularspecialty"/></span>
            <button className='btn-section'><FormattedMessage id="homepage.moreinfor"/></button>
           </div>
           <div className='section-body'>
              <Slider {...this.props.settings}>
              {dataSpecialty && dataSpecialty.length > 0 &&
              dataSpecialty.map((item, index) => {
                return(
              <div className='section-all' key ={index}
               onClick={() => this.handleViewDetailSpecialty(item)}
              >
               <div className='section-customize'>
               <div className='section-specialty'>
               <div className='image'
                style={{backgroundImage: `url(${item.image})` }}
               >
               
           </div>
           </div>
           
           <div className='text-specialty'>{item.name}</div>
           </div>
            </div>
                )
              })
              }
              <>
{/* <div className='section-all'>
               <div className='section-customize'>
               <div className='section-specialty'>
             <img className='image' src={coxuongkhop}/>
             <div className='text-handbook'>C?? x????ng kh???p</div>
           </div>
           </div>
            </div>
          <div className='section-specialty'>
          <img src={thankinh}/>
            <div className='text-chuyenkhoa'>Th???n kinh</div>
          </div>
          <div className='section-specialty'>
          <img src={tieuhoa}/>
            <div className='text-chuyenkhoa'>Ti??u ho??</div>
          </div>
          <div className='section-specialty'>
          <img src={timmach}/>
            <div className='text-chuyenkhoa'>Tim m???ch</div>
          </div>
          <div className='section-specialty'>
          <img src={taimuihong}/>
            <div className='text-chuyenkhoa'>Tai m??i h???ng</div>
          </div>
          <div className='section-specialty'>
          <img src={cotsong}/>
            <div className='text-chuyenkhoa'>C???t s???ng</div>
          </div>
          <div className='section-specialty'>
          <img src={yhoccotruyen}/>
            <div className='text-chuyenkhoa'>Y h???c c??? truy???n</div>
          </div>
          <div className='section-specialty'>
          <img src={chamcuu}/>
            <div className='text-chuyenkhoa'>Ch??m c???u</div>
          </div>
          <div className='section-specialty'>
          <img src={sanphukhoa}/>
            <div className='text-chuyenkhoa'>S???n ph??? khoa</div>
          </div>
          <div className='section-specialty'>
          <img src={sieuamthai}/>
            <div className='text-chuyenkhoa'>Si??u ??m thai</div>
            </div>
            <div className='section-specialty'>
          <img src={nhikhoa}/>
            <div className='text-chuyenkhoa'>Nhi khoa</div>
          </div>
          <div className='section-specialty'>
          <img src={dalieu}/>
            <div className='text-chuyenkhoa'>Da li???u</div>
          </div>
          <div className='section-specialty'>
          <img src={benhviemgan}/>
            <div className='text-chuyenkhoa'>B???nh vi??m gan</div>
          </div>
          <div className='section-specialty'>
          <img src={suckhoetamthan}/>
            <div className='text-chuyenkhoa'>S???c kho??? t??m th???n</div>
          </div>
          <div className='section-specialty'>
          <img src={diungmiendich}/>
            <div className='text-chuyenkhoa'>D??? ???ng mi???n d???ch</div>
          </div>
          <div className='section-specialty'>
          <img src={hohapphoi}/>
            <div className='text-chuyenkhoa'>H?? h???p ph???i</div>
          </div>
          <div className='section-specialty'>
          <img src={ngoaithankinh}/>
            <div className='text-chuyenkhoa'>Ngo???i th???n kinh</div>
          </div>
          <div className='section-specialty'>
          <img src={namhoc}/>
            <div className='text-chuyenkhoa'>Nam h???c</div>
          </div>
          <div className='section-specialty'>
          <img src={chuyenkhoamat}/>
            <div className='text-chuyenkhoa'>Chuy??n khoa m???t</div>
          </div>
          <div className='section-specialty'>
          <img src={thantietnieu}/>
            <div className='text-chuyenkhoa'>Th???n - Ti???t ni???u</div>
          </div>
          <div className='section-specialty'>
          <img src={noikhoa}/>
            <div className='text-chuyenkhoa'>N???i khoa</div>
          </div>
          <div className='section-specialty'>
          <img src={nhakhoa}/>
            <div className='text-chuyenkhoa'>Nha Khoa</div>
          </div>
          <div className='section-specialty'>
          <img src={tieuduongnoitiet}/>
            <div className='text-chuyenkhoa'>Ti???u ???????ng n???i ti???t</div>
          </div>
          <div className='section-specialty'>
          <img src={phuchoichucnang}/>
            <div className='text-chuyenkhoa'>Ph???c h???i ch???c n??ng</div>
          </div>
          <div className='section-specialty'>
          <img src={chupconghuongtu}/>
            <div className='text-chuyenkhoa'>Ch???p c???ng h?????ng t???</div>
          </div>
          <div className='section-specialty'>
          <img src={chupcatlopvitinh}/>
            <div className='text-chuyenkhoa'>Ch???p c???t l???p vi t??nh</div>
          </div>
          <div className='section-specialty'>
          <img src={noisoitieuhoa}/>
            <div className='text-chuyenkhoa'>N???i soi ti??u ho??</div>
          </div>
          <div className='section-specialty'>
          <img src={chuppetct}/>
            <div className='text-chuyenkhoa'>Ch???p PET/CT</div>
          </div>
          <div className='section-specialty'>
          <img src={ungbuou}/>
            <div className='text-chuyenkhoa'>Ung b?????u</div>
          </div>
          <div className='section-specialty'>
          <img src={dalieuthammy}/>
            <div className='text-chuyenkhoa'>Da li???u th???m m???</div>
          </div>
          <div className='section-specialty'>
          <img src={truyennhiem}/>
            <div className='text-chuyenkhoa'>Truy???n nhi???m</div>
          </div>
          <div className='section-specialty'>
          <img src={bacsigiadinh}/>
            <div className='text-chuyenkhoa'>B??c s?? gia ????nh</div>
          </div>
          <div className='section-specialty'>
          <img src={taohinhhammat}/>
            <div className='text-chuyenkhoa'>T???o h??nh h??m m???t</div>
          </div>
          <div className='section-specialty'>
          <img src={tuvantrilieutamli}/>
            <div className='text-chuyenkhoa'>T?? v???n tr??? li???u, t??m l??</div>
          </div>
          <div className='section-specialty'>
          <img src={vosinhhiemmuon}/>
            <div className='text-chuyenkhoa'>V?? sinh - Hi???m mu???n</div>
          </div>
          <div className='section-specialty'>
          <img src={chanthuongchinhhinh}/>
            <div className='text-chuyenkhoa'>Ch???n th????ng ch???nh h??nh</div>
          </div> */}
              </>
              
          
          
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
        language: state.app.language,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
