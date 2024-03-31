import axios from 'axios';

// const API = axios.create({ baseURL : 'https://myprecious-moments.herokuapp.com' });
const API = axios.create({ baseURL : 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostOfUser = (id) => API.get(`/posts/profile/${id}`);

export const createPost = (newPost) => API.post('/posts',newPost);

export const updatePost = (id,updatedPost) => API.patch(`${'/posts'}/${id}`,updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
 
export const comment = (value,id) => API.patch(`/posts/${id}/commentPost`,{ value });

export const signIn = (formData) => API.post('/users/signin',formData);

export const signUp = (formData) => API.post('/users/signup',formData);

export const getUserById = (id) => API.get(`/users/${id}`);

export const setFollow = (followerId,followingId) => API.post(`/users/follow`,{ followerId , followingId});

export const setUnFollow = (followerId,followingId) => API.post(`/users/unfollow`,{ followerId , followingId});

export const changeDescription = (email,userDescription) => API.patch('/users/changeDescription',{ email , userDescription });

export const changeProfilePic = (email,profilePic) => API.patch('/users/changePic',{ email , profilePic });

export const share = (id,shareData) => API.post('/posts/share',{ id, shareData});