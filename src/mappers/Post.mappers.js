export const mapPostChildrenToPost = (data) => {
    const { is_video } = data;

    if (is_video) {
        const { width, height, fallback_url } = data.media.reddit_video;
        return {
            title: data.title,
            score: data.score,
            mediaStyle: { width, height },
            src: fallback_url,
            is_video
        }
    } else {
        return {
            title: data.title,
            score: data.score,
            mediaStyle: {},
            src: data.url,
            is_video
        }
    }
}
