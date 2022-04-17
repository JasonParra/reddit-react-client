import React, { useState } from 'react';
import { Input, Typography, Col, Button, Tree } from 'antd';
import { getStore, getCreatedMessage } from '../../utils/utils';
import { postComment } from '../../api/actions/comment';
import PropTypes from 'prop-types';
import './CommentSection.css';

const CommentSection = (props) => {
    const { treeData, name, data, setData } = props;
    const { TextArea } = Input;
    const { Text } = Typography;
    const [comment, setComment] = useState('');
    const user = getStore('user');

    const handleComment = () => {
        if (!comment)
            return;

        postComment(name, comment).then((_data) => {
            const children = getCreatedMessage(_data.data);
            setData({ ...data, comments: [...data.comments, children] });
            setComment('');
        })
    }

    return (
        <Col className='container'>
            <Text className='comment-title'>Comment as {user?.name}</Text>
            <TextArea rows={5} placeholder={'What are your thoughts'} value={comment} onChange={e => setComment(e.target.value)} />
            <div className='comment-button'>
                <Button shape='round' onClick={handleComment}> Comment </Button>
            </div>
            <Tree defaultExpandAll switcherIcon={<div></div>} showLine={{ showLeafIcon: false }} treeData={treeData} />
        </Col>
    )
}

CommentSection.propTypes = {
    treeData: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired
}

CommentSection.defaultProps = {
    treeData: [],
    name: '',
    data: {},
    setData: () => { }
}

export default CommentSection