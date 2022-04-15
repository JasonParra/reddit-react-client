import React from 'react';
import PropTypes from 'prop-types';
import { MEDIA_TYPE } from '../../constants/MediaPlayer.contants';
import { getTypeBySrc } from '../../utils/utils';
import './MediaPlayer.css';

const MediaPlayer = (props) => {
    const { style, src, is_video } = props;

    const renderContent = () => {
        const { width, height } = style;
        const type = getTypeBySrc(is_video, src);

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
            default: break;
        }
    }

    return renderContent();
}

MediaPlayer.propTypes = {
    style: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    is_video: PropTypes.bool.isRequired
}

MediaPlayer.defaultProps = {
    style: {},
    src: '',
    type: '',
    is_video: false
}

export default MediaPlayer;