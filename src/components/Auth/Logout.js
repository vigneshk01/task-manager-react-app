import {NavLink} from "react-router-dom";
import React from "react";
import delToken from "../App/delToken";

function Logout(){
    delToken()
    return (
        <NavLink to='/signin'>Log Out</NavLink>
    )
}

export default Logout