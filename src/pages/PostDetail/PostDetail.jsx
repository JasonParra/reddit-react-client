import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Col } from 'antd';
import { mapPostChildrenToPost } from '../../mappers/Post.mappers';
import { mapCommentChildrenToCommentSection } from '../../mappers/Comment.mappers';
import { getAllCommentsByPost } from '../../api/actions/post';
import Post from '../../components/Post/Post';
import Header from '../../components/Header/Header'
import './PostDetail.css';

const PostDetail = () => {
    const { subreddit, id, title } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        getAllCommentsByPost(subreddit, id, title).then(({ data }) =>
            setData({ post: data[0].data.children[0].data, comments: data[1].data.children })
        );
    }, []);

    return (
        <>
            <Header />
            <div className='post-list-container'>
                <Col className='post-list'>
                    {data && <Post
                        {...mapPostChildrenToPost({
                            ...data.post,
                            enableCommentSection: true,
                            commentSectionProps: mapCommentChildrenToCommentSection(data, setData),
                        })}
                    />}
                </Col>
            </div>
        </>
    );
}

export default PostDetail;
