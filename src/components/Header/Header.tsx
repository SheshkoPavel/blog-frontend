import React from 'react';
import './Header.scss'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {NavLink} from "react-router-dom";
import {logoutUserThunk} from "../../store/reducers/authReducer";

const Header = () => {

    const {isAuth, message, user} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    return (
        <header className='header'>
            <div><a href="/">Go home</a> </div>
            {isAuth
                ? <button onClick={() => {dispatch(logoutUserThunk())}}>Logout</button>
                : <NavLink to={'/login'}>Login</NavLink>
            }
        </header>
    );
};

export default Header;