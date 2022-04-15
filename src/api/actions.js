import axios from 'axios';
import { BASE_URL } from './constant';

export const getAllPostBySubreddit = (subreddit = '') => {
    return axios.get(`${BASE_URL}/r/${subreddit}.json`);
}

export const getAllCommentsByPost = (subreddit = '', id = '', title = '') => {
    return axios.get(`${BASE_URL}/r/${subreddit}/comments/${id}/${title}.json`);
}
