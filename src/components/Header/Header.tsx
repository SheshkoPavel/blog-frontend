import React from 'react';
import './Header.scss'

const Header = () => {
    return (
        <header className='header'>
            <div><a href="/">Go home</a> </div>
            <a href="/login">Login</a>
        </header>
    );
};

export default Header;