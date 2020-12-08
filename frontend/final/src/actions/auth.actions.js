import axios from "../helpers/axios";
import { authConstants } from "./constants"

export const login = (user) => {
    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST });

        const res = await axios.post('/signin',{
            ...user
        })

        if(res.status === 200){
            const { token , userinfo} = res.data;
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(userinfo))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,userinfo
                }
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload : {
                        error:res.data.error
                    }
                });
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        
        if(token){
            const user = JSON.parse(localStorage.getItem('user'))
            dispatch({
                    type : authConstants.LOGIN_SUCCESS,
                    payload:{
                        token,
                        user
                    }
                });
            }
        else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload : {
                    error:'Failed to log in'
                }
            });
            
        }
    }
}

export const signout = () => {
    return async dispatch => {

        dispatch({type: authConstants.LOGOUT_REQUEST});
        const res = await axios.post(`/signout`);

        if(res.status === 200){
            localStorage.clear();
            dispatch({
                type:authConstants.LOGOUT_SUCCESS
            });
        }else{
            dispatch({
                type:authConstants.LOGOUT_FAILURE,
                payload:{
                    error: "Could not sign out"
                }
            })
        }
        
    }
}

export const register = (user) => {
    return async (dispatch) => {

        dispatch({ type: authConstants.REGISTER_REQUEST });

        const res = await axios.post('/signup',{
            ...user
        })

        if(res.status === 200){
            const { message } = res.data;
            dispatch({
                type: authConstants.REGISTER_SUCCESS,
                payload: {
                    message1: message
                }
            });
        }else{
            {
                dispatch({
                    type: authConstants.REGISTER_FAILURE,
                    payload : {
                        error:res.data.error
                    }
                });
            }
        }
    }
}