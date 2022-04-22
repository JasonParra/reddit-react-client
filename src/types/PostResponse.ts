import { PostProps } from '../components/Post/Post'

interface PostResponse extends PostProps {
    media: {
        reddit_video: {
            width: string,
            height: string,
            fallback_url: string
        }
    },
    data: PostResponse
}

export default PostResponse;
