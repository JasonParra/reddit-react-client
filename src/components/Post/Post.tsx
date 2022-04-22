import React, { useEffect, useState, FC } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    CommentOutlined,
    GiftOutlined,
    ShareAltOutlined,
    BookOutlined
} from '@ant-design/icons';
import MediaPlayer from '../MediaPlayer/MediaPlayer';
import CommentSection from '../CommentSection/CommentSection';
import { getStore, setStore, likesFormat } from '../../utils/utils';
import { postVote } from '../../api/actions/post';
import { CommentSectionProps } from '../CommentSection/CommentSection';
import './Post.css';

export type PostProps = {
    subreddit_name_prefixed: string,
    title: string,
    score: number,
    url: string,
    name: string,
    mediaStyle: { width: string, height: string },
    src: string,
    is_video: boolean,
    num_comments: number,
    author: string,
    handlePostClick: handlePostClick,
    permalink: string,
    enableCommentSection: boolean,
    commentSectionProps: CommentSectionProps
}

type handlePostClick = (permalink: string) => void;

const Post: FC<PostProps> = (props) => {
    const {
        subreddit_name_prefixed,
        title,
        score,
        name,
        mediaStyle,
        src,
        is_video,
        num_comments,
        author,
        handlePostClick,
        permalink,
        enableCommentSection,
        commentSectionProps
    } = props;
    const { Text } = Typography;
    const [option, setOption] = useState<number>();

    useEffect(() => {
        setOption(getStore(name)?.likes);
    }, []);

    const handleUpVotes = () => {
        const number = option === 1 ? 0 : 1;
        postVote(number, name).then(() => {
            setStore(name, { likes: number });
            setOption(number);
        })
    }

    const handleDownVotes = () => {
        const number = option === -1 ? 0 : -1;
        postVote(number, name).then(() => {
            setStore(name, { likes: number });
            setOption(number);
        })
    }

    return (
        <Card className='card-container'>
            <Row className='card-row'>
                <Col className='score-column'>
                    <ArrowUpOutlined className={`votes ${option === 1 && 'up'}`} onClick={handleUpVotes} />
                    <Text className='score'>{likesFormat(score)}</Text>
                    <ArrowDownOutlined className={`votes ${option === -1 && 'down'}`} onClick={handleDownVotes} />
                </Col>
                <Col className='media-player-column' onClick={() => handlePostClick(permalink)}>
                    <Row className='media-player-header'>
                        <Text className='subreddit-name' strong>{subreddit_name_prefixed}</Text>
                        <div className='dot'>.</div>
                        <Text className='subreddit-author'>{`Posted by ${author}`}</Text>
                    </Row>
                    <p className='title'>{title}</p>
                    <div className='media-player-container'>
                        <MediaPlayer style={mediaStyle} src={src} is_video={is_video} />
                    </div>
                    <Row className='bottom-button-container'>
                        <Row className='bottom-button'>
                            <CommentOutlined className='bottom-button-icon' />
                            <Text>{`${num_comments} Comments`}</Text>
                        </Row>
                        <Row className='bottom-button'>
                            <GiftOutlined className='bottom-button-icon' />
                            <Text>Award</Text>
                        </Row>
                        <Row className='bottom-button'>
                            <ShareAltOutlined className='bottom-button-icon' />
                            <Text>Share</Text>
                        </Row>
                        <Row className='bottom-button'>
                            <BookOutlined className='bottom-button-icon' />
                            <Text>Save</Text>
                        </Row>
                    </Row>
                </Col>
            </Row>
            {enableCommentSection && <CommentSection {...commentSectionProps} />}
        </Card >
    );
}

export default Post;
