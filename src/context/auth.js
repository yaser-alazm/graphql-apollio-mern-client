import React, {createContext, useReducer} from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

// Check if the user token exists and not expired
if(localStorage.getItem('usrToken')){
    const decodedToken = jwtDecode(localStorage.getItem('usrToken'))

    if(decodedToken.exp * 1000 < Date.now()){
        // expired token
        localStorage.removeItem('usrToken')
    } else {
        initialState.user = decodedToken
    }
}


const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = userData => {
        localStorage.setItem('usrToken', userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem('usrToken')
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )

}

export { AuthContext, AuthProvider }