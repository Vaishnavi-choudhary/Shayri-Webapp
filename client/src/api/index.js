import axios from 'axios';
const url = 'http://localhost:8800/posts';

export const fetchPosts = () =>axios.get(url);
export const signIn = (data) => axios.post(data); 
export const signUp = (data) => axios.post(data); 
export const createPost = (newPost) =>axios.post(url,newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);