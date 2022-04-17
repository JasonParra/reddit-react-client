import axios from 'axios';
import { buildHeaders } from '../utils';
import { REDDIT_PUBLIC_BASE_URL, REDDIT_PRIVATE_BASE_URL } from '../constant';

export const getAllPostBySubreddit = (subreddit = '') => {
    return axios.get(`${REDDIT_PUBLIC_BASE_URL}/r/${subreddit}.json`);
}

export const getAllCommentsByPost = (subreddit = '', id = '', title = '') => {
    return axios.get(`${REDDIT_PUBLIC_BASE_URL}/r/${subreddit}/comments/${id}/${title}.json`);
}

export const postVote = (dir, id) => {
    const params = new URLSearchParams();
    params.append('dir', dir);
    params.append('id', id);

    const config = {
        headers: buildHeaders(true),
    };

    return axios.post(`${REDDIT_PRIVATE_BASE_URL}/api/vote`, params, config);
}
