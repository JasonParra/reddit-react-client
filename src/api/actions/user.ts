import axios, { AxiosRequestConfig } from 'axios';
import { REDDIT_PRIVATE_BASE_URL } from '../constant';
import { buildHeaders } from '../utils';

export const getUser = () => {
    const config = {
        headers: buildHeaders(true),
    } as AxiosRequestConfig<URLSearchParams>;

    return axios.get(`${REDDIT_PRIVATE_BASE_URL}/api/v1/me`, config);
}
