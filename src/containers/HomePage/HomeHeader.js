import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.svg';
import {FormattedMessage} from 'react-intl';
import {LANGUAGES} from "../../utils"; 
import {changeLanguageApp} from '../../store/actions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    returnHome = () => {
        if(this.props.history){
            this.props.history.push(`/home`)
      
          }
    }
    render() {
            let language = this.props.language;
        return ( 
            <React.Fragment>
            <div className='home-header-container'> 
                <div className='home-header-content'>
                    <div className='left-content'>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                    <img className='header-logo' src={logo} onClick={() => {this.returnHome()}}/>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                                <div><b> <FormattedMessage id='homeheader.chuyenkhoa'/> </b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.timtheobacsichuyenkhoa'/></div>
                        </div>
                        <div className='child-content'>
                        <div><b><FormattedMessage id='homeheader.cosoyte'/></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.chonbenhvienphongkham'/></div>
                        </div>
                        <div className='child-content'>
                        <div><b><FormattedMessage id='homeheader.bacsi'/></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.chonbacsigioi'/></div>
                        </div>
                        <div className='child-content'>
                        <div><b><FormattedMessage id='homeheader.goikham'/></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.khamsuckhoetongquat'/></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'><i className="fas fa-question-circle" ><FormattedMessage id='homeheader.hotro'/></i></div>
                        <div className={language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                        <div className={language === LANGUAGES.EN ? 'language-en action' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                    </div>
                </div>
            </div>
            {this.props.isshowBanner === true && 
            <div className='home-header-banner'>
                <div className='content-up'>
                <div className='title1'><FormattedMessage id='homeheader.nentangyte'/></div>
                <div className='title2'><FormattedMessage id='homeheader.chamsocsuckhoetoandien'/></div>
                <div className='Search'>
                <i className="fa fa-search" aria-hidden="true"></i>
                    <input type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                </div>
                </div>
                <div className='content-down'>
                <div className='Options'>
                    <div className='option-child'>
                        <div className='icon-khamchuyenkhoa'></div>
                        <div className='text-khamchuyenkhoa'><FormattedMessage id='homeheader.khamchuyenkhoa'/></div>
                    </div>
                    <div className='option-child1'>
                        <div className='icon-khamtuxa'></div>
                        <div className='text-khamtuxa'><FormattedMessage id='homeheader.khamtuxa'/></div>
                    </div>
                    <div className='option-child2'>
                        <div className='icon-khamtongquat'></div>
                        <div className='text-khamtongquat'><FormattedMessage id='homeheader.khamtongquat'/></div>
                    </div>
                    <div className='option-child3'>
                        <div className='icon-xetnghiemyhoc'></div>
                        <div className='text-xetnghiemyhoc'><FormattedMessage id='homeheader.xetnghiemyhoc'/></div>
                    </div>
                    <div className='option-child4'>
                        <div className='icon-suckhoetinhthan'></div>
                        <div className='text-suckhoetinhthan'><FormattedMessage id='homeheader.suckhoetinhthan'/></div>
                    </div>
                    <div className='option-child5'>
                        <div className='icon-khamnhakhoa'></div>
                        <div className='text-khamnhakhoa'><FormattedMessage id='homeheader.khamnhakhoa'/></div>
                    </div>
                    <div className='option-child6'>
                        <div className='icon-goiphauthuat'></div>
                        <div className='text-goiphauthuat'><FormattedMessage id='homeheader.goiphauthuat'/></div>
                    </div>
                    <div className='option-child7'>
                        <div className='icon-sanphamyte'></div>
                        <div className='text-sanphamyte'><FormattedMessage id='homeheader.sanphamyte'/></div>
                    </div>
                    <div className='option-child8'>
                        <div className='icon-suckhoedoanhnghiep'></div>
                        <div className='text-suckhoedoanhnghiep'><FormattedMessage id='homeheader.suckhoedoanhnghiep'/></div>
                    </div>
                    </div>
                </div>
            </div>
            }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
