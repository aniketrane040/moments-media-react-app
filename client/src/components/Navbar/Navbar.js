import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import memoriesText from '../../images/memoriesText.png';
import memoriesLogo from '../../images/memoriesLogo.png';
import useStyles from './styles.js';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedtoken = decode(token);

            if (decodedtoken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    };

    const gotoProfile = () => {
        if(user.result._id)
            history.push(`/profile/${user.result._id}`);
        else
            window.alert("first create your profile on sign up page");
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>

            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} component={Link} onClick={gotoProfile}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>

                        <Button variant="container" className={classes.logout} color="primary" onClick={logout}>Log out</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>

        </AppBar>
    );
}

export default Navbar
