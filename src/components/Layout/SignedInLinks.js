import React from "react";
import {NavLink} from 'react-router-dom';
import Logout from '../Auth/Logout'


const SignedInLinks = () => {
    return (
        <ul>
            <div className="left"><li><NavLink to='/' className='btn btn-floating pink lighten-1'>VK</NavLink></li></div>
            <div className="right"><li><Logout /></li></div>
        </ul>
    )
}

export default SignedInLinks