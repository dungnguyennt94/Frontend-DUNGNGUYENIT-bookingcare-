import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import userService from '../../services/userService';
import { handleLoginApi } from '../../services/userService';
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { userLoginSuccess } from '../../store/actions';
import e from 'cors';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            isshowPassword:false,
            errMessage:''
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin= async ()=>{
        this.setState({
            errMessage:''
        })
        try{
            let data = await handleLoginApi(this.state.username, this.state.password);

            if(data && data.errCode !==0 ){
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
                console.log('Login Succeeds')
            }
        }catch(error){
           if(error.response){
            if(error.response.data){
                this.setState({
                errMessage: error.response.data.message
                })
            }
           }
            // console.log(e);
            console.log('hoi DUNGNGUYEN', error.response);
            
        }
    }
    handleShowHidePassword = () =>{
        this.setState({
            isshowPassword: !this.state.isshowPassword
        })
    }

    handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            this.handleLogin();
        }
    }
    render() {
        return (
            <div className='login-background'>
            <div className='login-container'>
            <div className='login-content'>
                <div className='col-12 login-text'>
                    Đăng Nhập
                </div>
                <div className='col-12 form-group login-input' >
                   <label>Tên đăng nhập:</label> 
                   <input type="text" className='form-control' placeholder='Nhập tên đăng nhập'
                    value={this.state.username}
                    onChange={(event) => this.handleOnChangeUsername(event)}
                   />
                </div>
                <div className='col-12 form-group login-input'>
                   <label>Mật khẩu:</label> 
                   <div className='custom-input-pasword' >
                   <input
                    className='form-control'
                    type={this.state.isshowPassword ?'text' : 'password' } placeholder='Nhập mật khẩu'

                    onChange={(event)=>{this.handleOnChangePassword(event)}}
                    onKeyDown={(event) => this.handleKeyDown(event)}
                   />
                   
                  <span
                  onClick ={() => { this.handleShowHidePassword()}}>
                  <i className={this.state.isshowPassword ? 'fas fa-eye': 'fas fa-eye-slash' } ></i>
                  </span>
                    
                    
                   </div>
                </div>
                <div className ='col-12' style={{color:'red'}}>
                        {this.state.errMessage}
                   </div>
                <button className='btn-login' onClick={() => {this.handleLogin()}}>Đăng Nhập</button>
            <div className='col-12'>
                <span className='fogot-password'> Quên mật khẩu </span>
            </div>
            </div>
            
            <div className='col-12 text-center'>
                <span className='text-oder-login'>Hoặc đăng nhập với</span>
            </div>
            <div className='col-12 social-login'>  
            <i className="fab fa-google-plus-g google"></i> 
            <i className='fab fa-facebook-f facebook'></i> 
            </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
