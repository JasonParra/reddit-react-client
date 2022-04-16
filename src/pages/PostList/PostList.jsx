import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from "react-router-dom";
import { Col } from 'antd';
import { mapPostChildrenToPost } from '../../mappers/Post.mappers';
import { getAllPostBySubreddit } from '../../api/actions/post';
import { getAccessToken } from '../../api/actions/oauth';
import { setToken } from '../../api/utils';
import Post from '../../components/Post/Post';
import Header from '../../components/Header/Header'
import './PostList.css';

const PostList = () => {
    const { subreddit = "all" } = useParams();
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([])

    useEffect(() => {
        getAllPostBySubreddit(subreddit).then(({ data }) => setData(data.data.children));
    }, []);

    const requestToken = async (code) => {
        const { data } = await getAccessToken(code);

        if (data.error)
            return;

        setToken(data)
    }

    useEffect(() => {
        const state = searchParams.get('state');
        const code = searchParams.get('code');

        if (code && state === process.env.REACT_APP_CLIENT_STATE)
            requestToken(code);

    }, [])

    const mapPostResponseToPost = ({ data }, key) => {
        return <Post key={key} {...mapPostChildrenToPost(data)} />;
    }

    return (
        <>
            <Header />
            <div className='post-list-container'>
                <Col className='post-list'>
                    {data.map(mapPostResponseToPost)}
                </Col>
            </div>
        </>
    );
}

export default PostList;