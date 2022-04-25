import React, { useState, FC, Dispatch, SetStateAction } from 'react';
import { Input, Typography, Col, Button, Tree } from 'antd';
import { getStore, getCreatedMessage } from '../../utils/utils';
import { postComment } from '../../api/actions/comment';
import './CommentSection.css';
import PostResponse from '../../types/PostResponse';
import CommentResponse from '../../types/CommentsResponse';
import CommentsTree from '../../types/CommentsTree';

export type CommentSectionProps = {
    treeData: CommentsTree[],
    name: string,
    data: { post: PostResponse, comments: CommentResponse[] },
    setData: Dispatch<SetStateAction<{ post: PostResponse; comments: CommentResponse[]; } | undefined>>
}

const CommentSection: FC<CommentSectionProps> = (props) => {
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
            if (children)
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

export default CommentSection