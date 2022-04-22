import { CommentProps } from '../components/Comment/Comment';

interface commentData extends CommentProps {
    replies: {
        data: {
            children: CommentResponse[]
        }
    }
}

type CommentResponse = {
    data: commentData
}

export default CommentResponse;
