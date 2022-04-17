export const mapPostChildrenToPost = (data) => {
    const {
        subreddit_name_prefixed,
        title,
        score,
        url,
        is_video,
        name,
        num_comments,
        author,
        handlePostClick,
        permalink,
        enableCommentSection,
        commentSectionProps
    } = data;

    if (is_video) {
        const { width, height, fallback_url } = data.media.reddit_video;
        return {
            subreddit_name_prefixed,
            title,
            score,
            name,
            mediaStyle: { width, height },
            src: fallback_url,
            is_video,
            num_comments,
            author,
            handlePostClick,
            permalink,
            enableCommentSection,
            commentSectionProps
        }
    } else {
        return {
            subreddit_name_prefixed,
            title,
            score,
            name,
            mediaStyle: {},
            src: url,
            is_video,
            num_comments,
            author,
            handlePostClick,
            permalink,
            enableCommentSection,
            commentSectionProps
        }
    }
}
