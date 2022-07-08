import React from 'react';
import './Header.scss'
import {useAppDispatch, useAppSelector} from "../../hooks";

const Header = () => {

    const {isAuth, message, user} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    return (
        <header className='header'>
            <div><a href="/">Go home</a> </div>
            {isAuth
                ? <div>Logout</div>
                : <a href="/login">Login</a>
            }
        </header>
    );
};

export default Header;