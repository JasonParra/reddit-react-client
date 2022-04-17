import React, { useState, useEffect } from 'react'
import { Col, Row, Typography, Button, Input } from 'antd';
import PropTypes from 'prop-types'
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    CommentOutlined,
} from '@ant-design/icons';
import { getStore, setStore, likesFormat, getCreatedReplay } from '../../utils/utils';
import { addReplyToTree } from '../../utils/utils';
import { postVote } from '../../api/actions/post';
import { postComment } from '../../api/actions/comment';
import './Comment.css';

const Comment = props => {
    const { author, body, ups, created, name, data, setData } = props;
    const { Text } = Typography;
    const { TextArea } = Input;
    const [comment, setComment] = useState('');
    const [option, setOption] = useState(null);
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
            const children = getCreatedReplay(_data.data);
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

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    created: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired,
}

Comment.defaultProps = {
    author: '',
    body: '',
    name: '',
    ups: 0,
    created: 0,
    data: {},
    setData: () => { }
}

export default Comment