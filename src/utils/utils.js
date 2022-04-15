import { MEDIA_TYPE } from '../constants/MediaPlayer.contants';

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
