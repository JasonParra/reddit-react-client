import CommentResponse from "../../types/CommentsResponse";

const COMMENTS_TREE: CommentResponse = {
    data: {
        author: 'jasonparra96',
        body: 'example of a comment 2',
        created: 0,
        name: 't1_i610j64',
        replies: {
            data: {
                children: []
            }
        },
        ups: 0,
    }
}

const COMMENTS_TREE_REPLY: CommentResponse & { data: { parent_id: string } } = {
    data: {
        author: 'jasonparra96',
        body: 'example of a comment 2',
        created: 0,
        name: 't1_i610j61',
        parent_id: 't1_i610j64',
        replies: {
            data: {
                children: []
            }
        },
        ups: 0,
    }

}

const COMMENTS_TREE_ADDED_REPLY: CommentResponse = {
    data: {
        author: 'jasonparra96',
        body: 'example of a comment 2',
        created: 0,
        name: 't1_i610j64',
        replies: {
            data: {
                children: [COMMENTS_TREE_REPLY]
            }
        },
        ups: 0,
    }
}

export const buildCommentsTree = () => [COMMENTS_TREE];
export const buildCommentsTreeReply = () => COMMENTS_TREE_REPLY;
export const buildCommentsTreeAddedReply = () => [COMMENTS_TREE_ADDED_REPLY];
