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
             <div className='text-handbook'>Cơ xương khớp</div>
           </div>
           </div>
            </div>
          <div className='section-specialty'>
          <img src={thankinh}/>
            <div className='text-chuyenkhoa'>Thần kinh</div>
          </div>
          <div className='section-specialty'>
          <img src={tieuhoa}/>
            <div className='text-chuyenkhoa'>Tiêu hoá</div>
          </div>
          <div className='section-specialty'>
          <img src={timmach}/>
            <div className='text-chuyenkhoa'>Tim mạch</div>
          </div>
          <div className='section-specialty'>
          <img src={taimuihong}/>
            <div className='text-chuyenkhoa'>Tai mũi họng</div>
          </div>
          <div className='section-specialty'>
          <img src={cotsong}/>
            <div className='text-chuyenkhoa'>Cột sống</div>
          </div>
          <div className='section-specialty'>
          <img src={yhoccotruyen}/>
            <div className='text-chuyenkhoa'>Y học cổ truyền</div>
          </div>
          <div className='section-specialty'>
          <img src={chamcuu}/>
            <div className='text-chuyenkhoa'>Châm cứu</div>
          </div>
          <div className='section-specialty'>
          <img src={sanphukhoa}/>
            <div className='text-chuyenkhoa'>Sản phụ khoa</div>
          </div>
          <div className='section-specialty'>
          <img src={sieuamthai}/>
            <div className='text-chuyenkhoa'>Siêu âm thai</div>
            </div>
            <div className='section-specialty'>
          <img src={nhikhoa}/>
            <div className='text-chuyenkhoa'>Nhi khoa</div>
          </div>
          <div className='section-specialty'>
          <img src={dalieu}/>
            <div className='text-chuyenkhoa'>Da liễu</div>
          </div>
          <div className='section-specialty'>
          <img src={benhviemgan}/>
            <div className='text-chuyenkhoa'>Bệnh viêm gan</div>
          </div>
          <div className='section-specialty'>
          <img src={suckhoetamthan}/>
            <div className='text-chuyenkhoa'>Sức khoẻ tâm thần</div>
          </div>
          <div className='section-specialty'>
          <img src={diungmiendich}/>
            <div className='text-chuyenkhoa'>Dị ứng miễn dịch</div>
          </div>
          <div className='section-specialty'>
          <img src={hohapphoi}/>
            <div className='text-chuyenkhoa'>Hô hấp phổi</div>
          </div>
          <div className='section-specialty'>
          <img src={ngoaithankinh}/>
            <div className='text-chuyenkhoa'>Ngoại thần kinh</div>
          </div>
          <div className='section-specialty'>
          <img src={namhoc}/>
            <div className='text-chuyenkhoa'>Nam học</div>
          </div>
          <div className='section-specialty'>
          <img src={chuyenkhoamat}/>
            <div className='text-chuyenkhoa'>Chuyên khoa mắt</div>
          </div>
          <div className='section-specialty'>
          <img src={thantietnieu}/>
            <div className='text-chuyenkhoa'>Thận - Tiết niệu</div>
          </div>
          <div className='section-specialty'>
          <img src={noikhoa}/>
            <div className='text-chuyenkhoa'>Nội khoa</div>
          </div>
          <div className='section-specialty'>
          <img src={nhakhoa}/>
            <div className='text-chuyenkhoa'>Nha Khoa</div>
          </div>
          <div className='section-specialty'>
          <img src={tieuduongnoitiet}/>
            <div className='text-chuyenkhoa'>Tiểu đường nội tiết</div>
          </div>
          <div className='section-specialty'>
          <img src={phuchoichucnang}/>
            <div className='text-chuyenkhoa'>Phục hồi chức năng</div>
          </div>
          <div className='section-specialty'>
          <img src={chupconghuongtu}/>
            <div className='text-chuyenkhoa'>Chụp cộng hưởng từ</div>
          </div>
          <div className='section-specialty'>
          <img src={chupcatlopvitinh}/>
            <div className='text-chuyenkhoa'>Chụp cắt lớp vi tính</div>
          </div>
          <div className='section-specialty'>
          <img src={noisoitieuhoa}/>
            <div className='text-chuyenkhoa'>Nội soi tiêu hoá</div>
          </div>
          <div className='section-specialty'>
          <img src={chuppetct}/>
            <div className='text-chuyenkhoa'>Chụp PET/CT</div>
          </div>
          <div className='section-specialty'>
          <img src={ungbuou}/>
            <div className='text-chuyenkhoa'>Ung bướu</div>
          </div>
          <div className='section-specialty'>
          <img src={dalieuthammy}/>
            <div className='text-chuyenkhoa'>Da liểu thẩm mỹ</div>
          </div>
          <div className='section-specialty'>
          <img src={truyennhiem}/>
            <div className='text-chuyenkhoa'>Truyền nhiễm</div>
          </div>
          <div className='section-specialty'>
          <img src={bacsigiadinh}/>
            <div className='text-chuyenkhoa'>Bác sĩ gia đình</div>
          </div>
          <div className='section-specialty'>
          <img src={taohinhhammat}/>
            <div className='text-chuyenkhoa'>Tạo hình hàm mặt</div>
          </div>
          <div className='section-specialty'>
          <img src={tuvantrilieutamli}/>
            <div className='text-chuyenkhoa'>Tư vấn trị liệu, tâm lí</div>
          </div>
          <div className='section-specialty'>
          <img src={vosinhhiemmuon}/>
            <div className='text-chuyenkhoa'>Vô sinh - Hiếm muộn</div>
          </div>
          <div className='section-specialty'>
          <img src={chanthuongchinhhinh}/>
            <div className='text-chuyenkhoa'>Chấn thương chỉnh hình</div>
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
