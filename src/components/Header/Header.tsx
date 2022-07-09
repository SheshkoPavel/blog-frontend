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
            <div><NavLink to={"/"}>Go home</NavLink> </div>
            <div>
                {isAuth
                    ? <div>
                        <div>
                            <img src={`http://localhost:5000/avatars/${user?.avatar}`} alt="avka" style={{height: 80}}/>
                        </div>
                        <div>{user?.name}</div>
                </div>

                    : null
                }

            </div>
            <div>
                {isAuth
                    ? <button onClick={() => {dispatch(logoutUserThunk())}} style={{flexShrink: 0}} >Logout</button>
                    : <div><NavLink to={'/login'}>Login</NavLink> or <NavLink to={'/register'}>Register</NavLink>   </div>
                }
            </div>

        </header>
    );
};

export default Header;