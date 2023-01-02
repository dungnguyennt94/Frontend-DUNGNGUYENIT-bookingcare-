import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandBook.scss';
import Slider from "react-slick";
import bacsi10 from "../../../assets/images/bacsi10.jpg";
import benhvien7 from "../../../assets/images/benhvien7.jpg";
import bacsithan10 from "../../../assets/images/bacsithan10.jpg";
import bacsi9 from "../../../assets/images/bacsi9.jpg";
import bacsi7 from "../../../assets/images/bacsi7.jpg";
import diachi7 from "../../../assets/images/diachi7.jpg";
import diemtest5 from "../../../assets/images/diemtest5.jpg";
import diachi5 from "../../../assets/images/diachi5.png";
import reviewchitiet from "../../../assets/images/reviewchitiet.png";
import luungay5 from "../../../assets/images/luungay5.png";
class HandBook extends Component { 

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            // nextArrow: <SampleNextArrow/>,
            // prevArrow: <SamplePrevArrow/>
        };
        return (
            
            <div className='section-handbook-all'>
            <div className='section-container'>
            <div className='section-header'>
             <span className='title-section'>Cẩm nang</span>
             <button className='btn-section'>TẤT CẢ BÀI VIẾT</button>
            </div>
            <div className='section-body'>
               <Slider {...this.props.settings}>
               <div className='section-all'>
               <div className='section-customize'>
               <div className='section-handbook'>
             <img className='image' src={bacsi10}/>
             <div className='text-handbook'><b>10 Bác sĩ Cơ xương khớp giỏi tại Hà Nội</b></div>
           </div>
           </div>
               </div>
               
               <div className='section-all'>
               <div className='section-customize'>
               <div className='section-handbook'>
              <img className='image' src={benhvien7}/>
             <div className='text-handbook'><b>7 bệnh viện, phòng khám Cơ xương khớp uy tín ở Hà Nội</b></div>
             </div>
             </div>
               </div>
           
             <div className='section-all'>
             <div className='section-customize'>
           <div className='section-handbook'>
           <img className='image' src={bacsithan10}/>
             <div className='text-handbook'><b>10 bác sĩ Thần kinh giỏi và nhiều kinh nghiệm ở Hà Nội</b></div>
           </div>
           </div>
             </div>
          
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-handbook'>
           <img className='image' src={bacsi9}/>
             <div className='text-handbook'><b>9 bác sĩ khám chữa Tim mạch giỏi tại Hà Nội</b></div>
           </div>
           </div>
           </div>
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-handbook'>
           <img className='image' src={bacsi7}/>
             <div className='text-handbook'><b>7 bác sĩ Cột sống giỏi và nhiều kinh nghiệm tại Hà Nội</b></div>
           </div>
           </div>
           </div>
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-handbook'>
           <img className='image' src={diachi7}/>
             <div className='text-handbook'><b>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM</b></div>
           </div>
           </div>
           </div>
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-handbook'>
           <img className='image' src={diemtest5}/>
             <div className='text-handbook'><b>5 điểm Test nhanh Covid-19 uy tín ở Hà Nội</b></div>
           </div>
           </div>
           </div>
          
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-handbook'>
           <img className='image' src={diachi5}/>
             <div className='text-handbook'><b>5 Địa chỉ Nha khoa uy tín với đội ngũ bác sĩ trên 10 năm kinh nghiệm tại TP.HCM</b></div>
           </div>
           </div>   
           </div>    
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-handbook'>
           <img className='image' src={reviewchitiet}/>
             <div className='text-handbook'><b>Review chi tiết 5 bệnh viện, phòng khám Tai mũi họng Thủ Đức uy tín</b></div>
           </div>
           </div>
           </div>
           
           <div className='section-all'>
           <div className='section-customize'>
           <div className='section-handbook'>
           <img className='image' src={luungay5}/>
             <div className='text-handbook'><b>Lưu ngay 5 Phòng khám Tai mũi họng Gò Vấp có bác sĩ giỏi, uy tín</b></div>
           </div>
           </div>
           </div>
 
               </Slider>
            </div>
            
            </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
