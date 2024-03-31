import * as api from '../api';
import { COMMENT, CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, FETCH_POST_OF_USER, LIKE, START_LOADING, UPDATE } from '../constants/actionTypes';

// Action creators

export const getPost = (id) => async (dispatch) => {

    try {
        dispatch({ type : START_LOADING });

        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST , payload: data});

        dispatch({ type : END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}
export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({ type : START_LOADING });

        const { data } = await api.fetchPosts(page);
        console.log(data);
        dispatch({ type: FETCH_ALL ,payload: data});

        dispatch({ type : END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    try {
        dispatch({ type : START_LOADING });

        const { data : { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH,payload: data});

        dispatch({ type : END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsOfUser = (id) => async (dispatch) => {

    try {
        dispatch({ type : START_LOADING });

        const { data } = await api.fetchPostOfUser(id);
        dispatch({ type: FETCH_POST_OF_USER , payload: data});

        dispatch({ type : END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}
export const createPost = (post,history) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        
        dispatch({ type: CREATE , payload: data });

        history.push(`/posts/${data._id}`);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id,post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id,post);

        dispatch({ type: UPDATE , payload: data});
    } catch (error) {
        console.log(error.message);   
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE , payload: id});
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE , payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const commentPost = (value , id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value,id);
        dispatch({type : COMMENT , payload : data});
        return(data.comments);
    } catch (error) {
        console.log(error.message);
    }   
}

export const shareMoment = (id,shareData,history) => async (dispatch) => {
    try {
        const {data} = await api.share(id,shareData);
        window.alert("Moment Shared !");
        history.push("/");
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}