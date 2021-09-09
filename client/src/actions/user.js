import * as api from '../api';
import { END_LOADING, FOLLOW_USER, GET_USER, START_LOADING } from '../constants/actionTypes';

export const getUser = (id) => async (dispatch) => {

    try {
        dispatch({ type : START_LOADING });

        const { data } = await api.getUserById(id);
        dispatch({ type: GET_USER , payload: data});

        dispatch({ type : END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const changeDescription = (email,description) => async (dispatch) => {

    try {
        const { data } = await api.changeDescription(email,description);
        dispatch({ type: GET_USER , payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const changePic = (email,profilePic) => async (dispatch) => {

    try {
        const { data } = await api.changeProfilePic(email,profilePic);
        dispatch({ type: GET_USER , payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const followUser = (followerId,followingId) => async(dispatch) => {
    try {
        const { data } = await api.setFollow(followerId,followingId);
        dispatch({ type : FOLLOW_USER , payload : data});
    } catch (error) {
        console.log(error.message);
    }
} 

export const unfollowUser = (followerId,followingId) => async(dispatch) => {
    try {
        const { data } = await api.setUnFollow(followerId,followingId);
        dispatch({ type : FOLLOW_USER , payload : data });
    } catch (error) {
        console.log(error.message);
    }
}