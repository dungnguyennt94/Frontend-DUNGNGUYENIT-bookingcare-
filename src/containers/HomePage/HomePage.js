import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import Doctor from './Section/Doctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class HomePage extends Component {
    // handleAfterChange = (index, dontAnimate) => {
    //     console.log('DUNGNGUYEN IT :', index)
    // }
    render() {
        
        let settings = {
            breakpoint:1025,
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            // slickGoTo: this.handleAfterChange
            // nextArrow: <SampleNextArrow/>,
            // prevArrow: <SamplePrevArrow/>
        };
        return (
           <div className='Home'>
            <HomeHeader isshowBanner={true}/>
            <Specialty settings={settings}/>
            <MedicalFacility settings={settings}/>
            <Doctor settings={settings}/>
            <HandBook settings={settings}/>
            <About/>
            <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
