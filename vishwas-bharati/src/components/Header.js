import React from 'react';
import '../styles/style.scss';
import { Link } from 'react-router-dom';
import Countdown from "react-countdown";

const Header = () => {
    return (
        <header>
            <div className='header-wrap'>
                <h1>
                    <Link to='/'>
                        <span className='name1'>Vishwas</span>
                        <img src="https://img.icons8.com/nolan/64/like.png" alt="heart-icon"/>
                        <span className='name2'>Bharati</span>
                    </Link>
                </h1>
                <Countdown className='cntdwn' date={'Sun Sep 24 2023 21:00:00 GMT-0400 (Eastern Daylight Time)'} />
            </div>
        </header>
    )
}

export default Header