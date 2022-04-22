import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Col } from 'antd';
import { mapPostChildrenToPost } from '../../mappers/Post.mappers';
import { getAllPostBySubreddit } from '../../api/actions/post';
import { getUser } from '../../api/actions/user';
import { getAccessToken } from '../../api/actions/oauth';
import { setToken } from '../../api/utils';
import { setStore } from '../../utils/utils';
import Post from '../../components/Post/Post';
import Header from '../../components/Header/Header'

import './PostList.css';
import PostResponse from '../../types/PostResponse';

const PostList = () => {
    const { subreddit = "all" } = useParams();
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<PostResponse[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        getAllPostBySubreddit(subreddit).then(({ data }) => setData(data.data.children));
    }, []);

    const requestUser = () => {
        getUser().then(({ data }: { data: object }) => {
            setStore('user', data);
        });
    }

    const requestToken = async (code: string) => {
        const { data } = await getAccessToken(code);

        if (data.error)
            return;

        setToken(data);
        requestUser();
    }

    useEffect(() => {
        const state = searchParams.get('state');
        const code = searchParams.get('code');

        if (code && state === process.env.REACT_APP_CLIENT_STATE) {
            searchParams.delete('state');
            searchParams.delete('code');
            requestToken(code);
        }
    }, [])

    const handlePostClick = (permalink: string) => {
        navigate(permalink);
    }

    const mapPostResponseToPost = ({ data }: { data: PostResponse }, key: React.Key | null | undefined) => {
        return <Post key={key} {...mapPostChildrenToPost({ ...data, handlePostClick })} />;
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