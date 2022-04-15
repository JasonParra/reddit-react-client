import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import {
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import { Typography } from 'antd';
import MediaPlayer from '../MediaPlayer/MediaPlayer';

import './Post.css';

const Post = (props) => {
    const {
        title,
        score,
        mediaStyle,
        src,
        is_video
    } = props;
    const { Text } = Typography;

    return (
        <Card className='card-container'>
            <Row className='card-row'>
                <Col className='score-column'>
                    <ArrowUpOutlined />
                    <Text strong>{score}</Text>
                    <ArrowDownOutlined />
                </Col>
                <Col className='media-player-column'>
                    <p className='title'>{title}</p>
                    <div className='media-player-container'>
                        <MediaPlayer style={mediaStyle} src={src} is_video={is_video} />
                    </div>
                </Col>
            </Row>
        </Card>
    );
}

Post.propTypes = {
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    mediaStyle: PropTypes.object,
    src: PropTypes.string.isRequired,
    is_video: PropTypes.bool.isRequired
}

Post.defaultProps = {
    title: '',
    score: 0,
    mediaStyle: {},
    src: '',
    is_video: false
}

export default Post;
