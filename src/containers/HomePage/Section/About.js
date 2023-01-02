import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';
import Slider from "react-slick";
import contentright from "../../../assets/images/contentright.png";

class About extends Component { 

    render() {

        return (
            <div className='section-about'>
                <div className='section-about-header'>
                    Tuyền thông nói về Phượt
                </div>
                <div className='section-about-content'>
                <div className='content-left'> 
                <iframe width="650px" height="500px"
                 src="https://www.youtube.com/embed/mc3psqyjsVg" 
                 title="Cung trị An Cuối Tuần With my Friend 
                 ( Mùa Nước Nỗi - Yên Bình )" frameborder="0" 
                 allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen></iframe>
                </div>
                <div className='content-right'>
                <img className='image' src={contentright}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
