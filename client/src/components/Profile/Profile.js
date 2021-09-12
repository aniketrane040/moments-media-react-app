import { Paper, Button, Typography, Avatar, CssBaseline, Divider, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import Posts from '../Posts/Posts';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsOfUser } from '../../actions/posts';
import { useParams } from 'react-router-dom';
import { changeDescription, changePic, followUser, getUser, unfollowUser } from '../../actions/user';
const Profile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user } = useSelector(state => state.user);
    const signInUser = JSON.parse(localStorage.getItem('profile'));
    const [follow, setFollow] = useState(true);
    const [isChangeDesc, setIsChangeDesc] = useState(false);
    const [description, setDescription] = useState(user?.description);
    const [profilePic, setProfilePic] = useState('');
    useEffect(() => {
        const getUserDetails = async () => {
            await dispatch(getUser(id));
            if (user?.followers?.indexOf(signInUser?.result?._id) !== -1) setFollow(false);
            setDescription(user?.description);
        }
        getUserDetails();
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getPostsOfUser(id));
    }, [user]);

    if (!user) return null;

    const handleFollow = () => {
        if (follow) {
            dispatch(followUser(signInUser.result._id, user._id));
            setFollow(false);
        } else {
            dispatch(unfollowUser(signInUser.result._id, user._id));
            setFollow(true);
        }
    }

    const handleDescription = () => {
        if (isChangeDesc) {
            console.log(description);
            dispatch(changeDescription(user.email, description));
            setIsChangeDesc(false);
        } else {
            setIsChangeDesc(true);
        }
    }

    const changeProfilePic = () => {
        dispatch(changePic(user.email, profilePic));
    }

    return (
        <div>
            <CssBaseline />
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div>
                    <div align='center'>
                        <Avatar className={classes.sizeAvatar} alt={user.name} src={user.profilePic}>
                            <Typography variant="h2">{user.name.charAt(0)}</Typography>
                        </Avatar>
                    </div>
                    <br /> <br />
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom align='center'>
                        {user.name}
                    </Typography><br />

                    {
                        signInUser?.result?._id === user._id && (
                            <>
                                <FileBase
                                    type="file"
                                    style={{ display: 'none' }}
                                    multiple={false}
                                    onDone={({ base64 }) => setProfilePic(base64)}
                                />
                                <Button variant='contained' color='primary' onClick={changeProfilePic}>Change Photo</Button> <br />
                            </>
                        )
                    }

                    <Divider /> <br /> <br />
                    <Typography variant="h4">Description</Typography> <br />
                    <div className={classes.editProfile}>
                        {
                            signInUser?.result?._id === user._id ? (
                                isChangeDesc ? (
                                    <TextField name="description" editable variant="outlined" label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                                ) : (
                                    <Typography variant='contained'>{user?.description}</Typography>
                                )) : (
                                <Typography variant='contained'>{user?.description}</Typography>
                            )
                        }
                    </div>
                    <br />
                    {signInUser?.result?._id === user._id && (
                        <Button variant="outlined" color="primary" onClick={handleDescription}>{isChangeDesc ? 'set' : 'change'}</Button>
                    )}
                </div> <br />
                <Divider />
                <div align="center">
                    <div className={classes.userFollow}>
                        <div><Typography>Followers </Typography>{user.followers.length}</div>
                        <div><Typography>Following </Typography>{user.following.length}</div>
                        {
                            (signInUser?.result?._id !== user._id && signInUser) && (
                                <div><Button variant="contained" color="primary" onClick={handleFollow}>{follow ? 'FOLLOW' : 'UNFOLLOW'}</Button></div>
                            )
                        }
                    </div>
                </div>
                <Divider />
                <Typography gutterBottom variant="h5">{user.name} Posts :</Typography><Divider />
                <Posts editEnable="disable" />
            </Paper>
        </div>
    )
}

export default Profile;