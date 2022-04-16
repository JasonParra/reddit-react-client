import axios from 'axios';
import { REDDIT_PUBLIC_BASE_URL } from '../constant';

export const getAllPostBySubreddit = (subreddit = '') => {
    return axios.get(`${REDDIT_PUBLIC_BASE_URL}/r/${subreddit}.json`);
}

export const getAllCommentsByPost = (subreddit = '', id = '', title = '') => {
    return axios.get(`${REDDIT_PUBLIC_BASE_URL}/r/${subreddit}/comments/${id}/${title}.json`);
}
