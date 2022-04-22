import axios, { AxiosRequestConfig } from 'axios';
import { buildHeaders } from '../utils';
import { REDDIT_PUBLIC_BASE_URL } from '../constant';

export const getAccessToken = (code: string) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append("redirect_uri", process.env.REACT_APP_CLIENT_REDIRECT || '');

    const config = {
        headers: buildHeaders(),
        auth: {
            username: process.env.REACT_APP_CLIENT_ID,
            password: process.env.REACT_APP_CLIENT_SECRET,
        },
    } as AxiosRequestConfig<URLSearchParams>;

    return axios.post(`${REDDIT_PUBLIC_BASE_URL}/api/v1/access_token`, params, config);
}
