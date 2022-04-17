import axios from 'axios';
import { buildHeaders } from '../utils';
import { REDDIT_PRIVATE_BASE_URL } from '../constant';

export const postComment = (name, text) => {
    const params = new URLSearchParams();
    params.append('parent', name);
    params.append('text', text);

    const config = {
        headers: buildHeaders(true),
    };

    return axios.post(`${REDDIT_PRIVATE_BASE_URL}/api/comment`, params, config);
}
