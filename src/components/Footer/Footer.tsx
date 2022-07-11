import React from 'react';
import './Footer.scss';
const github = require('../../assets/img/github.png')

const Footer = () => {


    return (
        <footer className='footer'>
            <div className={'github'}>
                <a href="https://github.com/SheshkoPavel">
                    <img src={github} alt="github"/> My GITHUB
                </a>
            </div>
            <div>
                2022
            </div>
            <div>

            </div>
        </footer>
    );
};

export default Footer;