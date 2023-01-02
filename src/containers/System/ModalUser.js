import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
class ModalUser extends Component {

constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
    }
    this.listenToEmitter();
}
listenToEmitter(){
  emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
    // reset state
    this.setState({
      email:'',
      password:'',
       firstName:'',
      lastName:'',
      address:'',
    })
  })
}

    componentDidMount() {
      console.log('Mouting modal')
    }
toggle = () => {
    this.props.toggleFromParent();

}
handeOnchangeInput = (event, id) => {
  // code 1
  // this.state[id] = event.target.value;
  // this.setState({
  //   ...this.state
  // }, () => {
  //   console.log('check bad state :', this.state)
  // })
  // code 2
  let copystate = {...this.state};
  copystate[id] = event.target.value;

  this.setState({
    ...copystate
  });
}
    checkValideInput = () => {
      let isValid = true;
      let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
      for(let i = 0; i < arrInput.length; i++){
        console.log('check inside loop',this.state[arrInput[i]], arrInput[i])
        if(!this.state[arrInput[i]]){
          isValid = false;
          alert('Missing Parameter: ' + arrInput[i]);
          break;
        }
      }
      return isValid;
    }
    handleAddNewUser = () => {
      let isValid = this.checkValideInput();
      if(isValid === true){
          // call API
          this.props.createNewUser(this.state);

      }
    }
    render() {

        return (
        <Modal isOpen={this.props.isOpen} toggle={() => {this.toggle()}} className = {'modal-user-container'}
        size='lg' 
        >
        <ModalHeader toggle={() => {this.toggle()}}>Thêm mới tài khoản</ModalHeader>
        <ModalBody>
                <div className='modal-user-body'> 
                <div className='input-container'>
                <label>Email</label>
                <input type='text' 
                onChange={(event)=> {this.handeOnchangeInput(event, 'email')}}
                  value={this.state.email}
                />

                </div>
                <div className='input-container'>
                <label>Password</label>
                <input type='password' 
                onChange={(event)=> {this.handeOnchangeInput(event, 'password')}}
                  value={this.state.password}
                />

          </div>
          <div className='input-container'>
                <label>First Name</label>
                <input type='text' 
                onChange={(event)=> {this.handeOnchangeInput(event, 'firstName')}}
                value={this.state.firstName}

                />

          </div>
          <div className='input-container'>
                <label>Last Name</label>
                <input type='text' 
                onChange={(event)=> {this.handeOnchangeInput(event, 'lastName')}}
                value={this.state.lastName}

                />

          </div>
          <div className='input-container max-width-input'>
                <label>Address</label>
                <input type='text' 
                onChange={(event)=> {this.handeOnchangeInput(event, 'address')}}
                value={this.state.address}

                />

          </div>
                </div>
                
        </ModalBody>
        <ModalFooter>
          <Button color="primary" 
          className='px-3' 
          onClick={() => {this.handleAddNewUser() }}>
            Tạo Mới
          </Button>{' '}
          <Button color="secondary" className='px-3' onClick={() => {this.toggle()}}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal>        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





