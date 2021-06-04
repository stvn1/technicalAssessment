import React from 'react'

// import styled from 'styled-components'

//material- ui
import AppBar from "@material-ui/core/AppBar"
import Toolbar  from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

import {Link } from 'react-router-dom';

import {logout , signOut} from '../reducers/userSlice'
import {clearData} from '../reducers/dataSlice'
import {useDispatch} from 'react-redux'



const NavBar = () => {

    const dispatch = useDispatch();

    const handleLogOut = () =>{
        dispatch(clearData());
        dispatch(signOut())
    
        dispatch(logout());
    }


    return (
        <div>
            <AppBar style={{ background: "black",  position: 'relative' }}>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/dataList" >
                        DataList
                    </Button>
                    <Button color="inherit" component={Link} to="/dashboard" >
                        Dashboard
                    </Button>
                    <Button color="inherit" onClick={handleLogOut} >
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
