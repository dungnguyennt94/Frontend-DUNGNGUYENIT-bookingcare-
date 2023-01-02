import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers,
     deleteUserService, editUserService,getTopDoctorHomeService,
     getAllDoctors, getAllSpecialty, getAllClinic,
     saveDetailDoctorService} from '../../services/userService';
import { toast } from "react-toastify";   

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({ 
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
               dispatch(fetchGenderSussess(res.data)) 
            }else{
               dispatch(fetchGenderFailed());
            }
        }catch(e){
           dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
    
}
export const fetchGenderSussess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data:genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionStart = () => {
    
    return async (dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
               dispatch(fetchPositionSussess(res.data)) 
            }else{
               dispatch(fetchPositionFailed());
            }
        }catch(e){
           dispatch(fetchPositionFailed());
           console.log('fetchPositionFailed error', e)

        }
    }
    
}

export const fetchRoleStart = () => {
    
    return async (dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
               dispatch(fetchRoleSussess(res.data)) 
            }else{
               dispatch(fetchRoleFailed());
            }
        }catch(e){
           dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error', e)
        }
    }
    
}




export const fetchPositionSussess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data:positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchRoleSussess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data:roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try{
            
            let res = await createNewUserService(data) ;
            toast.success("Tạo mới tài khoản thành công");
            if(res && res.errCode === 0){
               dispatch(saveUserSucess()) 
               dispatch(fetchAllUsersStart());
            }else{
               dispatch(saveUserFailed());
            }
        }catch(e){
           dispatch(saveUserFailed ());
            console.log('saveUserFail error', e)
        }
    }
}

export const saveUserSucess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0){
                
               dispatch(fetchAllUsersSussess(res.users.reverse())) 
            }else{
                toast.error("Tìm tất cả tài khoản thất bại");
                dispatch(fetchAllUsersFailed());
            }
        }catch(e){
            toast.error("Tìm tất cả tài khoản thất bại");
           dispatch(fetchAllUsersFailed());
            console.log('fetchRoleFailed error', e)
        }
    } 
}

export const fetchAllUsersSussess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users:data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try{
            
            let res = await deleteUserService(userId) ;
            toast.success("Xoá tài khoản thành công");
            if(res && res.errCode === 0){
               dispatch(deleteUserSucess()) 
               dispatch(fetchAllUsersStart());
            }else{
               dispatch(deleteUserFailed());
               toast.error("Xoá tài khoản thất bại");
            }
        }catch(e){
           dispatch(deleteUserFailed ());
           toast.error("Xoá tài khoản thất bại");
            console.log('saveUserFail error', e)
        }
    }
}

export const deleteUserSucess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try{
            
            let res = await editUserService(data) ;
            toast.success("Sửa tài khoản thành công");
            if(res && res.errCode === 0){
               dispatch(editUserSucess()) 
               dispatch(fetchAllUsersStart());
            }else{
               dispatch(editUserFailed());
               toast.error("Sửa tài khoản thất bại");
            }
        }catch(e){
           dispatch(editUserFailed ());
           toast.error("Sửa tài khoản thất bại");
            console.log('editUserFail error', e)
        }
    }
}

export const editUserSucess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

// let res1 = await getTopDoctorHomeService(3);


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getTopDoctorHomeService('');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }        
        }catch(e){
            console.log('FETCH_TOP_DOCTORS_FAILED',e )
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }        
        }catch(e){
            console.log('FETCH_ALL_DOCTORS_FAILED',e )
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await saveDetailDoctorService (data);
            if(res && res.errCode === 0){
                toast.success("Lưu thông tin Bác sĩ thành công !");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS
                    
                })
            } else {
                console.log('err res', res)
                toast.error("Lưu thông tin Bác sĩ thất bại !");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
                    
                })
            }        
        }catch(e){
            toast.error("Lưu thông tin Bác sĩ thất bại !");
            console.log('SAVE_DETAIL_DOCTOR_FAILED',e )
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }        
        }catch(e){
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED',e )
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({ 
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

           if(resPrice && resPrice.errCode ===0
            &&resPayment && resPayment.errCode ===0
            &&resProvince && resProvince.errCode === 0
            && resSpecialty && resSpecialty.errCode === 0
            && resClinic && resClinic.errCode === 0
            ){
                let data ={
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty : resSpecialty.data,
                    resClinic : resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            }else{
                dispatch(fetchRequiredDoctorInforFailed());
            }
        }catch(e){
           dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredDoctorInfor error', e)
        }
    }
    
}
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data:allRequiredData
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})