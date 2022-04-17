import Comment from '../components/Comment/Comment';

export const mapCommentChildrenToCommentSection = (data, setData) => {
    const { comments, post } = data;
    return {
        treeData: convertToTree(comments, 0, data, setData),
        name: post.name,
        data,
        setData
    }
}

const convertToTree = (tree, key = 0, _data, setData) => {
    return tree.map(({ data }, index) => ({
        title: <Comment {...data} data={_data} setData={setData} />,
        key: `${key}-${index}`,
        children: convertToTree(data.replies?.data?.children || [], `${key}-${index}`, _data, setData)
    }))
}
