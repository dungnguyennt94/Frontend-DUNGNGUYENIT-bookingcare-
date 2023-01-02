import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';

import Slider from "react-slick";
class HomeFooter extends Component { 

    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2022 DUNG NGUYEN_DEV. More infomation.Please visit my youtube channel.
                <a target='blank' href='https://www.youtube.com/channel/UCSmrEtIMNE6sykBdxRCDE4w'>
                 &#8594; Click here	&#8592; </a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
