import React, { FC } from 'react';
import { MEDIA_TYPE } from '../../constants/MediaPlayer.contants';
import { getTypeBySrc } from '../../utils/utils';
import './MediaPlayer.css';

export type MediaPlayerProps = {
    style: { width: string, height: string },
    src: string,
    is_video: boolean
}

const MediaPlayer: FC<MediaPlayerProps> = (props) => {
    const { style, src, is_video } = props;

    const renderContent = () => {
        const { width, height } = style;
        const type: string = getTypeBySrc(is_video, src);

        switch (type) {
            case MEDIA_TYPE.VIDEO: return (
                <video className='media' width={width} height={height} controls>
                    <source src={src} type="video/mp4" />
                    <source src={src} type="video/ogg" />
                    Your browser does not support the video tag.
                </video>);
            case MEDIA_TYPE.IMAGE: return (
                <img className='media' width={width} height={height} src={src} />
            );
            case MEDIA_TYPE.LINK: return (
                <a>{src}</a>
            );
            default: return <></>
        }
    }

    return renderContent();
}

export default MediaPlayer;
