import axios, { AxiosRequestConfig } from 'axios';
import { buildHeaders } from '../utils';
import { REDDIT_PRIVATE_BASE_URL } from '../constant';

export const postComment = (name: string, text: string) => {
    const params = new URLSearchParams();
    params.append('parent', name);
    params.append('text', text);

    const config = {
        headers: buildHeaders(true),
    } as AxiosRequestConfig<URLSearchParams>;

    return axios.post(`${REDDIT_PRIVATE_BASE_URL}/api/comment`, params, config);
}
