import React from 'react';
import './Header.scss'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Link, NavLink} from "react-router-dom";
import {logoutUserThunk} from "../../store/reducers/authReducer";
import {fetchPosts} from "../../store/action-creators/postsAC";

const Header = () => {

    const {isAuth, message, user} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    return (
        <header className='header'>
            <div className={'toMain'}
                onClick={() => {dispatch(fetchPosts())}  }>
                <a href="/">На главную</a>
            </div>
            <div className={'userAvatar'}>
                {isAuth && user?.avatar
                    ? <div>
                        <div>
                            <img src={`http://localhost:5000/avatars/${user?.avatar}`} alt="avka"/>
                        </div>
                        <div>{user?.name}</div>
                </div>

                    : null
                }
            </div>

            <div style={{textAlign: "right", marginRight: 10}}>
                {isAuth
                    ? <button onClick={() => {dispatch(logoutUserThunk())}} style={{flexShrink: 0}} >Logout</button>
                    : <div><NavLink to={'/login'}>Login</NavLink> or <NavLink to={'/register'}>Register</NavLink>   </div>
                }
                <div style={{marginTop: 15}}>
                    <NavLink to={'/stats'}>Статистика app</NavLink>
                </div>

            </div>

        </header>
    );
};

export default Header;