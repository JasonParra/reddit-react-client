import React, { useState, useEffect, SetStateAction, Dispatch, FC } from 'react'
import { Col, Row, Typography, Button, Input } from 'antd';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    CommentOutlined,
} from '@ant-design/icons';
import { getStore, setStore, getCreatedReply, likesFormat } from '../../utils/utils';
import { addReplyToTree } from '../../utils/utils';
import { postVote } from '../../api/actions/post';
import { postComment } from '../../api/actions/comment';
import './Comment.css';
import PostResponse from '../../types/PostResponse';
import CommentResponse from '../../types/CommentsResponse';

export type CommentProps = {
    author: string,
    body: string,
    ups: number,
    created: number,
    name: string,
    data?: { post: PostResponse, comments: CommentResponse[] },
    setData?: Dispatch<SetStateAction<{ post: PostResponse; comments: CommentResponse[]; } | undefined>>
}

const Comment: FC<CommentProps> = (props) => {
    const { author, body, ups, created, name, data, setData } = props;
    const { Text } = Typography;
    const { TextArea } = Input;
    const [comment, setComment] = useState('');
    const [option, setOption] = useState<number>();
    const [enableReply, setEnableReply] = useState(false);

    useEffect(() => {
        setOption(getStore(name)?.likes);
    }, [])

    const handleCancel = () => {
        setEnableReply(false);
        setComment('');
    }

    const handleReply = () => {
        if (!comment)
            return;

        postComment(name, comment).then((_data) => {
            const children = getCreatedReply(_data.data);
            if (children && setData && data)
                setData({ ...data, comments: addReplyToTree(data.comments, children) });
            setStore(name, { likes: 1 });
            handleCancel();
        });
    }

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
        <Col className='container'>
            <Row>
                <Text strong className='author'>{author}</Text>
                <Text>{new Date(created * 1000).toDateString()}</Text>
            </Row>
            <Text className='body' >{body}</Text>
            <Row className='action-container'>
                <ArrowUpOutlined className={`bottom-button-icon ${option === 1 && 'up'}`} onClick={handleUpVotes} />
                <Text className='score'>{likesFormat(ups)}</Text>
                <ArrowDownOutlined className={`bottom-button-icon ${option === -1 && 'down'}`} onClick={handleDownVotes} />
                <CommentOutlined onClick={() => setEnableReply(true)} className='bottom-button-icon' />
                <Text className='bottom-button' onClick={() => setEnableReply(true)}>Reply</Text>
                <Text className='bottom-button'>Give Award</Text>
                <Text className='bottom-button'>Share</Text>
                <Text className='bottom-button'>Report</Text>
                <Text className='bottom-button'>Save</Text>
                <Text className='bottom-button'>Follow</Text>
            </Row>
            {enableReply && <div>
                <TextArea rows={3} placeholder={'What are your thoughts'} value={comment} onChange={e => setComment(e.target.value)} />
                <div className='comment-button'>
                    <Button className='cancel' shape='round' onClick={handleCancel}> Cancel </Button>
                    <Button shape='round' onClick={handleReply}> Reply </Button>
                </div>
            </div>}
        </Col >
    )
}

export default Comment
