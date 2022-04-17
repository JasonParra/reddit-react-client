import { MEDIA_TYPE } from '../constants/MediaPlayer.contants';
const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_REDIRECT, REACT_APP_CLIENT_STATE } = process.env;

export const likesFormat = (number) => {
    if (number < 10000)
        return number;
    else return (number / 1000).toFixed(2) + 'K';
}

export const getTypeBySrc = (is_video = false, src = '') => {
    if (!is_video && src.includes('.gif'))
        return MEDIA_TYPE.IMAGE;
    else if (!is_video && (!src.includes('.jpg') && !src.includes('.png')))
        return MEDIA_TYPE.LINK;
    else if (!is_video)
        return MEDIA_TYPE.IMAGE;
    else
        return MEDIA_TYPE.VIDEO;

}

export const buildRedditAouthLink = () =>
    `https://www.reddit.com/api/v1/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&state=${REACT_APP_CLIENT_STATE}&redirect_uri=${REACT_APP_CLIENT_REDIRECT}&duration=temporary&scope=vote submit identity`;


export const buildRedditRegisterLink = () =>
    `https://www.reddit.com/register/?dest=${REACT_APP_CLIENT_REDIRECT}`;

export const getStore = (key) => {
    return JSON.parse(localStorage.getItem('store'))?.[key];
}

export const setStore = (key, value) => {
    return localStorage.setItem('store', JSON.stringify({ ...JSON.parse(localStorage.getItem('store')), [key]: value }))
}

export const getCreatedReplay = (data) => {
    const { jquery } = data;
    let result = null;

    jquery.forEach(item => {
        if (item.find(item2 => item2 === 31)) {
            result = item[item.length - 1][0][0];
        }
    })

    if (!result)
        return null;

    return result;
}
export const getCreatedMessage = (data) => {
    const { jquery } = data;
    let result = null;

    jquery.forEach(item => {
        if (item.find(item2 => item2 === 18)) {
            result = item[item.length - 1][0][0];
        }
    })

    if (!result)
        return null;

    return result;
}


export const addReplyToTree = (tree, reply) => {
    return tree.map((item) => {
        if (item.data.name === reply.data.parent_id)
            return {
                ...item,
                data: {
                    ...item.data,
                    replies: { ...item.data.replies, data: { ...item.data.replies?.data, children: [...item.data.replies?.data?.children, reply] } }
                }
            }
        else if (item?.data?.replies?.length)
            return addReplyToTree(item.data.replies?.data?.children || [], reply);
        else return item;
    })
}
