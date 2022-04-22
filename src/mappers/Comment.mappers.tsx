import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import Comment from '../components/Comment/Comment';
import { CommentSectionProps } from '../components/CommentSection/CommentSection';
import CommentResponse from '../types/CommentsReponse';
import CommentsTree from '../types/CommentsTree';
import PostResponse from '../types/PostResponse';

export const mapCommentChildrenToCommentSection =
    (
        data: { post: PostResponse, comments: CommentResponse[] },
        setData: Dispatch<SetStateAction<{ post: PostResponse; comments: CommentResponse[]; } | undefined>>) => {
        const { comments, post } = data;
        return {
            treeData: convertToTree(comments, 0, data, setData),
            name: post.name,
            data,
            setData
        } as CommentSectionProps
    }

const convertToTree = (
    tree: CommentResponse[],
    key: number | string = 0,
    _data: { post: PostResponse, comments: CommentResponse[] },
    setData: Dispatch<SetStateAction<{ post: PostResponse; comments: CommentResponse[]; } | undefined>>): CommentsTree[] => {
    return tree.map(({ data }, index) => ({
        title: <Comment {...data} data={_data} setData={setData} />,
        key: `${key}-${index}`,
        children: convertToTree(data.replies?.data?.children || [], `${key}-${index}`, _data, setData)
    }));
}
