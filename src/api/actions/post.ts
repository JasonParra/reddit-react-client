import axios, { AxiosRequestConfig } from 'axios';
import { buildHeaders } from '../utils';
import PostResponse from '../../types/PostResponse';
import { REDDIT_PUBLIC_BASE_URL, REDDIT_PRIVATE_BASE_URL } from '../constant';

export const getAllPostBySubreddit = (subreddit: string = "") => {
    return axios.get<{ data: { children: PostResponse[] } }>(`${REDDIT_PUBLIC_BASE_URL}/r/${subreddit}.json`);
}

export const getAllCommentsByPost = (subreddit: string = "", id: string = "", title: string = "") => {
    return axios.get(`${REDDIT_PUBLIC_BASE_URL}/r/${subreddit}/comments/${id}/${title}.json`);
}

export const postVote = (dir: number, id: string = "") => {
    const params = new URLSearchParams();
    params.append('dir', dir.toString());
    params.append('id', id);

    const config = {
        headers: buildHeaders(true),
    } as AxiosRequestConfig<URLSearchParams>;

    return axios.post(`${REDDIT_PRIVATE_BASE_URL}/api/vote`, params, config);
}
