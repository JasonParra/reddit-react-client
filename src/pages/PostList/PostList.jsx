import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Col } from 'antd';
import { mapPostChildrenToPost } from '../../mappers/Post.mappers';
import { getAllPostBySubreddit } from '../../api/actions';
import Post from '../../components/Post/Post';
import './PostList.css';

const PostList = () => {
    const { subreddit = "all" } = useParams();
    const [data, setData] = useState([])

    useEffect(() => {
        getAllPostBySubreddit(subreddit).then(({ data }) => setData(data.data.children));
    }, []);

    const mapPostResponseToPost = ({ data }, key) => {
        return <Post key={key} {...mapPostChildrenToPost(data)} />;
    }

    return (
        <div className='container'>
            <Col className='post-list'>
                {data.map(mapPostResponseToPost)}
            </Col>
        </div>
    );
}

export default PostList;