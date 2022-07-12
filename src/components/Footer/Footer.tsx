import React from 'react';
import './Footer.scss';
const github = require('../../assets/img/github.png')

const Footer = () => {


    return (
        <footer className='footer'>
            <div className={'github'}>
                <a href="https://github.com/SheshkoPavel" target='blank'>
                    <img src={github} alt="github"/> My GITHUB
                </a>
            </div>
            <div>
                2022
            </div>
            <div className={'twelveDevs'}>
                <a href="https://twelvedevs.com/" target='blank'>twelvedevs.com</a>
            </div>
        </footer>
    );
};

export default Footer;