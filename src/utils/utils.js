import { MEDIA_TYPE } from '../constants/MediaPlayer.contants';
const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_REDIRECT, REACT_APP_CLIENT_STATE } = process.env;

export const getTypeBySrc = (is_video = false, src = '') => {
    if (!is_video && src.includes('.gif')) {
        return MEDIA_TYPE.IMAGE;
    } else if (!is_video && (!src.includes('.jpg') && !src.includes('.png'))) {
        return MEDIA_TYPE.LINK;
    } else if (!is_video) {
        return MEDIA_TYPE.IMAGE;
    } else {
        return MEDIA_TYPE.VIDEO;
    }
}

export const buildRedditAouthLink = () =>
    `https://www.reddit.com/api/v1/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&state=${REACT_APP_CLIENT_STATE}&redirect_uri=${REACT_APP_CLIENT_REDIRECT}&duration=temporary&scope=vote submit`;


export const buildRedditRegisterLink = () =>
    `https://www.reddit.com/register/?dest=${REACT_APP_CLIENT_REDIRECT}`;

export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'))
}
